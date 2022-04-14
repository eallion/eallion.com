#!/bin/bash

start chrome http://192.168.0.5:8080
hugo server -w -D -p 8080 -t hello-friend --bind 192.168.0.5 --baseURL 192.168.0.5 --renderStaticToDisk
