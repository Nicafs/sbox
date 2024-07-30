import React from 'react';

import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

const ID_TELA_LOGIN = 1;
const ID_TELA_CADASTRO = 2;

const itensMenuCentral = [
  // {
  //   id: 1,
  //   titulo: 'Quero Investir',
  //   rota: '#',
  //   icon: <WorkOutlineOutlinedIcon />,
  //   selecionado: true,
  //   subMenus: [
  //     {
  //       id: 1,
  //       titulo: 'Meus investimentos',
  //       rota: '#',
  //       selecionado: true
  //     },
  //     {
  //       id: 2,
  //       titulo: 'Oportunidades',
  //       rota: '#',
  //       selecionado: false
  //     },
  //     {
  //       id: 3,
  //       titulo: 'Simulador',
  //       rota: '#',
  //       selecionado: false
  //     }
  //   ]
  // },
  {
    id: 2,
    titulo: 'Quero Empréstimo',
    rota: '#',
    icon: <MonetizationOnOutlinedIcon />,
    selecionado: false,
    subMenus: [
      {
        id: 4,
        titulo: 'Meus empréstimos',
        rota: '#',
        selecionado: true,
      },
      {
        id: 5,
        titulo: 'Simulador',
        rota: '#',
        selecionado: false,
      },
    ],
  },
];

export { itensMenuCentral, ID_TELA_CADASTRO, ID_TELA_LOGIN };
