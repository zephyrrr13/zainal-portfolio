---
name: vibe-check
description: Security checklist, rules, and audit workflow for vibe coded applications covering 17 critical vulnerability categories.
---

# Vibe Check Security Skill

This skill incorporates the **Vibe Check** security rules and audit methodology by Benav Labs (https://github.com/benavlabs/vibe-check).

## Rules & Capabilities
- Investigates and audits 17 critical vulnerability categories.
- Ensures secrets are never committed or exposed in frontend code.
- Verifies security headers, CORS, CSRF, SSRF, XSS, and dependency integrity.
- Outputs structured reports to `security/reports/` and `security/AUDIT_SUMMARY.md`.
