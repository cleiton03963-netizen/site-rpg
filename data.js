/* Dados do jogo: famílias, classes, Titãs */
const ATTRS=['Força','Agilidade','Resistência','Inteligência','Percepção','Determinação'];
const F=(n,r,d,p,b)=>({nome:n,raridade:r,desc:d,passiva:p,bonus:b});
const FAMILIAS=[
F('Adler','Comum','Linhagem de soldados de elite.','Olhar de Águia: +1 em testes de mira',{Percepção:1}),
F('Schneider','Comum','Ferreiros das muralhas.','Lâmina Afiada: +1 de dano com lâminas',{Força:1}),
F('Weber','Comum','Tecelões e mensageiros.','Passo Leve: movimento extra curto',{Agilidade:1}),
F('Fischer','Comum','Pescadores do litoral.','Fôlego Longo: +1 em testes de resistência',{Resistência:1}),
F('Richter','Incomum','Juízes e estrategistas.','Mente Fria: +1 em testes de planejamento',{Inteligência:1}),
F('Hartmann','Incomum','Guardiões de portões.','Muralha Viva: reduz 1 de dano recebido',{Resistência:1}),
F('Vogel','Incomum','Batedores de campo.','Rastro de Pássaro: detecta emboscadas',{Agilidade:1,Percepção:1}),
F('Weiss','Rara','Médicos de linhagem antiga.','Mãos Brancas: cura +2 PV ao tratar',{Inteligência:1,Determinação:1}),
F('Falken','Rara','Caçadores de Titãs.','Presa do Falcão: +2 contra Titãs',{Força:1,Percepção:1}),
F('Eisen','Rara','Mestres do aço.','Pele de Ferro: +2 PV máximos por nível 10',{Resistência:2}),
F('Nacht','Épica','Sombras da Muralha.','Véu Noturno: 1x por combate, esquiva automática',{Agilidade:2,Percepção:1}),
F('Kroner','Épica','Ecos de uma coroa esquecida.','Voz de Comando: aliados ganham +1 no teste',{Determinação:2,Inteligência:1}),
F('Veyron','Lendária','Sangue ligado aos Titãs.','Eco Titânico: +5 ET máximos',{Força:1,Determinação:2}),
F('Eryndor','Mítica','A linhagem original.','Herdeiro Original: recupera 3 ET por turno',{Determinação:2,Força:1,Percepção:1})];
const C=(n,d,p,a,e,x,b)=>({nome:n,desc:d,passiva:p,ativas:a,especial:e,exclusiva:x,bonus:b});
const CLASSES=[
C('Espadachim','Combatente de lâminas.','Golpe Firme: +1 ataque',['Corte Cruzado (2 ET)','Estocada (1 ET)'],'Redemoinho de Aço (5 ET)','Dança das Lâminas',{Força:1,Agilidade:1}),
C('Explorador','Batedor além das muralhas.','Instinto: +1 iniciativa',['Disparo de Sinalização (1 ET)','Salto de Gancho (2 ET)'],'Mapa Vivo (4 ET)','Retorno Seguro',{Agilidade:2}),
C('Estrategista','Mente do esquadrão.','Plano B: relança 1 teste/combate',['Ordem Tática (2 ET)','Flanco (2 ET)'],'Formação Perfeita (5 ET)','Leitura do Campo',{Inteligência:2}),
C('Médico','Cura e sustenta.','Primeiros Socorros: +1 cura',['Curativo (2 ET)','Estimulante (2 ET)'],'Ressurgir (5 ET)','Juramento',{Inteligência:1,Determinação:1}),
C('Engenheiro','Equipamentos e armadilhas.','Improviso: +1 com engenhocas',['Armadilha (2 ET)','Reforço (2 ET)'],'Canhão Portátil (5 ET)','Oficina de Campo',{Inteligência:1,Resistência:1}),
C('Titânico','Canaliza poder titânico.','Sangue Titânico: +3 ET máximos',['Punho Titânico (3 ET)','Rugido (2 ET)'],'Transformação Parcial (6 ET)','Ressonância',{Força:1,Determinação:1})];
const T=(n,r,h,e,c,f,s)=>({nome:n,raridade:r,altura:h,esp:e,custo:c,fraqueza:f,suprema:s});
const TITAS=[
T('Titã Colossal','Lendária','60 m','Destruição em massa',10,'Lento; vapor cega aliados','Onda de Vapor'),
T('Titã Blindado','Épica','15 m','Defesa extrema',7,'Articulações; pouca mobilidade','Carga Blindada'),
T('Titã Bestial','Épica','17 m','Arremesso e comando',6,'Corpo frágil à distância curta','Chuva de Pedras'),
T('Titã Fêmea','Épica','14 m','Agilidade e endurecimento',6,'Foco no ataque; exaustão','Grito de Atração'),
T('Titã de Ataque','Lendária','15 m','Adaptação e determinação',8,'Desgaste cumulativo','Fúria Final'),
T('Titã Mandíbula','Rara','5 m','Velocidade e mordida',4,'Fragilidade; baixa defesa','Mordida Dilacerante'),
T('Titã Carroceiro','Rara','4 m','Resistência e carga',3,'Dano baixo','Marcha Infinita'),
T('Titã Martelo de Guerra','Lendária','15 m','Criação de armas de cristal',9,'Custo alto; cristal quebra','Arsenal de Cristal'),
T('Titã Fundador','Mítica','—','Controle de todos os Titãs',15,'Só funciona com sangue real; uso único por campanha','Comando Absoluto')];
const DIFICULDADES={Fácil:10,Moderado:14,Difícil:17,'Muito difícil':20,Excepcional:25};
const XP_MISSAO={Fácil:50,Intermediária:100,Difícil:200,'Chefe especial':400,'Descoberta importante':150};
const XP_POR_NIVEL=100;
const RARIDADE_NIVEL=n=>n<=10?'Comum':n<=20?'Incomum':n<=30?'Rara':n<=40?'Épica':n<=50?'Lendária':'Mítica';
