import '../../../__common__mocks__/firebaseStorage';

import React from 'react';
import { useAppGlobal } from 'providers/AppGlobal';
import BancoApi from 'commons/resources/banco';
import { mount } from 'enzyme';
import ModalContaBancaria from '../index';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { act } from 'react-dom/test-utils';

jest.mock('providers/AppGlobal');

const MUI_TEMA_PADRAO = createMuiTheme();

describe('<ModalContaBancaria />', () => {
  it('Teste componente <ModalContaBancaria /> com formulário válido', async () => {
    useAppGlobal.mockReturnValue({
      actions: { getIcone: () => {} },
    });
    BancoApi.listBancos = () => {
      return [{ id: '123', logo: null, nome: 'Banco', codigo: '1' }];
    };

    act(async () => {
      const wrapper = mount(
        <MuiThemeProvider theme={MUI_TEMA_PADRAO}>
          <ThemeProvider theme={MUI_TEMA_PADRAO}>
            <ModalContaBancaria
              handleAvancar={() => {}}
              organizacao={{}}
              loading={false}
              open={true}
            />
          </ThemeProvider>
        </MuiThemeProvider>,
      );
      let ContaBancariaWrapper = wrapper.find('ContaBancaria');
      expect(ContaBancariaWrapper.find('ContaBancariaLoader')).toHaveLength(1);
      await act(async () => {
        ContaBancariaWrapper.update().setProps();
      });
      ContaBancariaWrapper = ContaBancariaWrapper.update();
      expect(ContaBancariaWrapper.find('ContaBancariaLoader')).toHaveLength(0);
    }).then();
  });
});
