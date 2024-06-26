'use client'

import { GameType, PowerUpType, CharacterType } from '../types/types';

export type TurnsType = 'firstTurn' | 'secondTurn' | 'thirdTurn' | 'fourthTurn' | 'fifthTurn' | 'conclusion';

export const backgrounds = ['/tela_battle_1.jpg', '/tela_battle_2.jpg', '/tela_battle_3.jpg', '/tela_battle_4.jpg'];

export const turns = ['firstTurn', 'secondTurn', 'thirdTurn', 'fourthTurn', 'fifthTurn', 'conclusion'];

export const employeeStartingPhrase =
  'Você está começando a jogada como colaborador e tem o objetivo de ser promovido. Escolha a sua opção de como começar a conversa!';

export const employerStartingPhrase =
  'Você está começando a jogada como gestor, e tem o objetivo proteger a cultura da empresa, escolha sua opção de como começar essa conversa!';

const randomResult = Math.random() * 2 - 1;

export const employeeGame: GameType = {
  firstTurn: {
    employee: [
      {
        dialog: 'Olá! Gostaria de uma promoção.',
        adrenaline: 6 + randomResult,
        engagement: 8 + randomResult,
      },
      {
        dialog: 'Olá! Gostaria de conversar sobre minha carreira.',
        adrenaline: 1 + randomResult,
        engagement: 10 + randomResult,
      },
      {
        dialog: 'Olá! Gostaria de um aumento.',
        adrenaline: 10 + randomResult,
        engagement: 1 + randomResult,
      },
    ],
  },
  secondTurn: {
    employer: [
      {
        dialog: 'O que te motiva a buscar essa promoção?',
        adrenaline: 6,
        engagement: 8,
      },
      {
        dialog: 'Claro, estou disponível! O que gostaria de discutir?',
        adrenaline: 1,
        engagement: 10,
      },
      {
        dialog: 'Por que você acha que merece?',
        adrenaline: 10,
        engagement: 1,
      },
    ],
    employee: [
      {
        dialog: 'Sinto-me autoconfiante e acredito estar pronto para assumir mais responsabilidades.',
        adrenaline: 2 + randomResult,
        engagement: 9 + randomResult,
      },
      {
        dialog: 'Gostaria de saber o que eu preciso fazer para ser promovido, assim como meus colegas.',
        adrenaline: 7 + randomResult,
        engagement: 4 + randomResult,
      },
      {
        dialog: 'Visto a camisa da empresa! Sempre entrego tudo que é solicitado e sou pontual!',
        adrenaline: 9 + randomResult,
        engagement: 2 + randomResult,
      },
    ],
  },
  thirdTurn: {
    employer: [
      {
        dialog: 'O que você acha que seria necessário em termos de desenvolvimento profissional?',
        adrenaline: 6,
        engagement: 4,
      },
      {
        dialog:
          'Entendo, mas para assumir um novo cargo precisamos abordar alguns pontos a serem melhorados. O que sugere?',
        adrenaline: 9,
        engagement: 2,
      },
    ],
    employee: [
      {
        dialog: 'Preciso aprimorar minhas habilidades de liderança e conhecimento para o novo cargo.',
        adrenaline: 2 + randomResult,
        engagement: 8 + randomResult,
      },
      {
        dialog: 'Me diga você, o que acha que posso melhorar?',
        adrenaline: 7 + randomResult,
        engagement: 2 + randomResult,
      },
      {
        dialog: 'Acredito que já faço o suficiente e preciso de mais reconhecimento pelo que faço!',
        adrenaline: 8 + randomResult,
        engagement: 1 + randomResult,
      },
    ],
  },
  fourthTurn: {
    employer: [
      {
        dialog: 'Vamos trabalhar juntos! Que tal definirmos um plano de desenvolvimento para os próximos meses?',
        adrenaline: 7,
        engagement: 3,
      },

      {
        dialog:
          'É importante desenvolver novas habilidades para assumir mais responsabilidades! Que tal definirmos um plano de desenvolvimento?',
        adrenaline: 8,
        engagement: 2,
      },
    ],
    employee: [
      {
        dialog: 'Não acho necessário, gostaria de já saber se serei promovido!',
        adrenaline: 8 + randomResult,
        engagement: 1 + randomResult,
      },
      {
        dialog:
          'Tenho me esforçado o máximo que consigo. Acredito que não consigo me responsabilizar por mais atividades.',
        adrenaline: 6 + randomResult,
        engagement: 2 + randomResult,
      },
      {
        dialog:
          'Claro, gostaria de melhorar minhas habilidades para assumir um cargo de gestão, por onde posso começar?',
        adrenaline: 1 + randomResult,
        engagement: 8 + randomResult,
      },
    ],
  },
  fifthTurn: {
    employer: [
      {
        dialog:
          'Estou aqui para lhe orientar e apoiar na sua evolução, mas sem a sua colaboração não posso ajudá-lo. Gostaria de participar das reuniões de gestão?',
        adrenaline: 10,
        engagement: 1,
      },
      {
        dialog:
          'O que acha de realizar um curso sobre liderança, e participar ativamente de reuniões com a alta gestão?',
        adrenaline: 8,
        engagement: 3,
      },
    ],
    employee: [
      {
        dialog: 'Claro, estou animado para participar. Agradeço pelo seu apoio!',
        adrenaline: 4 + randomResult,
        engagement: 10 + randomResult,
      },
      {
        dialog: 'Vou tentar me organizar para participar, mas não prometo nada.',
        adrenaline: 8 + randomResult,
        engagement: 2 + randomResult,
      },
      {
        dialog: 'Não tenho tempo para outras atividades, vou continuar o meu trabalho.',
        adrenaline: 10 + randomResult,
        engagement: 1 + randomResult,
      },
    ],
  },
  conclusion: {
    employer: [
      {
        dialog: 'Gestor acompanha desenvolvimento do colaborador!',
        adrenaline: 5,
        engagement: 5,
      },
      {
        dialog: 'Gestor demite colaborador!',
        adrenaline: 10,
        engagement: 0,
      },
      {
        dialog: 'Gestor promove colaborador!',
        adrenaline: 0,
        engagement: 10,
      },
    ],
  },
};

