#!/bin/sh
# extracts date from file in the format
# date: 2013-08-23 14:52:59
# and prepends this to the filename
cd example/posts
for f in *.md; do
    c="$(grep -Eo 'date:\W(....-..-..)' $f | cut -d: -f2 | xargs)"
    s="$(grep -Eo 'slug:\W\"(.+)' $f | cut -d'"' -f2 | xargs)"
    mv "$f" "$c-$s.md"
done
