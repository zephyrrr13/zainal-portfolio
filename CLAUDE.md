# Zainal Portfolio Project

## Task Execution Workflow (prd-taskmaster manual mode)

Task source: `.taskmaster/tasks/tasks.json`.

1. Confirm `validate-tasks`, `enrich-tasks`, and `validate-tasks --require-phase-config` pass.
2. Create visible work items from validated tasks.
3. Mark a task `in-progress` in `tasks.json` before implementation.
4. Implement and verify task using captured execution evidence.
5. Mark task `done` only after verification passes.
6. Update visible work items before moving to next task.

Project constraints: local verification before Vercel deployment; Next.js App Router, TypeScript, Tailwind CSS, and GSAP; no frontend secrets; no gradients; accessible keyboard navigation and reduced-motion support; curated local Behance data only.

Verification commands:

```bash
npm run lint
npm run build
python3 /Users/zephyr/.hermes/skills/prd-taskmaster/script.py validate-tasks --require-phase-config
```
