#!/bin/bash

# 优先运行 Firefox-devlopper
if [ `command -v firefox-dev` ]; then
    start firefox-dev -private-window "http://127.0.0.1:1313"
else
    start chrome -incognito "http://127.0.0.1:1313"
fi
hugo server -w -D -p 1313 -t DoIt --bind 0.0.0.0 --contentDir example --forceSyncStatic --ignoreCache --noHTTPCache --disableFastRender -e production --enableGitInfo