export const employerGame: GameType = {
  firstTurn: {
    employer: [
      {
        dialog: 'Bom dia! Vamos iniciar nossa conversa de feedback agendada?',
        adrenaline: 1 + randomResult,
        engagement: 10 + randomResult,
      },
      {
        dialog:
          'Bom dia! Você tem um momento para conversarmos sobre seu desempenho e suas aspirações de carreira na empresa?',
        adrenaline: 6 + randomResult,
        engagement: 8 + randomResult,
      },
      {
        dialog: 'Bom dia! Podemos conversar agora?',
        adrenaline: 10 + randomResult,
        engagement: 1 + randomResult,
      },
    ],
  },
  secondTurn: {
    employee: [
      {
        dialog: 'Claro, já preparei alguns pontos para conversarmos!',
        adrenaline: 1,
        engagement: 10,
      },
      {
        dialog: 'Claro, estou disponível para conversarmos!',
        adrenaline: 6,
        engagement: 8,
      },
      {
        dialog: 'Bom dia! Sim! Não estava esperando por isso nesse momento!',
        adrenaline: 10,
        engagement: 1,
      },
    ],
    employer: [
      {
        dialog:
          'Quero que saiba que aprecio seu trabalho, mas venho notando atrasos em algumas entregas, qual sua perspectiva sobre isso?',
        adrenaline: 2 + randomResult,
        engagement: 9 + randomResult,
      },
      {
        dialog: 'Tenho notado falta de comprometimento e estou preocupado com você. Como podemos resolver?',
        adrenaline: 3 + randomResult,
        engagement: 8 + randomResult,
      },
      {
        dialog:
          'Você tem sido inconsistente em suas tarefas e isso está afetando o trabalho da equipe. Você precisa melhorar!',
        adrenaline: 9 + randomResult,
        engagement: 2 + randomResult,
      },
    ],
  },
  thirdTurn: {
    employee: [
      {
        dialog:
          'Reconheço, estou sobrecarregado com várias responsabilidades ao mesmo tempo, mas estou trabalhando para melhorar.',
        adrenaline: 3,
        engagement: 7,
      },
      {
        dialog:
          'Acredito que precisamos revisar nossos processos para garantir que todos estejam alinhados e possamos melhorar juntos.',
        adrenaline: 7,
        engagement: 4,
      },
    ],
    employer: [
      {
        dialog:
          'Ótimo. Pensei em propor uma ação de desenvolvimento pessoal, e estarei disponível para oferecer suporte e orientação, o que acha?',
        adrenaline: 2 + randomResult,
        engagement: 8 + randomResult,
      },
      {
        dialog: 'Entendo, e que bom está trabalhando para melhorar, mas como posso te ajudar mais sobre isso?',
        adrenaline: 3 + randomResult,
        engagement: 7 + randomResult,
      },
      {
        dialog: 'Entendo, mas você deve se organizar mais para priorizar as tarefas e evitar isso no futuro.',
        adrenaline: 8 + randomResult,
        engagement: 2 + randomResult,
      },
    ],
  },
  fourthTurn: {
    employee: [
      {
        dialog:
          'Acredito que poderia passar o processo X para a nova colega, isso me ajudaria a focar nas principais tarefas. O que acha?',
        adrenaline: 7,
        engagement: 7,
      },
    ],
    employer: [
      {
        dialog:
          'Excelente sugestão. Acredito que uma abordagem colaborativa será fundamental para superarmos esse desafio.',
        adrenaline: 2 + randomResult,
        engagement: 8 + randomResult,
      },
      {
        dialog:
          'Acho que não é uma boa ideia agora! Leia o livro "A arte de fazer o dobro do trabalho na metade do tempo", pode te ajudar.',
        adrenaline: 8 + randomResult,
        engagement: 2 + randomResult,
      },
      {
        dialog:
          'Como preferir, mas espero ver melhorias significativas em breve. Vou continuar monitorando seu desempenho.',
        adrenaline: 6 + randomResult,
        engagement: 4 + randomResult,
      },
    ],
  },
  fifthTurn: {
    employee: [
      {
        dialog: 'Ok, obrigado, mas gostaria que você pudesse me orientar melhor nesse processo.',
        adrenaline: 5,
        engagement: 5,
      },
      {
        dialog: 'Claro, deixe comigo! Você me acompanha nesse processo?',
        adrenaline: 2,
        engagement: 8,
      },
    ],
    employer: [
      {
        dialog: 'Sim, vamos evoluir juntos!',
        adrenaline: 4 + randomResult,
        engagement: 10 + randomResult,
      },
      {
        dialog: 'Tenho muitas responsabilidades, infelizmente no momento não posso fazer mais por você.',
        adrenaline: 8 + randomResult,
        engagement: 6 + randomResult,
      },
      {
        dialog: 'Não tenho tempo para isso.',
        adrenaline: 10 + randomResult,
        engagement: 1 + randomResult,
      },
    ],
  },
  conclusion: {
    employee: [
      {
        dialog: 'Colaborador elaborou um novo processo para otimização de tempo dos projetos!',
        adrenaline: 0,
        engagement: 10,
      },
      {
        dialog: 'Colaborador pede troca de setor de trabalho!',
        adrenaline: 5,
        engagement: 5,
      },
      {
        dialog: 'Colaborador pede demissão!',
        adrenaline: 10,
        engagement: 0,
      },
    ],
  },
};

