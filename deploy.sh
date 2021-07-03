#!/bin/bash

if ! type pip >/dev/null 2>&1; then
  echo 'Pip not installed.';
else
  if ! type coscmd >/dev/null 2>&1; then
    echo 'Coscmd not installed.'
    echo 'Installing coscmd.'
    pip install coscmd -U
  else
    echo 'Running build.sh to build hugo.'
    bash ./build.sh
    echo 'Deploying to COS.'
    coscmd --config_path cos.conf upload -rs --delete public/ /
    echo "................"
    echo ". COS deployed ."
    echo "................"
  fi
fi