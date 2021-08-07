#!/bin/bash

hash=`git log --pretty=format:"%H" -n 1`
echo $hash
sed -i "s/69d6ffe319557706dcf4150e960e7b7e21a37d9f/$hash/g" themes/hello-friend/layouts/partials/githash.html
