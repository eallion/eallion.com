#!/bin/bash

mkdir hugo
cd hugo
curl -fL "https://coding-public-generic.pkg.coding.net/public/downloads/hugo-linux-64bit.deb?version=0.93.0" -o hugo-linux-64bit-0.93.0.deb
apt-get -y install ./hugo-linux-64bit-0.93.0.deb
cd ..
