# ARC Foundry Planner v4.4 — cloud saves

Main page opens the PWA at /planner/index.html. Manual overrides are unlimited and automatic assignments retain v4.3 behaviour.

Save to Cloud creates a named plan or updates the opened plan. Open Cloud Plan accepts a cloud link. Save Cloud Copy creates a separate plan. Cloud Links shows a view link and a secret edit link. Anyone with the view link can read the latest saved plan; anyone with the edit link can update it. Keep edit links private. Saves are manual, not real-time collaboration. Conflicting updates are rejected; save a copy to preserve your work before reloading.

Save on Device and snapshot Share Plan still work offline. Cloud saves require an internet connection. Saved edit links are remembered on the device; retain an edit link to recover access on another device.

## Deployment setup

In Vercel, set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to the existing Supabase project values. Never put the service role key in browser code or a NEXT_PUBLIC key variable. Create the plans table using supabase_schema.sql if it does not exist, then run cloud_save_security.sql to remove anonymous direct table access. Redeploy after changing environment variables.

Run npm install and npm run build from this directory. Cloud storage is unavailable until Supabase is configured. The UI shows failures and preserves the plan on screen.
