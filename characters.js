/* Personagens: criação, bônus, XP/nível. Cada personagem pertence a um dono (owner). */
const Chars={
 all:()=>DB.get('chars',[]),
 mine:()=>Chars.all().filter(c=>c.owner===Auth.user().nome),
 save(c){const a=Chars.all(),i=a.findIndex(x=>x.id===c.id);i<0?a.push(c):a[i]=c;DB.set('chars',a)},
 canEdit:c=>Auth.isMaster()||c.owner===Auth.user().nome,
 cap:c=>5+Math.floor(c.nivel/10),
 bonus(c){const b={};[FAMILIAS.find(f=>f.nome===c.familia),CLASSES.find(k=>k.nome===c.classe)].forEach(o=>o&&Object.entries(o.bonus).forEach(([k,v])=>b[k]=(b[k]||0)+v));return b},
 total(c,a){return c.attrs[a]+(Chars.bonus(c)[a]||0)},
 maxHP:c=>20+Chars.total(c,'Resistência')*5+c.nivel*2,
 maxET:c=>10+Chars.total(c,'Determinação')*3+(c.familia==='Veyron'?5:0)+(c.classe==='Titânico'?3:0),
 novo(d){return{id:crypto.randomUUID(),owner:Auth.user().nome,nivel:1,xp:0,livres:20,
   attrs:Object.fromEntries(ATTRS.map(a=>[a,1])),...d}},
 addXP(c,x){c.xp+=x;let n=1+Math.floor(c.xp/XP_POR_NIVEL);while(c.nivel<Math.min(n,60)){c.nivel++;c.livres+=2}
   c.hp=Math.min(c.hp??Chars.maxHP(c),Chars.maxHP(c))},
 gastar(c,a,d){ // d = +1 ou -1 (só remove de pontos ainda base)
   if(d>0&&(c.livres<1||c.attrs[a]>=Chars.cap(c)))return false;
   if(d<0&&c.attrs[a]<=1)return false;c.attrs[a]+=d;c.livres-=d;return true}};
