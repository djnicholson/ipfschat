#!/bin/bash
set -e 
npm run build
docker run --rm -it -w /repo -v $PWD:/repo node:lts-alpine node build/index.js
