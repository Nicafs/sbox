import { moneyMask } from '../../../../commons/utils/MaskHandle';
import Yup from '../../../../commons/Yup';

const buildSchema = ({ valorMinimo, valorMaximo, getLimites }) =>
  Yup.object().shape({
    parcelas: Yup.number()
      .when('valor', (valor, schema) => {
        const { minParcelas, maxParcelas } = getLimites(valor);
        if (minParcelas === 1000) {
          return schema;
        }
        return schema
          .min(
            minParcelas,
            `Número mínimo de parcelas ${minParcelas} com valor R$ ${moneyMask(
              valor,
            )}.`,
          )
          .max(
            maxParcelas,
            `Número máximo de parcelas ${maxParcelas} com valor R$ ${moneyMask(
              valor,
            )}.`,
          );
      })
      .required('Número de parcelas obrigatório'),
    // objetivo: Yup.string().required('O campo objetivo é obrigatório'),
    objetivo: Yup.string().min(1).required('Campo motivo obrigatório'),
    valor: Yup.number()
      .transformaNumerico()
      .min(valorMinimo, `Valor mínimo R$ ${moneyMask(valorMinimo)}`)
      .max(valorMaximo, `Valor máximo R$ ${moneyMask(valorMaximo)}`)
      .required('Valor obrigatório'),
  });

export default buildSchema;
