#!/bin/bash

get_latest_release() {
    curl --silent "https://api.github.com/repos/gohugoio/hugo/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/;s/v//g'
}

version=$(get_latest_release)

mkdir hugo
cd hugo
curl -fL "https://coding-public-generic.pkg.coding.net/public/downloads/hugo-linux-64bit.deb?version=${version}" -o hugo-linux-64bit-${version}.deb
apt-get -y install ./hugo-linux-64bit-${version}.deb
cd ..
