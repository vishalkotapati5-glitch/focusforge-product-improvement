import { useEffect, useState } from "react";

const FOCUS_DURATION_SECONDS = 25 * 60;

export default function FocusSessionWidget({ tasks }) {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(FOCUS_DURATION_SECONDS);
  const [deadline, setDeadline] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const pendingTasks = tasks.filter((task) => !task.completed);
  const selectedTask = pendingTasks.find(
    (task) => String(task.id) === selectedTaskId
  );
  const isRunning = deadline !== null;

  useEffect(() => {
    const selectedTaskIsPending = tasks.some(
      (task) => !task.completed && String(task.id) === selectedTaskId
    );

    if (selectedTaskIsPending) return;

    const nextTask = tasks.find((task) => !task.completed);
    setSelectedTaskId(nextTask ? String(nextTask.id) : "");
    setDeadline(null);
    setRemainingSeconds(FOCUS_DURATION_SECONDS);
    setIsComplete(false);
  }, [tasks, selectedTaskId]);

  useEffect(() => {
    if (deadline === null) return undefined;

    const updateRemainingTime = () => {
      const nextRemainingSeconds = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000)
      );
      setRemainingSeconds(nextRemainingSeconds);

      if (nextRemainingSeconds === 0) {
        setDeadline(null);
        setIsComplete(true);
      }
    };

    updateRemainingTime();
    const intervalId = window.setInterval(updateRemainingTime, 1000);
    return () => window.clearInterval(intervalId);
  }, [deadline]);

  const handleStart = () => {
    if (!selectedTask || remainingSeconds === 0) return;

    setIsComplete(false);
    setDeadline(Date.now() + remainingSeconds * 1000);
  };

  const handlePause = () => {
    if (deadline === null) return;

    const nextRemainingSeconds = Math.max(
      0,
      Math.ceil((deadline - Date.now()) / 1000)
    );
    setRemainingSeconds(nextRemainingSeconds);
    setDeadline(null);
    setIsComplete(nextRemainingSeconds === 0);
  };

  const handleReset = () => {
    setDeadline(null);
    setRemainingSeconds(FOCUS_DURATION_SECONDS);
    setIsComplete(false);
  };

  const handleTaskChange = (event) => {
    setSelectedTaskId(event.target.value);
    setDeadline(null);
    setRemainingSeconds(FOCUS_DURATION_SECONDS);
    setIsComplete(false);
  };

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  let statusMessage = "Ready for a 25-minute focus session.";
  if (isComplete) {
    statusMessage = "Session complete. Take a short break before your next one.";
  } else if (isRunning) {
    statusMessage = "Focus session in progress.";
  } else if (remainingSeconds < FOCUS_DURATION_SECONDS) {
    statusMessage = "Session paused. Resume when you're ready.";
  }

  return (
    <section className="focus-session-widget" aria-labelledby="focus-session-title">
      <h3 id="focus-session-title">Focus session</h3>
      <p>Choose one unfinished task and give it your full attention.</p>

      <label htmlFor="focus-task">Focus task</label>
      <select
        id="focus-task"
        value={selectedTaskId}
        onChange={handleTaskChange}
        disabled={isRunning || pendingTasks.length === 0}
      >
        {pendingTasks.length === 0 ? (
          <option value="">No unfinished tasks</option>
        ) : (
          pendingTasks.map((task) => (
            <option key={task.id} value={String(task.id)}>
              {task.title}
            </option>
          ))
        )}
      </select>

      <div
        className="focus-timer"
        role="timer"
        aria-live="off"
        aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
      >
        {minutes}:{seconds}
      </div>
      <progress
        value={FOCUS_DURATION_SECONDS - remainingSeconds}
        max={FOCUS_DURATION_SECONDS}
        aria-label="Focus session progress"
      />
      <p className="focus-session-status" role="status">
        {selectedTask
          ? `${statusMessage} ${isComplete ? "" : `Task: ${selectedTask.title}`}`
          : "Add an unfinished task to start a focus session."}
      </p>

      <div className="focus-session-controls">
        {!isRunning && !isComplete && (
          <button
            type="button"
            className="focus-button"
            onClick={handleStart}
            disabled={!selectedTask}
          >
            {remainingSeconds < FOCUS_DURATION_SECONDS
              ? "Resume session"
              : "Start session"}
          </button>
        )}
        {isRunning && (
          <button
            type="button"
            className="focus-button"
            onClick={handlePause}
          >
            Pause
          </button>
        )}
        <button
          type="button"
          className="focus-button focus-button-secondary"
          onClick={handleReset}
          disabled={remainingSeconds === FOCUS_DURATION_SECONDS && !isComplete}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
