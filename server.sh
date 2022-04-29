#!/bin/bash

# 优先运行 Firefox-devlopper
if [ `command -v firefox-dev` ]; then
    start firefox-dev -private-window "http://192.168.0.5:8080"
else
    start chrome -incognito "http://192.168.0.5:8080"
fi
hugo server -w -D --cleanDestinationDir --forceSyncStatic --ignoreCache --noHTTPCache -p 8080 -t hello-friend --bind 192.168.0.5 --baseURL 192.168.0.5
