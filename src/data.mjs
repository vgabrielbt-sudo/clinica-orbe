// Todos os dados demonstrativos ficam aqui. Substitua antes de publicar para uma clínica real.
export const SITE = {
  name: 'Clínica Orbe',
  short: 'Orbe',
  url: 'https://clinica-orbe.vercel.app', // troque pelo domínio final
  demo: true, // true = noindex e avisos de conteúdo demonstrativo
  phoneDisplay: '(00) 00000-0000', // demonstrativo
  whatsapp: '5500000000000', // demonstrativo: DDI + DDD + número, só dígitos
  email: 'contato@clinicaorbe.example',
  address: ['Rua das Palmeiras, 000', 'Bairro Centro · Cidade, UF', '00000-000'],
  hours: [
    ['Segunda a sexta', '8h às 19h'],
    ['Sábado', '8h às 12h'],
  ],
  instagram: '@clinicaorbe',
  description:
    'Clínica odontológica com atendimento sem pressa: ortodontia, implantodontia, estética, clareamento, endodontia e clínica geral. Projeto demonstrativo da VT Sites.',
};

export const NAV = [
  { href: 'a-clinica/', label: 'A clínica' },
  { href: 'especialidades/', label: 'Especialidades' },
  { href: 'equipe/', label: 'Equipe' },
  { href: 'contato/', label: 'Contato' },
];

// key -> arquivo base, largura cheia, altura cheia, alt
export const IMG = {
  hero: { w: 1200, h: 1500, alt: 'Ilustração de um arco de luz sobre parede de reboco, com planta e uma esfera de madeira no piso de travertino' },
  recepcao: { w: 1600, h: 1000, alt: 'Ilustração da recepção: painel de madeira ripada, balcão claro e luminárias redondas' },
  consultorio: { w: 1600, h: 1100, alt: 'Ilustração de um consultório com três janelas em arco e luz natural' },
  espera: { w: 1600, h: 1000, alt: 'Ilustração da sala de espera com parede verde-oliva, sofá areia e uma lua de luz' },
  materiais: { w: 1200, h: 1200, alt: 'Amostras de materiais: travertino, madeira ripada, reboco verde-oliva e grafite' },
  corredor: { w: 1400, h: 1800, alt: 'Ilustração de arcos sucessivos em um corredor, do mais escuro ao mais claro' },
  detalhe: { w: 1200, h: 1500, alt: 'Ilustração de uma parede curva de reboco com sombra e um círculo de luz' },
  entrada: { w: 1600, h: 1000, alt: 'Ilustração da fachada em grafite com porta em arco iluminada e degraus de pedra' },
  'equipe-helena': { w: 900, h: 1100, alt: 'Retrato ilustrado demonstrativo de Helena Albuquerque' },
  'equipe-tomas': { w: 900, h: 1100, alt: 'Retrato ilustrado demonstrativo de Tomás Verardi' },
  'equipe-marina': { w: 900, h: 1100, alt: 'Retrato ilustrado demonstrativo de Marina Coutinho' },
  'equipe-caio': { w: 900, h: 1100, alt: 'Retrato ilustrado demonstrativo de Caio Lacerda' },
  'equipe-livia': { w: 900, h: 1100, alt: 'Retrato ilustrado demonstrativo de Lívia Santoro' },
  ortodontia: { w: 1400, h: 1000, alt: 'Esferas em arco, de tamanhos graduais, alinhadas sobre uma linha curva' },
  implantodontia: { w: 1400, h: 1000, alt: 'Coluna com rosca dentro de um nicho em arco grafite' },
  estetica: { w: 1400, h: 1000, alt: 'Três arcos translúcidos sobrepostos em verde, marrom e areia' },
  clareamento: { w: 1400, h: 1000, alt: 'Círculo de luz clara nascendo sobre um horizonte de areia' },
  endodontia: { w: 1400, h: 1000, alt: 'Fresta estreita de luz dourada atravessando uma parede grafite' },
  'clinica-geral': { w: 1400, h: 1000, alt: 'Grade de módulos em tons de areia e oliva com uma janela acesa' },
};

