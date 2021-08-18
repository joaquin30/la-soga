#include "utils.h"

SDL_Texture *tex_background;
TTF_Font *font_title;
TTF_Font *font_text;

int load_assets(SDL_Renderer *rend)
{
	tex_background = IMG_LoadTexture(rend, "assets/background.png");
	if (!tex_background) {
		printf("IMG Error: %s", IMG_GetError());
		return 1;
	}
	font_title = TTF_OpenFont("assets/pixel.ttf", 24);
	font_text = TTF_OpenFont("assets/pixel.ttf", 16);
	return 0;
}

void destroy_assets(void)
{
	SDL_DestroyTexture(tex_background);
	TTF_CloseFont(font_title);
	TTF_CloseFont(font_text);
}
