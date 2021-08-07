#!/bin/bash

if ! type hugo >/dev/null 2>&1; then
  echo 'Hugo not installed.';
else
  rm -rf public
  echo ".................."
  echo ". Public deleted ."
  echo ".................."
  bash githash.sh
  hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo
  echo ".............."
  echo ". Hugo built ."
  echo ".............."
fi
