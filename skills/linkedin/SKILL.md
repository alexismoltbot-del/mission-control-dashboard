---
name: linkedin
description: Read and monitor LinkedIn messages and notifications using browser automation. Use when the user asks to check LinkedIn messages, DMs, notifications, connection requests, or any LinkedIn inbox-related tasks.
---

# LinkedIn Skill

Read LinkedIn messages and notifications via browser automation.

## Prerequisites

- Chrome browser with Clawdbot Browser Relay extension installed
- User logged into LinkedIn in Chrome
- Tab attached to relay (user clicks extension icon, badge shows ON)

## Commands

### Check Messages

```
browser action=snapshot profile=chrome targetUrl="https://www.linkedin.com/messaging/"
```

### Check Notifications

```
browser action=snapshot profile=chrome targetUrl="https://www.linkedin.com/notifications/"
```

### Check Connection Requests

```
browser action=snapshot profile=chrome targetUrl="https://www.linkedin.com/mynetwork/invitation-manager/"
```

## Workflow: Read Messages

1. **Open LinkedIn messaging:**
   ```
   browser action=open profile=chrome targetUrl="https://www.linkedin.com/messaging/"
   ```

2. **Wait for page load, then snapshot:**
   ```
   browser action=snapshot profile=chrome
   ```

3. **Parse the conversation list** from the snapshot - look for conversation items with names and preview text.

4. **To read a specific conversation**, click on it:
   ```
   browser action=act profile=chrome request={"kind":"click","ref":"<conversation-ref>"}
   ```

5. **Snapshot again** to read the full conversation.

## Workflow: Read a Specific Message

1. Navigate to messaging
2. Snapshot to get conversation list
3. Find the conversation by name
4. Click to open it
5. Snapshot to read messages

## Output Format

When reporting messages, format as:

```
📬 LinkedIn Messages:

**[Name]** — [time]
[preview or full message]

**[Name]** — [time]
[preview or full message]
```

## Notes

- LinkedIn may show a login prompt if session expired → ask user to log in manually
- Rate limit browser actions to avoid detection
- If snapshot fails, ask user to attach the tab (click extension icon)
- For unread count, check the notification badge on the messaging icon

## Limitations

- Cannot send messages automatically (per SOUL.md draft-only rule)
- Cannot accept/reject connection requests without user approval
- Read-only access to protect user's LinkedIn account
