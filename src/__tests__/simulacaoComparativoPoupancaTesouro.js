import {
  calculaRendimentoPoupanca,
  calculaRendimentoTesouroDireto,
} from 'commons/simulacao/CalculaSimulacaoInvestimento';
import { arredondaNumero } from '../commons/utils';

describe('Simulação Poupança', () => {
  it('R$ 2.000,00 em 12x (Rendimento = R$ 63,00)', () => {
    const rendimentoPoupanca = calculaRendimentoPoupanca({
      valor: 2000,
      qtdParcelas: 12,
      taxaSelic: 0.045,
      taxaReferencial: 0,
      qtdDias: 365,
    });
    expect(arredondaNumero(rendimentoPoupanca)).toEqual(63.89);
  });
  it('R$ 2.000,00 em 12x (Rendimento = R$ 233,74)', () => {
    const rendimentoTesouro = calculaRendimentoTesouroDireto({
      valor: 2000,
      qtdParcelas: 12,
      taxaSelic: 0.045,
      qtdDias: 365,
    });
    expect(arredondaNumero(rendimentoTesouro)).toEqual(91.28);
  });
});
