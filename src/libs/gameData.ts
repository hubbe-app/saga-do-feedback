export const backgrounds = ['/tela_battle_1.jpg', '/tela_battle_2.jpg', '/tela_battle_3.jpg', '/tela_battle_4.jpg'];

export type Option = { dialog: string; adrenaline: number; engagement: number };
export type Turn = {
  employee?: Option[];
  employer?: Option[];
};

export type EmployeeGameType = {
  firstTurn: Turn;
  secondTurn: Turn;
  thirdTurn: Turn;
  fourthTurn: Turn;
  fifthTurn: Turn;
  conclusion: Turn;
};

export type TurnsType = 'firstTurn' | 'secondTurn' | 'thirdTurn' | 'fourthTurn' | 'fifthTurn' | 'conclusion';

export const turns = ['firstTurn', 'secondTurn', 'thirdTurn', 'fourthTurn', 'fifthTurn', 'conclusion'];

export const employeeStartingPhase =
  'Você está começando a jogada como colaborador e tem o objetivo de ser promovido. Escolha a sua opção de como começar a conversa!';

export const employerStartingPhase =
  'Você está começando a jogada como colaborador, e tem o objetivo de ser promovido, escolha sua opção de como começar essa conversa!';

export const employeeGame: EmployeeGameType = {
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
        adrenaline: 7,
        engagement: 0,
      },
      {
        dialog: 'Gestor demite colaborador!',
        adrenaline: 10,
        engagement: 0,
      },
      {
        dialog: 'Gestor promove colaborador!',
        adrenaline: 10,
        engagement: 0,
      },
    ],
  },
};
export const employeeGamebk = {
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
  },
  secondTurn: {
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
  },
  thirdTurn: {
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
  },
  fourthTurn: {
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
  },
  fifthTurn: {
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
    employer: [
      {
        dialog: 'Gestor acompanha desenvolvimento do colaborador!',
        adrenaline: 7,
        engagement: 0,
      },
      {
        dialog: 'Gestor demite colaborador!',
        adrenaline: 10,
        engagement: 0,
      },
      {
        dialog: 'Gestor promove colaborador!',
        adrenaline: 10,
        engagement: 0,
      },
    ],
  },
};
