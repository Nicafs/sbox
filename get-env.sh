#!/usr/bin/env bash
set -e

source venv/bin/activate

export ENV=local

if [ -n "$1" ]
then
  export ENV=$1
fi

export LOCAL_TEST=0

if [ -n "$2" ]
then
  export LOCAL_TEST=$2
fi

if [ -n "$3" ]
then
  export GOOGLE_APPLICATION_CREDENTIALS=$3
else
  export GOOGLE_APPLICATION_CREDENTIALS=~/gcp/ce_react/ce-react-sa-$ENV.json
fi

if [ -n "$4" ]
then
  export SECRET_NAME=$4
fi

python ci/scripts/get_secrets.py
