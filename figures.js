// Schémas animés des exercices : bonhommes en traits.
// Chaque pose = une suite d'images clés. Un membre est soit une cible [x, y, sens du coude/genou] résolue
// par cinématique inverse à deux segments, soit des angles absolus ['a', segment1, segment2] (0° = droite, 90° = bas).
// Le sol est à y = 121, les chevilles à y = 118.
const FIG_L={T:34,N:5,R:7,UA:17,FA:16,TH:24,SH:23,FT:8};
const D2R=Math.PI/180;
function fDir(a){return [Math.cos(a*D2R),Math.sin(a*D2R)]}
function fAdd(p,a,l){const d=fDir(a);return [p[0]+d[0]*l,p[1]+d[1]*l]}
function fLimb(root,limb,l1,l2){
  if(limb[0]==='a'){const j=fAdd(root,limb[1],l1);return [j,fAdd(j,limb[2],l2)];}
  const [tx,ty,s]=limb,dx=tx-root[0],dy=ty-root[1],d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d;
  if(d>=l1+l2-.01)return [[root[0]+ux*l1,root[1]+uy*l1],[root[0]+ux*(l1+l2),root[1]+uy*(l1+l2)]];
  const a=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-a*a));
  return [[root[0]+ux*a-uy*h*s,root[1]+uy*a+ux*h*s],[tx,ty]];
}
const STAND={hip:[100,71],t:-90,n:['a',97,92],f:['a',83,88],N:[101,118,-1],F:[98,118,-1]};
const FIGS={
  // ---------- FORCE HAUT ----------
  z:{props:[['bar',130,80]],frames:[
    {hip:[95,104],t:14,n:[130,80,1],f:[129,80,1],N:[74,118,1],F:[71,118,1],fN:180,fF:180},
    {hip:[102,85],t:3,n:[130,80,1],f:[129,80,1],N:[74,118,1],F:[71,118,1],fN:180,fF:180}]},
  p:{props:[['stool',92,93,26]],frames:[
    {hip:[78,85.5],t:-43.7,n:[104,92,-1],f:[102,92,-1],N:[44,118,1],F:[42,118,1],fN:100,fF:100},
    {hip:[86.7,98.3],t:-24.8,n:[104,92,-1],f:[102,92,-1],N:[44,118,1],F:[42,118,1],fN:100,fF:100}]},
  w:{props:[['chair',110,93,26,1]],frames:[
    {hip:[82,80],t:-30,n:[128,92,1],f:[126,92,1],N:[60,118,1],F:[58,118,1],fN:100,fF:100},
    {hip:[80,84],t:-12,n:[128,92,1],f:[126,92,1],N:[60,118,1],F:[58,118,1],fN:100,fF:100}]},
  x:{props:[['chair',58,93,28,-1]],frames:[
    {hip:[90,92],t:-92,n:[82,92,1],f:[80,92,1],N:[132,118,1],F:[129,118,1],fN:-70,fF:-70},
    {hip:[90,110],t:-90,n:[82,92,1],f:[80,92,1],N:[132,118,1],F:[129,118,1],fN:-70,fF:-70}]},
  ti:{frames:[
    {hip:[90,113],t:-115,h:-10,n:[74,117,1],f:[71,117,1],N:[124,118,-1],F:[121,118,-1]},
    {hip:[107,84],t:178,h:25,n:[74,117,1],f:[71,117,1],N:[124,118,-1],F:[121,118,-1]}]},
  dev:{view:'face',vb:'0 -24 200 152',db:['n','f'],frames:[
    {...STAND,n:['a',15,-90],f:['a',165,-90],N:[106,118,-1],F:[94,118,1],fF:180},
    {...STAND,n:['a',-72,-86],f:['a',-108,-94],N:[106,118,-1],F:[94,118,1],fF:180}]},
  curl:{db:['n','f'],frames:[
    {...STAND,n:['a',95,92],f:['a',85,88]},
    {...STAND,n:['a',95,-70],f:['a',85,-80]}]},
  // ---------- FORCE BAS ----------
  sq:{frames:[
    {...STAND,hip:[99,71],t:-90,n:['a',0,0],f:['a',4,2]},
    {...STAND,hip:[84,92],t:-56,n:['a',8,2],f:['a',12,4]}]},
  bu:{props:[['chair',46,93,32,-1]],frames:[
    {hip:[104,72],t:-88,n:['a',95,90],f:['a',85,88],N:[112,118,-1],F:[72,91,-1],fF:185},
    {hip:[92,91],t:-72,n:['a',100,90],f:['a',80,88],N:[112,118,-1],F:[72,91,-1],fF:185}]},
  step:{vb:'0 -22 200 150',props:[['box',112,96,40,25]],frames:[
    {hip:[98,72],t:-84,n:['a',100,90],f:['a',80,85],N:[122,94,-1],F:[96,118,-1]},
    {hip:[119,48],t:-89,n:['a',95,90],f:['a',85,88],N:[122,94,-1],F:[106,92,-1]}]},
  pat:{view:'face',frames:[
    {hip:[100,71],t:-90,n:['a',100,92],f:['a',80,88],N:[107,118,-1],F:[93,118,1]},
    {hip:[100,88],t:-92,n:['a',110,95],f:['a',70,85],N:[96,118,1],F:[124,116,-1],fF:20}]},
  f:{view:'face',frames:[
    {hip:[100,82],t:-90,n:['a',100,92],f:['a',80,88],N:[70,118,1],F:[130,118,-1],fN:180,fF:0},
    {hip:[87,99],t:-100,n:['a',60,40],f:['a',40,20],N:[70,118,1],F:[130,118,-1],fN:180,fF:-60}]},
  ht:{props:[['box',22,93,38,28]],bar:['n'],frames:[
    {hip:[84,116],t:226,n:[84,113,1],f:[84,113,1],N:[112,118,-1],F:[109,118,-1]},
    {hip:[94,92],t:180,n:[94,89,1],f:[94,89,1],N:[112,118,-1],F:[109,118,-1]}]},
  mol:{props:[['box',100,102,32,19],['wall',150]],frames:[
    {hip:[96,58],t:-90,n:[148,50,1],f:[146,52,1],N:[96,105,-1],F:[94,105,-1],fN:-15,fF:-15},
    {hip:[99,49],t:-90,n:[148,46,1],f:[146,48,1],N:[99,96,-1],F:[97,96,-1],fN:55,fF:55}]},
  // ---------- PRÉPA SURF ----------
  pop:{frames:[
    {hip:[70,113],t:0,h:-10,n:[104,118,1],f:[102,118,1],N:[24,116,1],F:[22,117,1],fN:100,fF:100},
    {hip:[68,100],t:-18,h:-10,n:[104,118,1],f:[102,118,1],N:[24,116,1],F:[22,117,1],fN:100,fF:100},
    {hip:[84,88],t:-72,n:['a',-10,0],f:['a',190,180],N:[106,118,-1],F:[60,118,-1],fN:20,fF:-20}]},
  swim:{frames:[
    {hip:[80,113],t:-8,c:4,h:-15,n:['a',-15,-10],f:['a',170,175],N:[36,110,1],F:[36,112,1],fN:170,fF:170},
    {hip:[80,113],t:-8,c:4,h:-15,n:['a',170,175],f:['a',-15,-10],N:[36,110,1],F:[36,112,1],fN:170,fF:170}]},
  ytw:{view:'dessus',vb:'40 4 120 150',frames:[
    {hip:[100,104],t:-90,n:['a',-58,-58],f:['a',-122,-122],N:['a',94,90],F:['a',86,90]},
    {hip:[100,104],t:-90,n:['a',0,0],f:['a',180,180],N:['a',94,90],F:['a',86,90]},
    {hip:[100,104],t:-90,n:['a',20,-60],f:['a',160,-120],N:['a',94,90],F:['a',86,90]}]},
  row1:{props:[['box',62,93,64,28]],db:['n'],frames:[
    {hip:[94,72],t:-2,h:20,n:['a',95,90],f:[126,92,1],N:[86,118,-1],F:[72,90,1],fF:180},
    {hip:[94,72],t:-2,h:20,n:['a',190,100],f:[126,92,1],N:[86,118,-1],F:[72,90,1],fF:180}]},
  bound:{view:'face',frames:[
    {hip:[76,78],t:-80,n:['a',60,80],f:['a',150,120],N:[76,118,-1],F:['a',120,80]},
    {hip:[124,78],t:-100,n:['a',60,100],f:['a',120,100],N:['a',60,100],F:[124,118,1]}]},
  spl:{frames:[
    {hip:[80,110],t:-24,n:[128,118,-1],f:['a',-95,-90],N:[40,118,1],F:[40,115,1],fN:-90,fF:-90},
    {hip:[80,101],t:-14,n:[128,118,-1],f:['a',-95,-90],N:[40,118,1],F:[40,115,1],fN:-90,fF:-90}]},
  db:{frames:[
    {hip:[80,116],t:0,n:['a',-90,-90],f:['a',-88,-88],N:['a',-90,180],F:['a',-92,182]},
    {hip:[80,116],t:0,n:['a',-15,-8],f:['a',-88,-88],N:['a',-90,180],F:['a',178,180]}]},
  bal:{frames:[
    {...STAND,n:['a',100,92],f:['a',80,88],F:['a',30,110]},
    {...STAND,n:['a',140,120],f:['a',40,60],F:['a',20,100]}]},
  // ---------- MOBILITÉ ----------
  catcow:{frames:[
    {hip:[80,92],t:-2,c:-10,h:70,n:[116,118,1],f:[114,118,1],N:[56,117,-1],F:[54,117,-1],fN:180,fF:180},
    {hip:[80,92],t:-2,c:7,h:-35,n:[116,118,1],f:[114,118,1],N:[56,117,-1],F:[54,117,-1],fN:180,fF:180}]},
  wgs:{frames:[
    {hip:[84,104],t:-30,n:[112,118,1],f:['a',92,90],N:[118,118,-1],F:[50,118,1],fF:180},
    {hip:[84,104],t:-30,h:-40,n:[112,118,1],f:['a',-95,-90],N:[118,118,-1],F:[50,118,1],fF:180}]},
  n9090:{view:'dessus',frames:[
    {hip:[104,84],t:-90,ts:.3,n:['a',40,60],f:['a',140,120],N:['a',-90,180],F:['a',180,90],fN:180,fF:90},
    {hip:[104,84],t:-90,ts:.3,n:['a',-60,-80],f:['a',-120,-100],N:['a',-90,180],F:['a',180,90],fN:180,fF:90}]},
  deepsq:{frames:[
    {...STAND,hip:[88,101],t:-72,n:['a',45,-40],f:['a',50,-35]},
    {...STAND,hip:[88,103],t:-68,n:['a',50,-30],f:['a',55,-25]}]},
  pigeon:{frames:[
    {hip:[90,108],t:-80,n:[100,118,1],f:[98,118,1],N:[100,118,-1],F:[44,118,1],fN:180,fF:180},
    {hip:[90,110],t:-12,h:20,n:[136,118,1],f:[134,118,1],N:[100,118,-1],F:[44,118,1],fN:180,fF:180}]},
  hipflex:{props:[['box',24,92,30,29]],frames:[
    {hip:[84,92],t:-90,n:[112,96,1],f:[110,96,1],N:[116,118,-1],F:[52,92,-1],fF:-90},
    {hip:[92,95],t:-96,n:[114,98,1],f:[112,98,1],N:[118,118,-1],F:[52,92,-1],fF:-90}]},
  ischio:{props:[['box',130,92,30,29]],frames:[
    {hip:[98,72],t:-90,n:[102,72,1],f:[100,72,1],N:[140,89,1],F:[96,118,-1],fN:-80},
    {hip:[96,72],t:-42,n:[128,84,1],f:[126,84,1],N:[140,89,1],F:[96,118,-1],fN:-80}]},
  breath:{frames:[
    {hip:[80,116],t:0,c:0,n:[96,108,1],f:[108,108,1],N:[56,118,1],F:[54,118,1],fN:180,fF:180},
    {hip:[80,116],t:0,c:-5,n:[96,105,1],f:[108,107,1],N:[56,118,1],F:[54,118,1],fN:180,fF:180}]},
  thread:{frames:[
    {hip:[80,92],t:-2,h:30,n:[116,118,1],f:[114,118,1],N:[56,117,-1],F:[54,117,-1],fN:180,fF:180},
    {hip:[80,92],t:14,h:60,n:[86,117,1],f:[116,118,1],N:[56,117,-1],F:[54,117,-1],fN:180,fF:180}]},
  book:{view:'dessus',frames:[
    {hip:[80,70],t:0,n:['a',88,88],f:['a',92,92],N:['a',95,180],F:['a',90,178]},
    {hip:[80,70],t:0,h:-30,n:['a',-88,-88],f:['a',92,92],N:['a',95,180],F:['a',90,178]}]},
  cobra:{frames:[
    {hip:[76,116],t:-3,c:0,h:0,n:[104,118,1],f:[102,118,1],N:[30,117,1],F:[30,118,1],fN:170,fF:170},
    {hip:[76,116],t:-26,c:5,h:-25,n:[104,118,1],f:[102,118,1],N:[30,117,1],F:[30,118,1],fN:170,fF:170}]},
  dog:{frames:[
    {hip:[88,74],t:40,h:5,n:[134,118,1],f:[132,118,1],N:[72,118,1],F:[70,118,1],fN:40,fF:40},
    {hip:[86,72],t:42,h:5,n:[134,118,1],f:[132,118,1],N:[72,118,1],F:[70,118,1],fN:5,fF:5}]},
  angels:{view:'dessus',vb:'40 4 120 150',frames:[
    {hip:[100,104],t:-90,n:['a',20,-60],f:['a',160,-120],N:['a',94,90],F:['a',86,90]},
    {hip:[100,104],t:-90,n:['a',-58,-58],f:['a',-122,-122],N:['a',94,90],F:['a',86,90]}]},
  pecwall:{props:[['wall',121]],frames:[
    {...STAND,n:['a',0,-90],f:['a',95,90]},
    {...STAND,hip:[98,71],t:-92,n:['a',0,-90],f:['a',100,92]}]},
  child:{frames:[
    {hip:[70,107],t:-82,h:0,n:['a',70,20],f:['a',66,22],N:[72,118,1],F:[70,118,1],fN:180,fF:180},
    {hip:[70,110],t:-6,h:35,n:[140,118,1],f:[138,118,1],N:[72,118,1],F:[70,118,1],fN:180,fF:180}]}
};
FIGS.t=FIGS.z;FIGS.q=FIGS.p;

