import '../../../__common__mocks__/firebaseStorage';

import React from 'react';
import { shallow } from 'enzyme';
import CardSolicitacaoEmprestimo from '../CardSolicitacaoEmprestimo';
import { useAppGlobal } from '../../../providers/AppGlobal';
import {
  MOCK_CONFIRMAR_EMPRESTIMO_VALIDO,
  MOCK_PENDENCIA_CONFIRMACAO_VALIDO,
  MOCK_REENVIAR_CONTA_VALIDO,
} from '../__mocks__/mock';
import { act } from 'react-dom/test-utils';
import { app } from '@credito-express/ce-components';

// TODO: separar mocks em arquivos

jest.mock('../../../providers/AppGlobal');
jest.mock('@credito-express/ce-components', () => {
  return {
    useCreditoExpress: () => {
      return {
        state: {
          organizacao: { tipoFluxoEcp: 'PORTOCRED' },
          pessoa: { parametrizacaoAtiva: true },
        },
      };
    },
    useFirebase: () => ({ analytics: () => ({ logEvent: () => {} }) }),
  };
});

describe('<CardSolicitacaoEmprestimo />', () => {
  beforeAll(() => {
    console.error = function consoleErrorWithStack(message) {
      const error = { message };
      Error.captureStackTrace(error, consoleErrorWithStack);
      // error.stack will not include consoleErrorWithStack
      console.log(error.stack);
    };
  });

  it('Teste componente <CardSolicitacaoEmprestimo /> com botão de reenviar conta visivel', () => {
    useAppGlobal.mockReturnValue({
      actions: { getIcone: () => {} },
    });

    const abrirModalContaBancariaMock = jest.fn();

    act(() => {
      const wrapper = shallow(
        <CardSolicitacaoEmprestimo
          negociacao={MOCK_REENVIAR_CONTA_VALIDO}
          abrirModalContaBancaria={abrirModalContaBancariaMock}
        />,
      );
      const btnReenviar = wrapper.find('[name="btnReenviarConta"]');
      expect(btnReenviar).toHaveLength(1);
      btnReenviar.simulate('click');
      expect(abrirModalContaBancariaMock.mock.calls.length).toEqual(1);
      expect(btnReenviar.shallow().text()).toBe('Reenviar Conta');
    });
  });

  it('Teste componente <CardSolicitacaoEmprestimo /> com botão de confirmar empréstimo conta visivel', () => {
    useAppGlobal.mockReturnValue({
      actions: { getIcone: () => {} },
    });

    act(() => {
      const wrapper = shallow(
        <CardSolicitacaoEmprestimo
          negociacao={MOCK_CONFIRMAR_EMPRESTIMO_VALIDO}
        />,
      );
      const btnReenviar = wrapper.find('[name="btnAguardandoTomador"]');
      expect(btnReenviar).toHaveLength(1);
      expect(btnReenviar.shallow().text()).toBe('Confirmar empréstimo');
    });
  });

  it('Teste componente <CardSolicitacaoEmprestimo /> com botão de reenviar documentos', () => {
    useAppGlobal.mockReturnValue({
      actions: { getIcone: () => {} },
    });

    act(() => {
      const wrapper = shallow(
        <CardSolicitacaoEmprestimo
          negociacao={MOCK_PENDENCIA_CONFIRMACAO_VALIDO}
        />,
      );
      const btnReenviar = wrapper.find(
        '[name="btnPendenciaConfirmacaoEmprestimo"]',
      );
      expect(btnReenviar).toHaveLength(1);
      expect(btnReenviar.shallow().text()).toBe('Reenviar Documentos');
    });
  });
});
