#include "menu.h"
/*#include "level1.h"*/

int main(void)
{
	SDL_Window *win;
	SDL_Renderer *rend;
	int exit = 0;
	state_t(*update)(SDL_Renderer*) = menu_update;
	if (SDL_Init(SDL_INIT_EVERYTHING)) {
		printf("SDL Error: %s\n", SDL_GetError());
		return 1;
	}
	atexit(SDL_Quit);
	if ((IMG_Init(IMG_INIT_PNG) & IMG_INIT_PNG) != IMG_INIT_PNG) {
		printf("IMG Error: %s\n", IMG_GetError());
		return 1;
	}
	atexit(IMG_Quit);
	if (TTF_Init()) {
		printf("TTF Error: %s\n", TTF_GetError());
		return 1;
	}
	atexit(TTF_Quit);
	/*if ((Mix_Init(MIX_INIT_OGG) & MIX_INIT_OGG) != MIX_INIT_OGG) {
		printf("Mixer Error: %s\n", Mix_GetError());
		return 1;
	}
	atexit(Mix_Quit);*/
	win = SDL_CreateWindow("Prueba",
			SDL_WINDOWPOS_UNDEFINED,
			SDL_WINDOWPOS_UNDEFINED,
			0, 0, SDL_WINDOW_FULLSCREEN_DESKTOP);
	if (!win) {
		printf("SDL Error: %s\n", SDL_GetError());
		return 1;
	}
	rend = SDL_CreateRenderer(win, -1, SDL_RENDERER_ACCELERATED |
					SDL_RENDERER_PRESENTVSYNC);
	if (!rend) {
		printf("SDL Error: %s\n", SDL_GetError());
		SDL_DestroyWindow(win);
		return 1;
	}
	if (SDL_RenderSetLogicalSize(rend, 320, 180) ||
	    SDL_RenderSetIntegerScale(rend, 1) ||
	    load_assets(rend)) {
		printf("SDL Error: %s\n", SDL_GetError());
		SDL_DestroyRenderer(rend);
		SDL_DestroyWindow(win);
		return 1;
	}
	atexit(destroy_assets);
	while (!exit) {
		switch (update(rend)) {
		case STATE_NONE:
			break;
		case STATE_QUIT:
			exit = 1;
			break;
		case STATE_MENU:
			update = menu_update;
			break;
		/*case STATE_LEVEL1:
			update = level1_update;
			break;*/
		default:
			break;
		}
	}
	SDL_DestroyRenderer(rend);
	SDL_DestroyWindow(win);
	return 0;
}
