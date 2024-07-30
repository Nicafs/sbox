# Instruções para deploy ambiente de apresentação

##### Projeto CE-REACT (ce-ui.staging.creditoexpress.com.br)

- Criar arquivo de configuração em "src/whitelabel/{NOME_PARCEIRO}.staging.json"
- Executar ./get-env.sh staging 0 "" CE_REACT_CORE
- Alterar variavel no arquivo .env.apresentacao.staging:
  REACT_APP_TEMA_FIXO={NOME_PARCEIRO}.staging.json
- Executar script ./deploy-apresentacao.sh

