import { moneyMask } from '../../../../commons/utils/MaskHandle';
import Yup from '../../../../commons/Yup';

const buildSchema = ({ valorMinimo, valorMaximo }) =>
  Yup.object().shape({
    dataPrimeiraParcela: Yup.date().required(
      'Campo Data da Primeira Parcela obrigatório',
    ),
    objetivo: Yup.string().min(1).required('Campo motivo obrigatório'),
    valor: Yup.number()
      .transformaNumerico()
      .min(valorMinimo, `Valor mínimo R$ ${moneyMask(valorMinimo)}`)
      .max(valorMaximo, `Valor máximo R$ ${moneyMask(valorMaximo)}`)
      .required('Valor obrigatório'),
  });

export default buildSchema;
