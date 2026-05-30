# Foundry Planner Starter

A hosted version of the Foundry Plan Builder.

## Setup

1. Create free accounts: GitHub, Vercel, Supabase.
2. In Supabase, create a project.
3. Run `supabase_schema.sql` in Supabase SQL Editor.
4. Add these environment variables in Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Install and run locally:

```bash
npm install
npm run dev
```

6. Push to GitHub and import into Vercel.

## How sharing works

Click **Save Plan**. The app creates:
- a public view link
- a private edit link

Anyone with the view link can see the plan. Anyone with the edit link can update it.
