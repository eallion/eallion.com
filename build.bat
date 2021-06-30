@ECHO OFF 
set PATH=.;%PATH%
set pan=.\public\
rmdir /s /q public
echo ".................."
echo ". Public deleted ."
echo ".................."
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify
echo ".............."
echo ". Hugo built ."
echo ".............."
:: wget https://gosspublic.alicdn.com/ossutil/1.7.3/ossutil64.zip
:: unzip ossutil64.zip
:: ossutil64.exe sync public oss://eallion/ --delete --config-file=ossconfig --delete -f -u
:: echo "..............."
:: echo ". Sync to OSS ."
:: echo "..............."
:: del ossutil64.exe
:: rmdir /s /q public
echo "..............."
echo " ALL DONE !"
pause