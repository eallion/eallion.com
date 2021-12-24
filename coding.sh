#!/bin/bash

mkdir hugo
cd hugo
curl -fL "https://coding-public-generic.pkg.coding.net/public/downloads/hugo-linux-64bit.deb?version=0.91.2" -o hugo-linux-64bit-0.91.2.deb
apt-get -y install ./hugo-linux-64bit-0.91.2.deb
cd ..
