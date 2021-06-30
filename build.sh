#!/bin/bash
if ! type hugo >/dev/null 2>&1; then
  echo 'Hugo not installed';
else
  rm -rf public
  echo ".................."
  echo ". Public deleted ."
  echo ".................."
  hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify
  echo ".............."
  echo ". Hugo built ."
  echo ".............."
  # echo "..............."
  # echo ". Sync to OSS ."
  # echo "..............."
  # if [ -f "./ossutil64" ];then
  #   echo "Found ossutil64."
  # else
  #   wget http://gosspublic.alicdn.com/ossutil/1.7.3/ossutil64
  #   echo "Ossutil64 downloaded."
  # fi
  # chmod 755 ossutil64
  # ./ossutil64 sync public oss://eallion/ --delete --config-file=ossconfig --delete -f -u
  # rm ossutil64
  # rm -rf public
  echo ".............."
  echo " ALL DONE !"
fi