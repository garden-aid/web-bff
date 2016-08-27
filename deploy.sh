#!/bin/bash
set -e

if [[ $TRAVIS_PULL_REQUEST == "true" ]]; then
  echo "Not deploying changes on pull request";
  exit 0;
fi

AWS_REGION=${AWS_REGION:-ap-southeast-2}
BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}

if [[ $BRANCH == 'master' ]]; then
  STAGE="prod"
elif [[ $BRANCH == 'develop' ]]; then
  STAGE="dev"
fi

if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi

echo "Deploying from branch $BRANCH to stage $STAGE"

cp "./config/$STAGE.json" config.json

node ./create-secrets.js # create secrets.json from env variables

npm prune --production

sls deploy --stage $STAGE --region $AWS_REGION
