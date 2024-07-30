import { moneyMask, percentMask } from '../commons/utils/MaskHandle';

describe('Teste função de formatar porcentagem', () => {
  it('Teste com zero a direita', () => {
    expect(percentMask(13.5)).toEqual('13,50');
  });

  it('Teste porcentagem 1.8', () => {
    expect(percentMask(0.018)).toEqual('1,8');
  });
});

describe('Teste função de formatar dinheiro', () => {
  it('Teste com zero a direita', () => {
    expect(moneyMask(13.5)).toEqual('13,50');
  });

  it('Teste com duas casas decimais', () => {
    expect(moneyMask(76.62)).toEqual('76,62');
  });

  it('Teste acima de milhar', () => {
    expect(moneyMask(4830.6)).toEqual('4.830,60');
  });

  it('Teste centena', () => {
    expect(moneyMask(134.52)).toEqual('134,52');
  });

  it('Teste sem casas decimais', () => {
    expect(moneyMask(5)).toEqual('5,00');
  });

  it('Teste com casa decimal zerada', () => {
    expect(moneyMask(5.0)).toEqual('5,00');
  });

  it('Teste arrendodamento para baixo', () => {
    expect(moneyMask(5.523)).toEqual('5,52');
  });

  it('Teste arrendodamento para cima', () => {
    expect(moneyMask(5.527)).toEqual('5,53');
  });

  it('Teste arrendodamento para cima com milhar', () => {
    expect(moneyMask(1465.527)).toEqual('1.465,53');
  });

  it('Teste arrendodamento para baixo com milhar', () => {
    expect(moneyMask(2455.523)).toEqual('2.455,52');
  });
});
