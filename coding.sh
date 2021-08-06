#!/bin/bash

Version="0.87.0"
echo ${Version}
mkdir hugo
cd hugo
curl -fL "https://coding-public-generic.pkg.coding.net/public/downloads/hugo-Linux-64bit.deb?version=${Version}" -o hugo-Linux-64bit.deb
apt-get -y install ./hugo-Linux-64bit.deb
cd ..
