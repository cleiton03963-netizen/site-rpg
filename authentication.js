/* Cadastro/login. Senha guardada como hash SHA-256 com sal (nunca em texto). O 1º cadastro vira Mestre. */
/* Contas de fábrica (só hashes ficam no código). Mesmo em qualquer navegador. */
const SEED_ACCOUNTS=[
 {nome:'AdminMestre',sal:'859d6401-b592-481f-8745-e4c596c21801',hash:'2c51e04fc63ab4e4500d353bc18859ff327e0922070dab83a71555008a9c3ee5',role:'mestre'},
 {nome:'Jogador01',sal:'e1e36a1f-0824-40e2-8bb6-1f76d40a98c7',hash:'acc6b6cfba86e10c5e25f6e65360683ac9ba06bc9bd8dda081b5aba0fae974af',role:'jogador'},
 {nome:'Jogador02',sal:'5c751f56-8ce2-433f-998e-2d06be107f5b',hash:'3c621aac9d7c84ae1c0a2ee76a7f8f50151d6b6c40c15261f877f79d3a411e40',role:'jogador'},
 {nome:'Jogador03',sal:'efeef457-8f5d-4641-b8d1-106b65e4ef5d',hash:'5ccc4b6c91ba428c5e5cb40bde2b4451c38eb777e3cf7d6b26caedcd69afc047',role:'jogador'},
 {nome:'Jogador04',sal:'2f23fea1-1ac3-45e7-8351-ddb1855d517d',hash:'35072ca420c831926490d81b086fdddb254914e8498c0d1070a9ed2e79083327',role:'jogador'},
 {nome:'Jogador05',sal:'bbca6f8e-ebec-447c-95be-14dc8c368df9',hash:'51fafed10eae15ee621fdb766b56b504a862207b6e7e68086a9bf2c4a963d5c3',role:'jogador'},
 {nome:'Jogador06',sal:'587f159d-4ace-4b8a-bb9c-5c2c48870ae3',hash:'c2e6b4667553953a1d4caec101d8753a8ea4052da7978d9aea98bee0321193fc',role:'jogador'},
 {nome:'Jogador07',sal:'d8cdc7df-0a87-428f-ac94-c25f1ca41ca0',hash:'975e985886d1515e3d71d89d3b72aa4a0673431c393297c7fc3fd55c4da95b5e',role:'jogador'},
 {nome:'Jogador08',sal:'a442d1ec-3619-4eb5-ae84-6447602fba9b',hash:'fedf0371e3a71239415c2c8e1980c7232058a5ac9f14d06c06eb89d63a145e7a',role:'jogador'},
 {nome:'Jogador09',sal:'1c2e2a11-9530-4c5f-a46a-9324618f634f',hash:'ca9fd17a28fe08b3209ff50525b260de3d946df90ebd2aae0664aa49632d00fa',role:'jogador'},
 {nome:'Jogador10',sal:'25b1dd05-06b7-4f92-aec3-a1b7825ab88a',hash:'296aec749408344e6e05659427cf30a83b0bf7dc1d904c10a2b70062b3caa3e0',role:'jogador'}];
(function(){const SCHEMA=2; // v2: zera cadastros locais antigos (corrige quem virou mestre sozinho)
 let u=DB.get('users',[]);
 if(DB.get('schema',0)<SCHEMA){u=[];localStorage.removeItem('ecos_session');DB.set('schema',SCHEMA)}
 SEED_ACCOUNTS.forEach(a=>{if(!u.some(x=>x.nome===a.nome))u.push({...a})});
 DB.set('users',u)})();
const ROLES=['mestre','jogador'];
const Auth={
 async hash(p,s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s+p));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')},
 async register(nome,senha){nome=nome.trim();
  if(!/^[\w.-]{3,20}$/.test(nome))throw'Usuário: 3-20 letras/números.';
  if(senha.length<6)throw'Senha com ao menos 6 caracteres.';
  const u=DB.get('users',[]);if(u.some(x=>x.nome.toLowerCase()===nome.toLowerCase()))throw'Usuário já existe.';
  const sal=crypto.randomUUID();u.push({nome,sal,hash:await this.hash(senha,sal),role:'jogador'});DB.set('users',u);return this.login(nome,senha)},
 async login(nome,senha){const u=DB.get('users',[]).find(x=>x.nome.toLowerCase()===nome.trim().toLowerCase());
  if(!u||u.hash!==await this.hash(senha,u.sal))throw'Usuário ou senha inválidos.';
  DB.set('session',{nome:u.nome,role:u.role});return u},
 user:()=>DB.get('session',null),
 setRole(nome,role){if(!this.isMaster()||!ROLES.includes(role))throw'Sem permissão.';const u=DB.get('users',[]);const t=u.find(x=>x.nome===nome);if(!t)throw'Usuário não encontrado.';if(t.role==='mestre'&&role!=='mestre'&&u.filter(x=>x.role==='mestre').length<2)throw'Deve existir ao menos um mestre.';t.role=role;DB.set('users',u);const s=this.user();if(s.nome===nome)DB.set('session',{nome,role})},
 isMaster(){return this.user()?.role==='mestre'},
 logout(){localStorage.removeItem('ecos_session');location.href='login.html'}};
