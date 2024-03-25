export const backgrounds = ['/tela_battle_1.jpg', '/tela_battle_2.jpg', '/tela_battle_3.jpg', '/tela_battle_4.jpg'];

export type Option = { dialog: string; adrenaline: number; engagement: number };
export type Turn = {
  employee?: Option[];
  employer?: Option[];
};

export type GameType = {
  firstTurn: Turn;
  secondTurn: Turn;
  thirdTurn: Turn;
  fourthTurn: Turn;
  fifthTurn: Turn;
  conclusion: Turn;
};

export type TurnsType = 'firstTurn' | 'secondTurn' | 'thirdTurn' | 'fourthTurn' | 'fifthTurn' | 'conclusion';

export const turns = ['firstTurn', 'secondTurn', 'thirdTurn', 'fourthTurn', 'fifthTurn', 'conclusion'];

export const employeeStartingPhrase =
  'Você está começando a jogada como colaborador e tem o objetivo de ser promovido. Escolha a sua opção de como começar a conversa!';

export const employerStartingPhrase =
  'Você está começando a jogada como gestor, e tem o objetivo proteger a cultura da empresa, escolha sua opção de como começar essa conversa!';

export const employeeGame: GameType = {
  firstTurn: {
    employee: [
      {
        dialog: 'Olá! Gostaria de uma promoção.',
        adrenaline: 6,
        engagement: 8,
      },
      {
        dialog: 'Olá! Gostaria de conversar sobre minha carreira.',
        adrenaline: 1,
        engagement: 10,
      },
      {
        dialog: 'Olá! Gostaria de um aumento.',
        adrenaline: 10,
        engagement: 1,
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
        adrenaline: 2,
        engagement: 9,
      },
      {
        dialog: 'Gostaria de saber o que eu preciso fazer para ser promovido, assim como meus colegas.',
        adrenaline: 7,
        engagement: 4,
      },
      {
        dialog: 'Visto a camisa da empresa! Sempre entrego tudo que é solicitado e sou pontual!',
        adrenaline: 9,
        engagement: 2,
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
        adrenaline: 2,
        engagement: 8,
      },
      {
        dialog: 'Me diga você, o que acha que posso melhorar?',
        adrenaline: 7,
        engagement: 2,
      },
      {
        dialog: 'Acredito que já faço o suficiente e preciso de mais reconhecimento pelo que faço!',
        adrenaline: 8,
        engagement: 1,
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
        adrenaline: 8,
        engagement: 1,
      },
      {
        dialog:
          'Tenho me esforçado o máximo que consigo. Acredito que não consigo me responsabilizar por mais atividades.',
        adrenaline: 6,
        engagement: 2,
      },
      {
        dialog:
          'Claro, gostaria de melhorar minhas habilidades para assumir um cargo de gestão, por onde posso começar?',
        adrenaline: 1,
        engagement: 8,
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
        adrenaline: 4,
        engagement: 10,
      },
      {
        dialog: 'Vou tentar me organizar para participar, mas não prometo nada.',
        adrenaline: 8,
        engagement: 2,
      },
      {
        dialog: 'Não tenho tempo para outras atividades, vou continuar o meu trabalho.',
        adrenaline: 10,
        engagement: 1,
      },
    ],
  },
  conclusion: {
    employer: [
      {
        dialog: 'Gestor acompanha desenvolvimento do colaborador!',
        adrenaline: 5,
        engagement: 0,
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
        adrenaline: 1,
        engagement: 10,
      },
      {
        dialog:
          'Bom dia! Você tem um momento para conversarmos sobre seu desempenho e suas aspirações de carreira na empresa?',
        adrenaline: 6,
        engagement: 8,
      },
      {
        dialog: 'Bom dia! Podemos conversar agora?',
        adrenaline: 10,
        engagement: 1,
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
        adrenaline: 2,
        engagement: 9,
      },
      {
        dialog: 'Tenho notado falta de comprometimento e estou preocupado com você. Como podemos resolver?',
        adrenaline: 3,
        engagement: 8,
      },
      {
        dialog:
          'Você tem sido inconsistente em suas tarefas e isso está afetando o trabalho da equipe. Você precisa melhorar!',
        adrenaline: 9,
        engagement: 2,
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
        adrenaline: 2,
        engagement: 8,
      },
      {
        dialog: 'Entendo, e que bom está trabalhando para melhorar, mas como posso te ajudar mais sobre isso?',
        adrenaline: 3,
        engagement: 7,
      },
      {
        dialog: 'Entendo, mas você deve se organizar mais para priorizar as tarefas e evitar isso no futuro.',
        adrenaline: 8,
        engagement: 2,
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
        adrenaline: 2,
        engagement: 8,
      },
      {
        dialog:
          'Acho que não é uma boa ideia agora! Leia o livro "A arte de fazer o dobro do trabalho na metade do tempo", pode te ajudar.',
        adrenaline: 8,
        engagement: 2,
      },
      {
        dialog:
          'Como preferir, mas espero ver melhorias significativas em breve. Vou continuar monitorando seu desempenho.',
        adrenaline: 6,
        engagement: 4,
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
        adrenaline: 4,
        engagement: 10,
      },
      {
        dialog: 'Tenho muitas responsabilidades, infelizmente no momento não posso fazer mais por você.',
        adrenaline: 8,
        engagement: 6,
      },
      {
        dialog: 'Não tenho tempo para isso.',
        adrenaline: 10,
        engagement: 1,
      },
    ],
  },
  conclusion: {
    employee: [
      {
        dialog: 'Colaborador elaborou um novo processo para otimização de tempo dos projetos!',
        adrenaline: 3,
        engagement: 7,
      },
      {
        dialog: 'Colaborador pede troca de setor de trabalho!',
        adrenaline: 8,
        engagement: 4,
      },
      {
        dialog: 'Colaborador pede demissão!',
        adrenaline: 10,
        engagement: 5,
      },
    ],
  },
};
