checar_erro(){
  if [ $? -ne 0 ]
  then
      echo @@@@@ - Falhou $?
      exit 1
  fi
}

# build app apresentação
echo "Realizando build app apresentação staging"
yarn env-cmd -f .env.apresentacao.staging craco build --prod
checar_erro

# deploy app apresentação
echo "Realizando deploy app apresentação staging"
firebase deploy -P staging --only hosting:staging