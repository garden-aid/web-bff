#!/bin/bash
set -e

STAGE=${STAGE:-dev}
AWS_REGION=${AWS_REGION:-ap-southeast-2}

echo 'Installing dependencies...'
npm i

echo 'Running tests'
npm test

echo "Deploying to stage $STAGE..."
sls deploy --stage $STAGE --region $AWS_REGION
