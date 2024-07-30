#!/usr/bin/env python3

import google.auth
from os import getenv
from sys import exit
from json import loads
from google.cloud import secretmanager

POSSIBLE_ENVS = [
    "local",
    "dev",
    "test",
    "e2e",
    "staging",
    "prod",
]

env = getenv("ENV")
local_test = getenv("LOCAL_TEST")
env_secret_name = getenv("SECRET_NAME")


def main():
    if env not in POSSIBLE_ENVS:
        print(
            f"Ambiente de aplicação indefinido. Ambientes possíveis são: "
            f"{', '.join(str(e) for e in POSSIBLE_ENVS)} "
        )
        return 1

    if env_secret_name:
        _secret_name = env_secret_name
    elif local_test != "0":
        _secret_name = "CE_REACT_LOCAL_TEST"
    else:
        _secret_name = "CE_REACT_CORE"

    try:
        _credentials, _project_id = google.auth.default()

        print(f"Service account {_credentials.service_account_email} configurada")

        client = secretmanager.SecretManagerServiceClient()

        print(f"Acessando secret {_secret_name}")
        secret_path = client.secret_version_path(_project_id, _secret_name, "latest")
        secret_latest_version = client.access_secret_version(secret_path)

        service_secrets = loads(secret_latest_version.payload.data.decode("utf-8"))
        service_secrets.update({"REACT_APP_ENV": getenv("ENV")})

        print(f"Secret {_secret_name} obtido")

        with open(".env", "w") as f:
          for k,v in service_secrets.items():
            f.write(f"{k}={v}\n")
    except Exception as e:
        print(f"Ocorreu um erro ao obter secret {_secret_name}. Erro: {str(e)}")
        return 1

    return 0


if __name__ == "__main__":
    exit(main())
