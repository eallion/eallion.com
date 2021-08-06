#!/bin/bash

hash=`git log --pretty=format:"%H" -n 1`
r_hash="  LastCommitHash = \"${hash}\""
echo $hash
sed -i "s/^.*LastCommitHash.*$/$r_hash/g" config.toml
