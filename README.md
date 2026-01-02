# Task

## Important Before Task

- Change vite.config allowedHost value to represent current sandbox URL

This repo is a small full-stack app that shows “activities” for a selected tenant (institution).

You only need to read **two files** to understand the current behavior:

- `client/src/App.jsx`
- `server/src/index.ts`

## Goal (discussion / review)

This is a code-review style exercise. The code is intentionally **suboptimal**.

Your job is to identify what you think is important, explain why it matters, and discuss how you would improve it (with tradeoffs). **You do not need to implement all the changes, but you should explain what you would do.**

## What to do

Review the two files and provide a short write-up covering:

- **What’s broken / risky**: bugs, correctness issues, surprising behavior, edge cases.
- **What you would improve**: design, maintainability, UX, performance, reliability, security, multi-tenant concerns.
- **Prioritization**: what you would do first vs later (and why).
- **Tradeoffs**: alternative approaches and why you’d pick one.

You can be as practical as you want (e.g., mention what you’d log, test, refactor, or validate), but implementation is not required.

## Optional: run it

## Constraints

- Keep your suggestions grounded in the existing setup (no need to introduce databases/auth systems/framework rewrites).
- If you mention adding dependencies, explain why they’re worth it.

## What we’re evaluating

- **Clarity**: can you communicate issues and improvements precisely?
- **Judgment**: do you prioritize well and avoid over-engineering?
- **Systems thinking**: multi-tenant correctness/safety, API contracts, data flow, failure modes.
- **Pragmatism**: suggestions that are actionable and maintainable.
