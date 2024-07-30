if [ "$ENV" == "prod" ]; then
    echo "Realizando build com flag de produção!"
    yarn env-cmd -f .env craco build --prod
else
    yarn env-cmd -f .env craco build
fi

echo "Compactando build da aplicação..."
cd build
tar -cvjf build.tar.bz2 *
