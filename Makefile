.DEFAULT_GOAL := build

.PHONY: build
build:
    hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify --enableGitInfo
    npx rehype-cli public -o
