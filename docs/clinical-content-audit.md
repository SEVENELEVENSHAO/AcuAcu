# AcuAcu Clinical Content Audit

The versioned audit ledger is `data/clinical-content-audit.json`. It covers all conditions and patterns in the course dataset while preserving decisions between inventory refreshes.

## Workflow

1. Add lecture PDFs to `references/course` and textbook PDFs to `references/textbooks`.
2. Run `npm run audit:sync`.
3. Compare all available sources for the current pattern.
4. Record source pages, differences, decisions, and open questions in the ledger.
5. Run `npm run audit:check`. Every reviewed pattern must cite its lecture and every PDF currently inventoried in `references/textbooks`.
6. Run `npm run audit:report` to refresh `docs/clinical-content-audit-progress.md`.
7. Set the pattern to `awaiting_approval`.
8. Set it to `approved` only after explicit user approval and record `approvedAt`.
9. Apply approved content after every pattern in the condition is approved.
10. Run `npm run audit:check`, `npm run build`, and verify the condition in the app.

## Statuses

- `not_started`: Sources have not been reviewed.
- `sources_reviewed`: Available sources were compared.
- `awaiting_approval`: Consolidated content is ready for an explicit decision.
- `approved`: The user approved the final content and point roles.

## Audit Boundary

The audit covers published condition and pattern names, principles, core points, additions, techniques, clinical notes, red flags, citations, and pattern-specific point roles. Herbal formula content is excluded.
