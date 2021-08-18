#ifndef ASSETS_H
#define ASSETS_H

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <SDL.h>
#include <SDL_image.h>
#include <SDL_ttf.h>
#include <SDL_mixer.h>

typedef enum {
	STATE_NONE,
	STATE_QUIT,
	STATE_MENU,
	STATE_LEVEL1
} state_t;
typedef unsigned uint;
extern SDL_Texture *tex_background;
extern TTF_Font *font_title;
extern TTF_Font *font_text;
int load_assets(SDL_Renderer*);
void destroy_assets(void);

#endif
