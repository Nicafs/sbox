import React, { useState, useEffect } from 'react';

import PessoaApi from 'commons/resources/pessoa';
import Header from 'components/Header';
import { useAppGlobal } from 'providers/AppGlobal';
import pushRota from 'routes/push';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TextsmsIcon from '@material-ui/icons/Textsms';
import DescriptionIcon from '@material-ui/icons/Description';

import { useChatBot } from '../../providers/ChatBot';
import { actionToggleVisibilidadeChatBot } from '../../providers/ChatBot/actions';
import { eventoPwa } from '../AlertaPWA';

export default function HeaderTomador({
  menuSelecionadoIdx,
  pessoa,
  idNegociacaoAtual = '',
  statusNegociacaoAtual = '',
  existeMeusEmprestimos = '',
}) {
  const { dispatch } = useChatBot();
  const { visivel: chatbotVisivel } = useChatBot();
  const [toogleChat, setToogleChat] = useState(chatbotVisivel);
  const {
    tipoFluxo,
    actions: { exibirAlerta },
  } = useAppGlobal();

  const ehFluxoEp = tipoFluxo === 'BANCO_SEMEAR';
  const temBoleto = ehFluxoEp && statusNegociacaoAtual === 'APROVADO';

  const [menuTomador, setMenuTomador] = useState([
    {
      titulo: 'Meus emprestimos',
      onClick: () => pushRota('/meus-emprestimos'),
      iconeComponente: <AttachMoneyIcon />,
    },
    {
      titulo: 'Quero ajuda',
      onClick: () => {
        const action = actionToggleVisibilidadeChatBot(!toogleChat);
        setToogleChat(!toogleChat);
        dispatch(action);
      },
      iconeComponente: <TextsmsIcon />,
    },

    {
      id: 'simulador',
      titulo: 'Simulador',
      onClick: () => pushRota('/solicitarEmprestimo'),
      iconeComponente: <AttachMoneyIcon />,
    },
    ...(temBoleto
      ? [
          {
            titulo: 'Meus boletos',
            onClick: () => pushRota(`/detalhe-emprestimo/${idNegociacaoAtual}`),
            iconeComponente: <DescriptionIcon />,
          },
        ]
      : []),
    ...(eventoPwa
      ? [
          {
            id: 'pwa',
            titulo: 'Adicionar na tela inicial',
            onClick: () => eventoPwa.prompt(),
            iconeComponente: <PhoneIphoneIcon />,
            inserirDivisao: true,
          },
        ]
      : []),
  ]);

  useEffect(() => {
    const triggerRemoverMenuPwaAposInstalacao = () => {
      eventoPwa.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          setMenuTomador(menuTomador.filter(({ id }) => id !== 'pwa'));
          exibirAlerta(
            'Nosso aplicativo está sendo instalado no seu dispositivo, por favor aguarde...',
            'info',
          );
        }
      });
    };

    if (eventoPwa) {
      triggerRemoverMenuPwaAposInstalacao();
    }
  }, [eventoPwa]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const filtraSimulador = async () => {
      try {
        await PessoaApi.getLimiteDeCredito(pessoa.id);
      } catch (e) {
        setMenuTomador(menuTomador.filter(({ id }) => id !== 'simulador'));
      }
    };

    if (!ehFluxoEp) {
      filtraSimulador();
    } else if (existeMeusEmprestimos) {
      setMenuTomador(menuTomador.filter(({ id }) => id !== 'simulador'));
    }
  }, [ehFluxoEp, existeMeusEmprestimos]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const action = actionToggleVisibilidadeChatBot(false);
    dispatch(action);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    pushRota('/logout');
  };

  return (
    <Header
      menuSelecionadoIdx={menuSelecionadoIdx}
      menu={menuTomador}
      pessoa={pessoa}
      logout={logout}
    />
  );
}