function fLerp(a,b,k){
  if(typeof a==='number')return a+(b-a)*k;
  if(a[0]==='a')return ['a',fLerp(a[1],b[1],k),fLerp(a[2],b[2],k)];
  return [fLerp(a[0],b[0],k),fLerp(a[1],b[1],k),a[2]];
}
function fFrame(P,ms){
  const fr=P.frames,n=fr.length;if(n<2)return fr[0];
  const move=P.dur||1100,hold=550,seg=move+hold,steps=2*(n-1),cyc=ms%(seg*steps),i=Math.floor(cyc/seg),loc=cyc-i*seg;
  const from=i<n-1?i:steps-i,to=i<n-1?i+1:steps-i-1;
  let k=Math.min(1,loc/move);k=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
  const A=fr[from],B=fr[to],o={};
  for(const key of new Set([...Object.keys(A),...Object.keys(B)])){
    const a=A[key]??0,b=B[key]??0;o[key]=fLerp(a,b,k);
  }
  return o;
}
function fJoints(p){
  const L=FIG_L,hip=p.hip,t=p.t,sh=fAdd(hip,t,L.T*(p.ts||1)),ht=t+(p.h||0),neck=fAdd(sh,ht,L.N),head=fAdd(neck,ht,L.R);
  const [eN,hN]=fLimb(sh,p.n,L.UA,L.FA),[eF,hF]=fLimb(sh,p.f,L.UA,L.FA);
  const [kN,aN]=fLimb(hip,p.N,L.TH,L.SH),[kF,aF]=fLimb(hip,p.F,L.TH,L.SH);
  const tN=fAdd(aN,p.fN||0,L.FT),tF=fAdd(aF,p.fF||0,L.FT);
  return {hip,sh,neck,head,eN,hN,eF,hF,kN,aN,kF,aF,tN,tF};
}
// Cadrage automatique : boîte englobant toutes les images clés et les accessoires
function fBox(P){
  if(P._box)return P._box;
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const ext=(x,y)=>{x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);};
  P.frames.forEach(fr=>{const J=fJoints(fr);for(const k in J){const r=k==='head'?FIG_L.R:3;ext(J[k][0]-r,J[k][1]-r);ext(J[k][0]+r,J[k][1]+r);}});
  (P.props||[]).forEach(([k,x,y,w,h])=>{
    if(k==='box'||k==='stool')(ext(x,y),ext(x+w,121));
    else if(k==='chair')(ext(x,y-30),ext(x+w,121));
    else if(k==='bar')(ext(x-14,y-3),ext(x+14,y+3));
    else if(k==='wall')ext(x+2,y1);
  });
  const ground=P.view!=='dessus';if(ground)y1=Math.max(y1,123);
  let w=x1-x0+16,h=y1-y0+10;const cx=(x0+x1)/2;
  if(w<h*1.5){w=h*1.5;}           // format paysage homogène
  if(h<w/2.4){y0-= (w/2.4-h);h=w/2.4;}
  return P._box=[cx-w/2,y0-6,w,h];
}
function fBody(P,p){
  const L=FIG_L,{hip,sh,neck,head,eN,hN,eF,hF,kN,aN,kF,aF,tN,tF}=fJoints(p),t=p.t;
  const pt=q=>q[0].toFixed(1)+','+q[1].toFixed(1);
  const pl=(arr,cls)=>`<polyline class="${cls}" points="${arr.map(pt).join(' ')}"/>`;
  const mid=[(hip[0]+sh[0])/2,(hip[1]+sh[1])/2],ctl=fAdd(mid,t+90,(p.c||0)*2);
  const prop=(arm,hand)=>(P.db||[]).includes(arm)?`<rect class="fdb" x="${(hand[0]-5).toFixed(1)}" y="${(hand[1]-2.5).toFixed(1)}" width="10" height="5" rx="1.5"/>`:(P.bar||[]).includes(arm)?`<circle class="fdb" cx="${pt(hand).split(',')[0]}" cy="${pt(hand).split(',')[1]}" r="4.5"/>`:'';
  return pl([hF,eF,sh],'ff')+prop('f',hF)+pl([tF,aF,kF,hip],'ff')
    +`<path class="fb" d="M${pt(hip)} Q${pt(ctl)} ${pt(sh)} L${pt(neck)}"/><circle class="fh" cx="${head[0].toFixed(1)}" cy="${head[1].toFixed(1)}" r="${L.R}"/>`
    +pl([tN,aN,kN,hip],'fb')+pl([hN,eN,sh],'fb')+prop('n',hN);
}
function fProps(P){
  return (P.props||[]).map(pr=>{
    const [k,x,y,w,h]=pr;
    if(k==='box')return `<rect class="fp" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>`;
    if(k==='stool')return `<path class="fp" d="M${x} ${y}h${w}M${x+3} ${y}v${121-y}M${x+w-3} ${y}v${121-y}"/>`;
    if(k==='chair'){const back=h===1?x+w:x;return `<path class="fp" d="M${x} ${y}h${w}M${x+2} ${y}v${121-y}M${x+w-2} ${y}v${121-y}M${back} ${y}v-30"/>`;}
    if(k==='bar')return `<path class="fp" d="M${x-14} ${y}h28"/><circle class="fpb" cx="${x}" cy="${y}" r="3"/>`;
    if(k==='wall')return `<path class="fp" d="M${x} -40V121"/>`;
    return '';
  }).join('');
}
const FIG_STILL=typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function figSVG(key,cls=''){
  const P=FIGS[key];if(!P)return '';
  const p=FIG_STILL?P.frames[P.frames.length-1]:P.frames[0];
  const b=fBox(P);
  return `<svg class="fig ${cls}" viewBox="${b.map(v=>v.toFixed(1)).join(' ')}" data-fig="${key}" aria-hidden="true">${P.view==='dessus'?'':`<path class="fg" d="M${b[0].toFixed(1)} 121H${(b[0]+b[2]).toFixed(1)}"/>`}${fProps(P)}<g class="fgb">${fBody(P,p)}</g></svg>${P.view?`<div class="fig-view">vue ${P.view==='face'?'de face':'de dessus'}</div>`:''}`;
}
let figRAF=null,figLast=0;
function figTick(now){
  const els=document.querySelectorAll('svg.fig[data-fig]');
  if(!els.length||FIG_STILL){figRAF=null;return;}
  if(now-figLast>33){figLast=now;els.forEach(el=>{const P=FIGS[el.dataset.fig];if(P&&P.frames.length>1)el.querySelector('.fgb').innerHTML=fBody(P,fFrame(P,now));});}
  figRAF=requestAnimationFrame(figTick);
}
function figStart(){if(!figRAF&&!FIG_STILL)figRAF=requestAnimationFrame(figTick);}
