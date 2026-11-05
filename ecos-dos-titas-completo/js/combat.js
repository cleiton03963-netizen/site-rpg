/* Combate por turnos: d20 + atributo contra dificuldade; dano 1d6 + Força. */
const d=n=>1+Math.floor(Math.random()*n);
const Combat={
 log:[],
 say(t){Combat.log.unshift(t)},
 teste(c,attr,dc){const r=d(20),t=r+Chars.total(c,attr);return{r,t,ok:t>=dc}},
 ataque(c,en){const x=this.teste(c,'Força',en.def);
  if(!x.ok){this.say(`${c.nome} ataca: d20=${x.r} → total ${x.t} (precisa ${en.def}). Errou.`);return}
  const dano=d(6)+Chars.total(c,'Força')+(x.r===20?5:0);en.hp=Math.max(0,en.hp-dano);
  this.say(`${c.nome} acerta! d20=${x.r} → ${x.t}. Dano ${dano}${x.r===20?' (crítico!)':''}.`)},
 defender(c){c.defendendo=true;this.say(`${c.nome} assume postura defensiva (+3 de defesa).`)},
 titan(c,en){const t=TITAS.find(x=>x.nome===c.poder);if(!t){this.say('Sem poder titânico.');return}
  if(c.et<t.custo){this.say(`Energia insuficiente (${t.custo} ET).`);return}
  c.et-=t.custo;const dano=d(10)+Chars.total(c,'Força')+t.custo;en.hp=Math.max(0,en.hp-dano);
  this.say(`${c.nome} usa ${t.suprema}! Dano ${dano}. (-${t.custo} ET)`)},
 inimigo(c,en){const r=d(20),def=10+Chars.total(c,'Resistência')+(c.defendendo?3:0);c.defendendo=false;
  if(r+en.atk>=def){const dano=d(6)+en.atk;c.hp=Math.max(0,c.hp-dano);this.say(`${en.nome} acerta (d20=${r}). Dano ${dano}.`)}
  else this.say(`${en.nome} erra (d20=${r}).`)}};
