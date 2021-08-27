#!/bin/sh
mkdir -p build
cp home.html index.html
zip -r build/la-soga.zip scripts assets favicon.ico index.html
rm index.html
