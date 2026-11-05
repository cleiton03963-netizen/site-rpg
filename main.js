/* Utilidades de página: protege rotas e monta o layout. */
function boot(id,render){
 if(!Auth.user()){location.href='login.html';return}
 renderLayout(id);const app=document.getElementById('app');
 try{render(app)}catch(e){app.innerHTML=`<div class="panel">Erro: ${e}</div>`}}
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const bar=(v,m,cor)=>`<div class="bar"><i style="width:${m?Math.round(100*v/m):0}%;background:${cor}"></i><span>${v}/${m}</span></div>`;
function shell(id,title){document.write(`<div class="layout"><div id="nav-root"></div><main class="content"><div class="topbar"><button id="menu-btn">☰</button><strong>Ecos dos Titãs</strong></div><h2>${title}</h2><div id="app" style="margin-top:1rem"></div></main></div>`)}