export const employeeConclusionMsg = {
  goodResult: {
    mainMessage: 'Parabéns! Sua dedicação e competência resultaram em uma merecida promoção.',
    message:
      'Com base em suas respostas, fica evidente seu comprometimento com a eficiência e a colaboração. Sua abordagem proativa para resolver desafios, junto com a valorização do equilíbrio entre vida profissional e pessoal, é notável. Além disso, sua atitude positiva em relação ao aprendizado contínuo e a capacidade de lidar construtivamente com o feedback destacam seu profissionalismo exemplar. Essas qualidades contribuem significativamente para um ambiente de trabalho produtivo.',
  },
  neutralResult: {
    mainMessage: 'Avaliar alguns pontos, como sua iniciativa na gestão do tempo, priorização de tarefas e protagonismo na carreira, será importante para seu progresso e uma possível promoção.',
    message:
      'Analisando suas respostas, identificamos uma oportunidade para fortalecer o protagonismo na sua carreira. Sugerimos uma abordagem mais ativa na gestão do tempo, utilizando métodos eficazes e aprimorando a priorização de tarefas para atingir prazos com mais consistência. Além disso, desenvolver habilidades para expressar preocupações ou insatisfações de maneira mais aberta pode contribuir para um ambiente de trabalho mais colaborativo e resolutivo. Estamos confiantes de que, com ajustes nessas áreas, você poderá maximizar seu potencial e impacto positivo na equipe.',
  },
  badResult: {
    mainMessage: 'Sua abordagem reativa diante dos desafios e a falta de desenvolvimento de competências têm sido limitantes em sua busca por progresso na carreira.',
    message:
      'Analisando suas respostas, identificamos uma oportunidade para fortalecer o protagonismo na sua carreira. Sugerimos uma abordagem mais ativa na gestão do tempo, utilizando métodos eficazes e aprimorando a priorização de tarefas para atingir prazos com mais consistência. Além disso, desenvolver habilidades para expressar preocupações ou insatisfações de maneira mais aberta pode contribuir para um ambiente de trabalho mais colaborativo e resolutivo. Estamos confiantes de que, com ajustes nessas áreas, você poderá maximizar seu potencial e impacto positivo na equipe.',
  },
};

