'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.replace('/planner/index.html' + window.location.search + window.location.hash);
  }, []);

  return <main><p>Opening ARC Foundry Planner v4.3…</p><a href="/planner/index.html">Open planner</a></main>;
}
