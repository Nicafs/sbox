import React, { useCallback, useEffect } from 'react';

import { useCreditoExpress, useAuth } from '@credito-express/ce-components';

import LoaderCircular from '../../../components/LoaderCircular';
import pushRota from '../../../routes/push';

const Logout = () => {
  const { dispatch } = useCreditoExpress();

  const onLogout = useCallback(() => {
    dispatch({
      type: 'ATUALIZAR_DADOS_AUTENTICACAO',
      payload: {
        usuarioFirebase: {},
        pessoa: {},
      },
    });
    setTimeout(() => {
      pushRota('/');
    }, 2000);
  }, [dispatch, pushRota]); // eslint-disable-line react-hooks/exhaustive-deps

  const { signout } = useAuth({ onLogout });

  useEffect(() => {
    signout();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <LoaderCircular />;
};

export default Logout;
