#!/bin/bash

if ! type hugo >/dev/null 2>&1; then
  echo 'Hugo not installed.';
else
  rm -rf public
  echo ".................."
  echo ". Public deleted ."
  echo ".................."
  cp themes/hello-friend/layouts/partials/githash.html themes/hello-friend/layouts/partials/githash.bak
  bash githash.sh
  hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo
  rm themes/hello-friend/layouts/partials/githash.html
  mv themes/hello-friend/layouts/partials/githash.bak themes/hello-friend/layouts/partials/githash.html
  echo ".............."
  echo ". Hugo built ."
  echo ".............."
fi