export const TEAM = [
  { id: 'helena', name: 'Dra. Helena Albuquerque', role: 'Direção clínica e clínica geral', img: 'equipe-helena',
    bio: 'Conduz as avaliações iniciais e organiza o plano de cuidado de cada paciente, chamando as outras especialidades quando fazem sentido. Gosta de explicar o que vê na boca antes de propor qualquer coisa.' },
  { id: 'tomas', name: 'Dr. Tomás Verardi', role: 'Implantodontia', img: 'equipe-tomas',
    bio: 'Atua em reabilitações com implantes e acompanha o caso desde o planejamento até a manutenção. Prefere conversas longas no começo para que não haja surpresas depois.' },
  { id: 'marina', name: 'Dra. Marina Coutinho', role: 'Ortodontia', img: 'equipe-marina',
    bio: 'Trabalha com aparelhos fixos e alinhadores, ajustando o tratamento à rotina de cada pessoa. Costuma mostrar o planejamento em tela e revisar as etapas junto com o paciente.' },
  { id: 'caio', name: 'Dr. Caio Lacerda', role: 'Endodontia', img: 'equipe-caio',
    bio: 'Cuida de tratamentos de canal e de dores que pedem atenção rápida. Explica cada fase do procedimento e o que esperar nos dias seguintes.' },
  { id: 'livia', name: 'Dra. Lívia Santoro', role: 'Estética dental e clareamento', img: 'equipe-livia',
    bio: 'Planeja intervenções estéticas discretas, respeitando o formato e a cor naturais de cada sorriso. Gosta de alinhar expectativas antes de começar.' },
];

