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

if [ -n "$2" ]
then
  export SECRET_NAME=$2
fi

if [ -n "$3" ]
then
  export CE_REACT_SA_KEY=$3
fi

# build
./get-env.sh $ENV 0 "$CE_REACT_SA_KEY" $SECRET_NAME
checar_erro
yarn env-cmd -f .env craco build --prod
checar_erro
