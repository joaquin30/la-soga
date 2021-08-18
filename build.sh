#!/bin/sh
gcc *.c -ansi -I/usr/include/SDL2 -D_REENTRANT -lpng -lSDL2 -lm -lSDL2_image -lSDL2_ttf -lSDL2_mixer -Wall -Wextra -pedantic -O0 -o game
