/* Cadastro/login. Senha guardada como hash SHA-256 com sal (nunca em texto). O 1º cadastro vira Mestre. */
const Auth={
 async hash(p,s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s+p));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')},
 async register(nome,senha){nome=nome.trim();
  if(!/^[\w.-]{3,20}$/.test(nome))throw'Usuário: 3-20 letras/números.';
  if(senha.length<6)throw'Senha com ao menos 6 caracteres.';
  const u=DB.get('users',[]);if(u.some(x=>x.nome.toLowerCase()===nome.toLowerCase()))throw'Usuário já existe.';
  const sal=crypto.randomUUID();u.push({nome,sal,hash:await this.hash(senha,sal),role:u.length?'jogador':'mestre'});DB.set('users',u);return this.login(nome,senha)},
 async login(nome,senha){const u=DB.get('users',[]).find(x=>x.nome.toLowerCase()===nome.trim().toLowerCase());
  if(!u||u.hash!==await this.hash(senha,u.sal))throw'Usuário ou senha inválidos.';
  DB.set('session',{nome:u.nome,role:u.role});return u},
 user:()=>DB.get('session',null),
 isMaster(){return this.user()?.role==='mestre'},
 logout(){localStorage.removeItem('ecos_session');location.href='login.html'}};
