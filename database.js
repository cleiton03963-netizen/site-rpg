/* Camada de dados. Hoje usa localStorage (só neste navegador).
   Para jogar entre dispositivos, troque APENAS estas funções por chamadas ao Supabase. */
const DB={get:(k,d)=>{try{return JSON.parse(localStorage.getItem('ecos_'+k))??d}catch{return d}},
          set:(k,v)=>localStorage.setItem('ecos_'+k,JSON.stringify(v))};
