 'use client';
import {useMemo,useState} from 'react';import {buildPlan,discordOutput,block} from '@/lib/planner';
const starter=`King 12951
Ares 12701
Bia 10830
Kdeux 10037
Mwd 9535
Calypso 9234
ROYAL ChrisS 8864
Sultan 8059
Kanna 7791
Tornado 7182
Vragzu 6850
Athena 6320
DBC 6236
PikkuMyy 6157
Chomusuke 5657
Lord Harry 5364
Siske 5057
KittyJoy 4920
Ramoth 4916
Nemonick 4800
Javivi 4700
SchTzr 4600
Bibbi 4500
LadyJess 4400
Egg Sheeran 4300
kaal 4200
nemo 4100
memtec 4000`;
export default function Home(){const[title,setTitle]=useState('FOUNDRY PLAN – FULL FLOW (19 UTC / 14 UTC)');const[raw,setRaw]=useState(starter);const[share,setShare]=useState('');const[edit,setEdit]=useState('');const{players,plan}=useMemo(()=>buildPlan(raw),[raw]);const discord=useMemo(()=>discordOutput(title,plan),[title,plan]);async function savePlan(){const res=await fetch('/api/plans',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,player_input:raw,plan_json:plan,settings_json:{}})});const data=await res.json();if(!res.ok)return alert(data.error||'Save failed');setShare(`${window.location.origin}/plan/${data.id}`);setEdit(`${window.location.origin}/plan/${data.id}?edit=${data.edit_key}`)}function copy(t:string){navigator.clipboard.writeText(t)}return <><header><h1>🔥 Foundry Plan Builder</h1><p>Generate, save and share Foundry plans.</p></header><main className='grid'><section><div className='card'><label>Plan title</label><input value={title} onChange={e=>setTitle(e.target.value)}/><label>Player list</label><textarea value={raw} onChange={e=>setRaw(e.target.value)}/><div className='actions'><button onClick={savePlan}>Save Plan</button><button className='secondary' onClick={()=>copy(discord)}>Copy Discord</button></div></div>{share&&<div className='card'><label>View link</label><input value={share} readOnly onFocus={e=>e.currentTarget.select()}/><label>Edit link</label><input value={edit} readOnly onFocus={e=>e.currentTarget.select()}/></div>}<div className='card'><h2>Players</h2><div className='table-wrap'><table><thead><tr><th>#</th><th>Name</th><th>Power</th></tr></thead><tbody>{players.map((p,i)=><tr key={p.name}><td>{i+1}</td><td>{p.name}</td><td>{p.power.toLocaleString()}</td></tr>)}</tbody></table></div></div></section><section><div className='card'><div className='row'><h2>Discord Output</h2><button onClick={()=>copy(discord)}>Copy</button></div><textarea className='copybox' value={discord} readOnly/></div><div className='card'><h2>Game Outputs</h2><label>Phase 1</label><textarea value={`🔥 Phase 1\n${block(plan.p1)}`} readOnly/><label>Phase 2-3</label><textarea value={`Phase 2-3\n${block(plan.p23)}`} readOnly/><label>Phase 4</label><textarea value={`🔥 Phase 4\n${block(plan.p4)}`} readOnly/></div><PlanBoard title={title} plan={plan}/></section></main></>}
function PlanBoard({title,plan}:any){const colours:any={'Prototype 1':'#fde047','Prototype 2':'#ef4444','Repair 1':'#fb923c','Repair 2':'#22c55e','Repair 3':'#67e8f9','Repair 4':'#2563eb','Boiler':'#c026d3','Boiler from P1':'#fde047','Transit':'#f0abfc','Middle':'#ef4444','Workshop NW':'#a855f7','Workshop NE':'#2563eb','Workshop SE':'#ec4899','Workshop SW':'#2dd4bf','Munition':'#22c55e','Munitions':'#ef4444','R1':'#fb923c','R2':'#22c55e','R3':'#67e8f9','R4':'#2563eb','P2':'#ef4444'};function phase(rows:any[],label:string,intent:string,side:string,note?:string){return <div className='board-phase'><div className='board-phase-head'><div className='board-phase-label'>{label}</div><div className='board-phase-intent'>{intent}</div></div>{note&&<div className='board-note'>{note}</div>}<div className='board-table' style={{gridTemplateColumns:`190px repeat(${rows.length}, 1fr)`}}><div className='board-side'>{side}</div>{rows.map((r:any)=><div className='board-col' key={r.building}><div className='board-col-head' style={{background:colours[r.building]||'#e5e7eb'}}>{r.building}</div><div className='board-names'><div className='board-lead'>{r.leader}</div>{r.players.split(',').map((p:string)=><div key={p}>{p.trim()}</div>)}</div></div>)}</div></div>}return <div className='card'><h2>Plan Board</h2><div className='board-wrap'><div id='planBoard'><div className='board-title'>Foundry Battle NEW (Workshops)</div><div className='board-time'>{title}</div>{phase(plan.p1,'Phase 1:','First Occupation: stay in buildings until workshops open','Take Buildings')}{phase(plan.p23,'Phase 2&3:','Move to main buildings, hold workshops and collect','Hold & Collect','Prototype 2 ignored')}{phase(plan.p4,'Phase 4:','Hit & Run & Collect','Take Buildings','ALWAYS DOUBLE rally')}<div className='board-footer'><b>Key rules:</b> Full marches only · Fill rallies fast · No freelancing · Final 5: centre push</div></div></div></div>}
