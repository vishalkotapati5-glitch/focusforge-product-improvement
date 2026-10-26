# Product improvement: Focus sessions

## What Motivation Mode did

The dashboard displayed one random motivational quote from the server. The
widget fetched a quote on load and requested another one every five seconds.

## Why it was not effective

Quotes were generic and did not help users decide what to work on, track their
progress, or take action on a task. Refreshing every five seconds also changed
the content while users were trying to focus and made repeated API requests
without adding useful information.

## What changed

The quote widget is replaced by a task-linked focus session:

- Users choose an unfinished task from their existing task list.
- A 25-minute countdown can be started, paused, resumed, and reset.
- The timer is calculated against a deadline so it stays accurate if browser
  timers are delayed.
- When a task is completed or removed from the unfinished list, the selection
  and session reset to avoid keeping focus on a finished task.
- The widget provides clear status text, accessible labels, and a progress bar.
- The layout adapts for narrow screens.

The feature uses the task data already loaded by the dashboard, so it requires
no database migration or new server endpoint. The quote endpoint remains on
the server for compatibility, but the client no longer requests it. Focus
sessions are intentionally kept in page state and are not persisted after a
reload.

The backend setup now includes a placeholder `.env.example`; real database
credentials belong only in the ignored local `.env` file.

## How this helps

Instead of showing passive encouragement, the dashboard helps users commit to
one concrete task and structure a focused work interval. The timer controls
also let users pause or restart without changing the task-management flow.
