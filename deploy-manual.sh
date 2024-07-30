checar_erro(){
  if [ $? -ne 0 ]
  then
      echo @@@@@ - Falhou $?
      exit 1
  fi
}

if [ -n "$1" ]
then
  export ENV=$1
else
  echo "Variavel de ambiente não fornecida"
  exit 1
fi


# build ce
echo "Realizando build crédito express"
./get-env.sh $ENV 0 "" CE_REACT_CORE
yarn env-cmd -f .env craco build --prod
checar_erro

# deploy ce
echo "Realizando deploy crédito express"
firebase deploy -P $ENV --only hosting:$ENV,firestore:rules,firestore:indexes,storage,database

# build portocred
echo "Realizando build portocred"
./get-env.sh $ENV 0 "" CE_REACT_CORE_PORTOCRED
yarn env-cmd -f .env craco build --prod
checar_erro

# deploy portocred
echo "Realizando deploy portocred"
firebase deploy -P portocred-$ENV --only hosting:portocred-$ENV,firestore:rules,firestore:indexes,storage,database

# build semear
echo "Realizando build semear"
./get-env.sh $ENV 0 "" CE_REACT_CORE_BANCOSEMEAR
yarn env-cmd -f .env craco build --prod
checar_erro

# deploy semear
echo "Realizando deploy semear"
firebase deploy -P bancosemear-$ENV --only hosting:bancosemear-$ENV,firestore:rules,firestore:indexes,storage,database