export const SPECIALTIES = [
  {
    slug: 'ortodontia', name: 'Ortodontia', img: 'ortodontia', num: '01',
    short: 'Alinhamento e mordida, com aparelho fixo ou alinhadores.',
    lead: 'A ortodontia cuida de como os dentes se posicionam e de como a boca fecha. O objetivo vai além da estética: uma mordida equilibrada facilita mastigar e limpar.',
    body: [
      'O tratamento começa com uma avaliação da posição dos dentes, da mordida e da saúde das gengivas. A partir disso, o profissional discute as alternativas possíveis, como aparelho fixo metálico, estético ou alinhadores removíveis, e explica as vantagens e limites de cada uma.',
      'A duração e o resultado dependem de cada caso, da colaboração do paciente e da resposta do organismo. Por isso, nenhuma promessa é feita antes da avaliação e dos exames necessários.',
    ],
    when: ['Dentes apinhados, separados ou sobrepostos', 'Mordida que não fecha bem ou desgasta os dentes de forma desigual', 'Vontade de reorganizar o sorriso antes de outros tratamentos'],
    steps: [['Avaliação', 'Conversa, exame clínico e solicitação de exames de imagem quando necessário.'], ['Planejamento', 'Alternativas explicadas com calma, com estimativa de tempo e de manutenção.'], ['Instalação', 'Colocação do aparelho ou entrega dos alinhadores, com orientações de higiene.'], ['Acompanhamento', 'Consultas periódicas para ajustes e revisão do plano.']],
    ask: ['Quais opções existem para o meu caso e o que muda entre elas?', 'Como fica a higiene durante o tratamento?', 'O que acontece depois que o aparelho sair?'],
    faq: [['Existe idade para começar?', 'A avaliação pode ser feita em várias fases da vida. A indicação depende do exame clínico, e não apenas da idade.'], ['Alinhadores servem para todos os casos?', 'Nem sempre. O profissional avalia se o seu caso se adapta a esse tipo de tratamento ou se outra solução é mais adequada.']],
  },
  {
    slug: 'implantodontia', name: 'Implantodontia', img: 'implantodontia', num: '02',
    short: 'Reposição de dentes ausentes com implantes e planejamento detalhado.',
    lead: 'Implantes são pinos que substituem a raiz de um dente perdido e sustentam uma prótese. É um procedimento que pede planejamento, exames e acompanhamento a longo prazo.',
    body: [
      'Antes de qualquer cirurgia, o profissional avalia a saúde geral, a qualidade do osso e das gengivas e a posição dos dentes vizinhos. Exames de imagem ajudam a desenhar o caminho do tratamento.',
      'Nem toda pessoa tem indicação imediata. Em alguns casos é preciso tratar outras condições antes, ou considerar alternativas como próteses fixas ou removíveis. Essa conversa acontece sem pressa e sem promessas de resultado.',
    ],
    when: ['Perda de um ou mais dentes', 'Dificuldade de adaptação com próteses removíveis', 'Necessidade de reabilitar a mastigação de forma fixa'],
    steps: [['Avaliação', 'Histórico de saúde, exame clínico e exames de imagem.'], ['Planejamento', 'Definição do número de implantes, da prótese e das etapas, com custos explicados.'], ['Cirurgia', 'Procedimento realizado com anestesia local e orientações detalhadas de pós-operatório.'], ['Manutenção', 'Retornos periódicos para limpeza e controle, essenciais para a duração do tratamento.']],
    ask: ['O meu caso tem indicação para implante ou existem alternativas?', 'Quanto tempo costuma levar cada etapa?', 'Que cuidados preciso ter depois?'],
    faq: [['Dói?', 'O procedimento é feito com anestesia. No pós-operatório pode haver desconforto, que o profissional orienta a controlar.'], ['Quanto tempo dura?', 'Depende da saúde geral, da higiene e das revisões regulares. Não há prazo garantido.']],
  },
  {
    slug: 'estetica-dental', name: 'Estética dental', img: 'estetica', num: '03',
    short: 'Formato, proporção e cor com intervenções discretas.',
    lead: 'A estética dental trabalha formato, tamanho, proporção e cor dos dentes. A ideia é que o resultado pareça natural no seu rosto, sem exageros.',
    body: [
      'Dependendo do caso, podem ser indicadas restaurações em resina, facetas ou ajustes na gengiva. Cada alternativa tem vantagens, limitações e necessidades de manutenção, que são explicadas antes de qualquer decisão.',
      'Antes de começar, é comum alinhar expectativas com fotos, modelos e conversa. A saúde dos dentes e das gengivas vem primeiro, e a estética é planejada em cima dela.',
    ],
    when: ['Dentes lascados, desgastados ou com formatos irregulares', 'Incômodo com o tamanho ou a proporção dos dentes', 'Restaurações antigas que mudaram de cor'],
    steps: [['Conversa', 'Entendimento do que incomoda e do que você espera do resultado.'], ['Avaliação', 'Exame da saúde bucal e análise de proporções e cor.'], ['Planejamento', 'Apresentação das opções com seus prós e contras.'], ['Execução e revisão', 'Procedimento em uma ou mais consultas, com revisão posterior.']],
    ask: ['Qual opção é mais conservadora para o meu caso?', 'Que manutenção cada alternativa pede?', 'Como o resultado pode ser previsto antes de começar?'],
    faq: [['Faceta é para todo mundo?', 'Não. A indicação depende do estado dos dentes e dos seus objetivos; há alternativas menos invasivas.'], ['Posso ver como ficaria antes?', 'Em muitos casos há recursos de planejamento para visualizar uma simulação, que serve apenas como referência.']],
  },
  {
    slug: 'clareamento', name: 'Clareamento', img: 'clareamento', num: '04',
    short: 'Clareamento supervisionado, após avaliação da saúde dos dentes.',
    lead: 'O clareamento deixa os dentes mais claros, mas só deve ser feito depois de uma avaliação. Cáries, restaurações e sensibilidade precisam ser resolvidas antes.',
    body: [
      'Existem técnicas de consultório e de uso caseiro supervisionado. O profissional indica a mais adequada ao seu caso e acompanha o processo, porque o uso sem orientação pode causar sensibilidade e irritações.',
      'O grau de clareamento varia entre pessoas e nem todos os materiais respondem da mesma forma, como restaurações e próteses, que não mudam de cor. Isso é conversado antes do início.',
    ],
    when: ['Dentes que escureceram com o tempo ou por hábitos como café e tabaco', 'Interesse em um tom mais claro de forma conservadora', 'Preparação antes de outros procedimentos estéticos'],
    steps: [['Avaliação', 'Exame para identificar cáries, sensibilidade e restaurações.'], ['Escolha da técnica', 'Consultório ou caseiro supervisionado, de acordo com o seu caso.'], ['Aplicação', 'Sessões ou uso orientado de moldeiras, com acompanhamento.'], ['Manutenção', 'Orientações sobre alimentação e retornos.']],
    ask: ['O clareamento é indicado para mim agora?', 'Como lidar com a sensibilidade?', 'Minhas restaurações vão mudar de cor?'],
    faq: [['Clareamento caseiro de farmácia é seguro?', 'Sem avaliação, os riscos são maiores. O ideal é que o profissional indique o produto e a forma de uso.'], ['Quanto tempo dura o resultado?', 'Varia conforme hábitos e cuidados de cada pessoa, e não há prazo garantido.']],
  },
  {
    slug: 'endodontia', name: 'Endodontia', img: 'endodontia', num: '05',
    short: 'Tratamento de canal e atendimento de dor com explicação passo a passo.',
    lead: 'A endodontia trata o interior do dente, onde ficam os nervos e vasos. O tratamento de canal busca eliminar infecções e preservar o dente sempre que possível.',
    body: [
      'Dor intensa, sensibilidade prolongada ao quente ou ao frio e inchaço próximo ao dente são sinais que merecem avaliação. O diagnóstico depende de exame clínico e de radiografias.',
      'O procedimento é feito com anestesia, geralmente em uma ou mais consultas. O profissional explica cada fase e o que esperar nos dias seguintes, incluindo o acompanhamento e a restauração final do dente.',
    ],
    when: ['Dor espontânea ou que acorda durante a noite', 'Dente escurecido após trauma', 'Retratamento de canal com sintomas'],
    steps: [['Atendimento inicial', 'Escuta da queixa, exame clínico e radiografias.'], ['Diagnóstico', 'Explicação do que foi encontrado e das alternativas.'], ['Tratamento', 'Limpeza e selamento dos canais, com anestesia e orientação.'], ['Restauração e controle', 'Reconstrução do dente e consultas de acompanhamento.']],
    ask: ['O dente tem possibilidade de ser preservado?', 'Em quantas consultas o tratamento costuma ser feito?', 'O que fazer se a dor voltar?'],
    faq: [['Canal dói?', 'O procedimento é feito sob anestesia. Pode haver desconforto depois, que o profissional orienta a manejar.'], ['Preciso de coroa depois?', 'Depende da estrutura que restou do dente. A avaliação define a melhor restauração.']],
  },
  {
    slug: 'clinica-geral', name: 'Clínica geral', img: 'clinica-geral', num: '06',
    short: 'Prevenção, restaurações e o plano que conecta as demais especialidades.',
    lead: 'A clínica geral é a porta de entrada. É onde acontecem a primeira avaliação, a prevenção, as restaurações e a coordenação entre as especialidades.',
    body: [
      'Consultas regulares permitem encontrar problemas cedo, quando o tratamento costuma ser mais simples. Limpeza, controle de cáries e de doenças da gengiva fazem parte da rotina.',
      'Quando uma situação pede um especialista, a indicação vem acompanhada da explicação do motivo, e o plano continua sendo conduzido de forma integrada.',
    ],
    when: ['Primeira consulta ou retorno depois de muito tempo', 'Revisão e limpeza periódicas', 'Cáries, restaurações e dores que ainda não têm diagnóstico'],
    steps: [['Acolhimento', 'Conversa sobre histórico, queixas e hábitos.'], ['Exame', 'Avaliação de dentes, gengivas e mordida.'], ['Plano de cuidado', 'Prioridades definidas com você, em ordem e com custos explicados.'], ['Retornos', 'Revisões em intervalos definidos pela sua necessidade.']],
    ask: ['O que precisa ser tratado primeiro?', 'De quanto em quanto tempo devo voltar?', 'Há algo que eu possa fazer em casa para melhorar a prevenção?'],
    faq: [['De quanto em quanto tempo devo ir ao dentista?', 'O intervalo depende de cada pessoa. O profissional define a frequência ideal depois da avaliação.'], ['Posso ir só para limpeza?', 'Sim. A avaliação acompanha a limpeza, para verificar se há algo que precise de atenção.']],
  },
];

