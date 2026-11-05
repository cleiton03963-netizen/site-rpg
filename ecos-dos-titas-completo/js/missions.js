/* Missões: o mestre cria/exclui e conclui (concluir dá XP a todos os personagens, uma vez). */
const MISSOES_INICIAIS=[
{nome:'A Queda de Aegis',desc:'A cidade de Aegis foi invadida.',dif:'Difícil',nivel:5,obj:['Evacuar civis','Resistir ao ataque'],rec:'Medalha de Aegis'},
{nome:'O Segredo da Floresta',desc:'Algo antigo vive entre as árvores gigantes.',dif:'Intermediária',nivel:3,obj:['Explorar a floresta','Achar a ruína'],rec:'Mapa antigo'},
{nome:'Experimento Zero',desc:'Documentos revelam um experimento proibido.',dif:'Descoberta importante',nivel:6,obj:['Invadir o laboratório','Recuperar os registros'],rec:'Registros selados'},
{nome:'O Herdeiro Original',desc:'Rumores sobre o último sangue de Eryndor.',dif:'Chefe especial',nivel:10,obj:['Localizar o herdeiro','Enfrentar o guardião'],rec:'Relíquia de Eryndor'}
].map(m=>({...m,id:crypto.randomUUID(),estado:'disponível',xp:XP_MISSAO[m.dif]}));
const Missions={
 all(){let m=DB.get('missions',null);if(!m){m=MISSOES_INICIAIS;DB.set('missions',m)}return m},
 save:m=>DB.set('missions',m),
 concluir(id){const ms=Missions.all(),m=ms.find(x=>x.id===id);if(!m||m.estado==='concluída')return;
  m.estado='concluída';Missions.save(ms);const cs=Chars.all();cs.forEach(c=>Chars.addXP(c,m.xp));DB.set('chars',cs)}};
