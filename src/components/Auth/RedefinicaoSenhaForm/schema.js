import Yup from 'commons/Yup';

const Schema = Yup.object().shape({
  novaSenha: Yup.string()
    .min(8)
    .required('Senha obrigatória')
    .matches(
      /^.*(?=.{8,})(?=.*\d.*\d)((?=.*[a-zA-Z]){1}).*$/,
      'A senha deve ter 8 ou mais caracteres contendo pelo menos 2 números e 1 letra',
    ),
  novaSenhaConfirmacao: Yup.string()
    .oneOf([Yup.ref('novaSenha'), ''], 'Senhas não conferem')
    .required('Confirmação de senha obrigatória'),
});

export default Schema;
