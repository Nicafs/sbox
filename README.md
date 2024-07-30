<h1 align="center">Crédito Express - ce-react 👋</h1>

> Projeto responsável pelo Portal Crédito Express

### 🏠 [Homepage](https://creditoexpress.com.br/)

### ✨ [Staging](https://ce-ui.staging.creditoexpress.com.br/)

### 💻 [Dev](https://ce-ui.cdev.creditoexpress.com.br/)

## Install

- Esse projeto tem uma dependência do Python para carregar os segredos.
  Assim, tem um arquivo na raíz dos projetos chamado `requirements-ci.txt` para instalar essas dependências, e o script que usa elas considera que elas estejam instaladas em um ambiente virtual Python de nome `venv` na raíz do projeto.
  Esse script faz o download das credenciais e gera um arquivo `.env.{nome do ambiente}` na raíz do projeto pra então o react startará lendo esse arquivo, conforme o ambiente.

- Para instalar essas dependências vc vai na raíz do projeto e executa:

```sh

python3 -m pip3 install grpcio-tools
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements-ci.txt

```

- Além disso, alguns componentes estão versionados no repositório ce-components, e gerenciados pelo bit, temos que instalar o bit na máquina pra conseguir instalar as dependências versionadas por ele.

```sh

npm install bit-bin --global
bit login

```

- Provavelmente você já conseguirá instalar as dependências no ce-react, ce-backoffice e ce-cypress com o `yarn`. Na raiz do projeto rode o comando:

```sh

yarn install

```

## Usage

- Para executar a aplicação na nossa máquina, como precisamos das service accounts da GCP, temos que ter elas na máquina para os ambientes desejados, solicite o arquivo zip com essas configurações.

- Concluindo esses passos inicias, já dá pra executar a aplicação.

- A ideia, é que a galera do front e da parte de qualidade não precise rodar todos os projetos pra conseguir trabalhar (serviços do backend e etc)
  assim, vcs vão executar a aplicação já apontando pra dev e desenvolver com o banco de dev e etc. Pra isso bastar executar:

```sh

yarn start dev

```

### Usage SSL

1. Crie um diretorio `.cert` na raiz do projeto.

2. Instale o [mkcert](https://github.com/FiloSottile/mkcert) no seu sistema operacional.

3. Com o [mkcert](https://github.com/FiloSottile/mkcert) já instalado, execute o comando `mkcert -install`.

4. Gere o certificado dentro da pasta .cert com o seguinte comando na raiz do projeto `mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"`

```sh

yarn start:dev:ssl

```

## Build

```bash

yarn build <ambiente> <local_test> <gcp_sa_key_path>

```

## Deploy

```bash

yarn deploy <ambiente> <local_test> <gcp_sa_key_path>

```
.