@ECHO OFF \
echo "Running build.sh to build hugo."
"C:\Program Files\Git\bin\bash.exe" build.sh
coscmd --config_path cos.conf upload -rs --delete public/ /
echo " ALL DONE !"
pause