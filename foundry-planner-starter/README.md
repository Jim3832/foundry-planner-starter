# ARC Foundry Planner v4.3

The main page opens the complete v4.3 PWA built on 4 October 2026. Its original files are in public/planner/ and can also be opened directly at /planner/index.html.

Manual building overrides have no player limit. Automatic assignments remain unchanged. Phase 1 edits flow into later phases; later phase edits remain independent overrides.

Plans save on the device. Share Plan generates a snapshot link, not live collaboration or a cloud save. Existing v3.6 share links can be imported by retaining their #plan= fragment on the new planner URL. Keep backups before migrating.

The existing Next.js and Vercel project structure is retained. Run npm install, then npm run dev or npm run build from this directory. The older Supabase API and plan routes are retained for compatibility but the v4.3 planner does not use them.
