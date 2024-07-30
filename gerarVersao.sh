#!/bin/sh
export DEBIAN_FRONTEND=noninteractive
apt-get install -yq apt-utils jq
source="./public/version.json"
object=$(cat "$source")
currentVersion=$(echo $object | jq -r '.version')
newVersion=$(semver $currentVersion -i $1)
echo '{ "version":"'$newVersion'"}' > public/version.json