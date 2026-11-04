const KEY='ahmed.sidequests.v1';
export const ids=['deadeye','vice','gwent','breach','abyss','fishing','ghost','extract','tenno'];
export function sanitize(raw={}){const valid=a=>[...new Set(Array.isArray(a)?a.filter(x=>ids.includes(x)):[])];return {found:valid(raw.found),won:valid(raw.won),scores:Object.fromEntries(Object.entries(raw.scores||{}).filter(([k,v])=>ids.includes(k)&&Number.isFinite(v)&&v>=0)),fish:validFish(raw.fish),sound:raw.sound===true};}
const validFish=a=>[...new Set(Array.isArray(a)?a.filter(v=>Number.isInteger(v)&&v>=0&&v<8):[])];
let state;try{state=sanitize(JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{state=sanitize();}
export function read(){return structuredClone(state);}
export function save(patch){state=sanitize({...state,...patch});try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}window.dispatchEvent(new CustomEvent('sidequests:progress',{detail:read()}));return read();}
export function discover(id){if(ids.includes(id)&&!state.found.includes(id))save({found:[...state.found,id]});}
export function complete(id,score){discover(id);save({won:[...state.won,id],scores:{...state.scores,[id]:Math.max(state.scores[id]||0,Math.round(Number(score)||0))}});}
export function catchFish(id){save({fish:[...state.fish,id]});}