export const employerConclusionMsg = {
  goodResult: {
    mainMessage: 'Parabéns! Sua liderança demonstra uma abordagem flexível somada à habilidade em equilibrar pressão por resultados e bem-estar da equipe, um compromisso sólido com os valores pessoais e organizacionais.',
    message:
      'Suas respostas refletem uma liderança inspiradora e eficaz. Sua abordagem aberta a novas ideias e estímulo à criatividade destacam-se positivamente. Além disso, reconhecer constantemente o bom trabalho da equipe e promover um ambiente de aprendizado contínuo demonstram seu compromisso com o desenvolvimento profissional. Sua habilidade em equilibrar pressão por resultados e bem-estar da equipe é uma qualidade valiosa. Sua liderança é um exemplo inspirador para a equipe.',
  },
  neutralResult: {
    mainMessage: 'Adotar uma postura mais flexível e encorajar a criatividade da equipe pode fortalecer sua liderança!',
    message:
      'Analisando suas respostas, notamos uma tendência a manter uma abordagem tradicional em várias situações. Para otimizar a liderança, sugerimos maior flexibilidade para abraçar ideias inovadoras e encorajar a criatividade da equipe. Além disso, ao lidar com desafios, buscar soluções práticas pode melhorar a eficácia em alcançar metas. Essas adaptações contribuiriam para uma liderança mais dinâmica e eficiente.',
  },
  badResult: {
    mainMessage: 'Sua liderança parece estar desconectada dos valores pessoais e organizacionais, o que pode afetar negativamente o ambiente de trabalho e a eficácia da equipe.',
    message:
      'Analisando suas respostas, notamos uma tendência a manter uma abordagem tradicional em várias situações. Para otimizar a liderança, sugerimos maior flexibilidade para abraçar ideias inovadoras e encorajar a criatividade da equipe. Além disso, ao lidar com desafios, buscar soluções práticas pode melhorar a eficácia em alcançar metas. Essas adaptações contribuiriam para uma liderança mais dinâmica e eficiente.',
  },
};

export const powerUps: PowerUpType[] = [
  {
    img: '/powerUps/p1.png',
    adrenaline: 1,
    engagement: 7,
  },
  {
    img: '/powerUps/p2.png',
    adrenaline: 5,
    engagement: 7,
  },
  {
    img: '/powerUps/p3.png',
    adrenaline: 8,
    engagement: 8,
  },
];

export const employeeCharacters: CharacterType[] = [
  {
    avatar: '/selection-screen/ca1.png',
    fullBody: '/battle/c1joao_pedro.png',
    fullBodyOn: '/battle/c1joao_pedro_on.png',
    name: 'João Pedro',
    description: 'Analista de Manutenção',
    preview: '/battle-preview/c1_preview.png',
  },
  {
    avatar: '/selection-screen/ca2.png',
    fullBody: '/battle/c2leticia.png',
    fullBodyOn: '/battle/c2leticia_on.png',
    name: 'Letícia',
    description: 'Operadora de Máquina',
    preview: '/battle-preview/c2_preview.png',
  },
  {
    avatar: '/selection-screen/ca3.png',
    fullBody: '/battle/c3paula.png',
    fullBodyOn: '/battle/c3paula_on.png',
    name: 'Paula',
    description: 'Analista de Marketing',
    preview: '/battle-preview/c3_preview.png',
  },
  {
    avatar: '/selection-screen/ca4.png',
    fullBody: '/battle/c4vinicius.png',
    fullBodyOn: '/battle/c4vinicius_on.png',
    name: 'Vinícius',
    description: 'Analista de P&D',
    preview: '/battle-preview/c4_preview.png',
  },
];
export const employerCharacters: CharacterType[] = [
  {
    avatar: '/selection-screen/ga1.png',
    fullBody: '/battle/g1marcia.png',
    fullBodyOn: '/battle/g1marcia_on.png',
    name: 'Márcia',
    description: 'Líder de Equipe',
    preview: '/battle-preview/g1_preview.png',
  },
  {
    avatar: '/selection-screen/ga2.png',
    fullBody: '/battle/g2ana.png',
    fullBodyOn: '/battle/g2ana_on.png',
    name: 'Ana',
    description: 'Gestora de RH',
    preview: '/battle-preview/g2_preview.png',
  },
  {
    avatar: '/selection-screen/ga3.png',
    fullBody: '/battle/g3marcelo.png',
    fullBodyOn: '/battle/g3marcelo_on.png',
    name: 'Marcelo',
    description: 'Coordenador Financeiro',
    preview: '/battle-preview/g3_preview.png',
  },
  {
    avatar: '/selection-screen/ga4.png',
    fullBody: '/battle/g4rafael.png',
    fullBodyOn: '/battle/g4rafael_on.png',
    name: 'Rafael',
    description: 'Diretor Industrial',
    preview: '/battle-preview/g4_preview.png',
  },
];
