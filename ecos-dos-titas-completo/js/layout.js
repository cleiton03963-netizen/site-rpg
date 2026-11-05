/* ===== Componente de navegação reutilizável =====
   Gera a barra lateral (PC) e o menu hambúrguer (celular).
   Para liberar uma página nova, basta mudar ready:true e definir href. */
const PAGES = [
  {id:'dashboard', icon:'🏰', label:'Painel principal', href:'dashboard.html', ready:true},
  {id:'criar',     icon:'✒️', label:'Criar personagem', href:'criar.html', ready:true},
  {id:'ficha',     icon:'📜', label:'Minha ficha', href:'ficha.html', ready:true},
  {id:'catalogo',  icon:'🛡️', label:'Famílias, classes e Titãs', href:'catalogo.html', ready:true},
  {id:'missoes',   icon:'🗺️', label:'Missões', href:'missoes.html', ready:true},
  {id:'combate',   icon:'🎲', label:'Combate', href:'combate.html', ready:true},
  {id:'mestre',    icon:'👑', label:'Painel do mestre', href:'mestre.html', ready:true},
  {id:'habilidades',icon:'✨', label:'Habilidades (em cartões no catálogo)'},
  {id:'inventario',icon:'🎒', label:'Inventário'},
  {id:'campanhas', icon:'🔥', label:'Campanhas'},
  {id:'config',    icon:'⚙️', label:'Configurações'},
];

function renderLayout(activeId){
  const items = PAGES.filter(p=>p.id!=='mestre'||Auth.isMaster()).map(p => p.ready
    ? `<a href="${p.href}" class="${p.id===activeId?'active':''}">${p.icon} ${p.label}</a>`
    : `<span class="soon" title="Disponível em uma etapa futura">${p.icon} ${p.label}<small>em breve</small></span>`
  ).join('');
  document.getElementById('nav-root').innerHTML = `
    <div class="overlay" id="overlay"></div>
    <nav class="sidebar" id="sidebar">
      <div class="brand">Ecos dos Titãs</div>
      <a href="../index.html">🏠 Início</a>${items}<a href="#" onclick="Auth.logout();return false">🚪 Sair</a>
    </nav>`;
  const sb = document.getElementById('sidebar'), ov = document.getElementById('overlay');
  const toggle = () => { sb.classList.toggle('open'); ov.classList.toggle('open'); };
  document.getElementById('menu-btn').addEventListener('click', toggle);
  ov.addEventListener('click', toggle);
}