export const PRINCIPLES = [
  ['Tempo de consulta', 'Cada horário é pensado para conversar e examinar sem correria. Ninguém sai sem entender o que foi visto e o que vem a seguir.'],
  ['Plano antes de procedimento', 'Antes de qualquer intervenção, o plano é explicado: opções, custos, prazos estimados e manutenção.'],
  ['Menos é mais', 'Quando uma alternativa conservadora resolve, ela vem primeiro. Intervenções maiores entram quando fazem sentido clínico.'],
  ['Espaço que acalma', 'Materiais naturais, luz suave e pouco ruído visual. A arquitetura faz parte do cuidado.'],
];

export const AMBIENTES = [
  { id: 'recepcao', name: 'Recepção', img: 'recepcao', text: 'Madeira ripada, balcão baixo e luz quente. A recepção funciona como uma sala de entrada, sem fila e sem barulho de impressoras.' },
  { id: 'espera', name: 'Sala de espera', img: 'espera', text: 'Um canto verde-oliva com assentos baixos e uma luminária redonda. Pensada para esperar com calma e, quando possível, nem esperar.' },
  { id: 'consultorio', name: 'Consultório', img: 'consultorio', text: 'Janelas em arco trazem luz natural para dentro. Equipamentos ficam recolhidos para que a sala não pareça um laboratório.' },
];

export const HOME_FAQ = [];
export const GENERAL_FAQ = [
  ['Como funciona a primeira consulta?', 'É uma avaliação com conversa, exame clínico e, se necessário, pedido de exames. Você sai com uma explicação do que foi encontrado e das opções.'],
  ['A clínica atende convênios?', 'Esta informação é demonstrativa e deve ser definida pela clínica real. Substitua este texto antes de publicar.'],
  ['Posso agendar pelo site?', 'O formulário prepara uma mensagem para a clínica via WhatsApp. O horário só é confirmado depois que a equipe responder.'],
  ['E se eu tiver dor?', 'Conte na mensagem que há dor ou urgência. A equipe organiza o atendimento conforme a disponibilidade.'],
];
