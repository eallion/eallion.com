#!/bin/bash

get_latest_release() {
    curl --silent "https://api.github.com/repos/gohugoio/hugo/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/;s/v//g'
}

version=$(get_latest_release)
ghurl="https://github.com/gohugoio/hugo/releases/download/v${version}/hugo_${version}_Linux-64bit.deb"
url="https://coding-public-generic.pkg.coding.net/public/downloads/hugo-linux-64bit.deb?version=${version}"
status=$(curl -sfL -w %{http_code} -o /dev/null ${url})

if [[ "${status}" == 404 ]]; then
    curl -Lo hugo-linux-64bit-${version}.deb ${ghurl}
    echo "⬇️ Downloaded from GitHub"
else
    curl -fL ${url} -o hugo-linux-64bit-${version}.deb
    echo "⬇️ Downloaded from Coding"
fi
apt-get -y install ./hugo-linux-64bit-${version}.deb
