#include "menu.h"

SDL_Rect rect_background = {0, 0, 320, 180};

state_t menu_update(SDL_Renderer *rend)
{
	SDL_Event event;
	while(SDL_PollEvent(&event)) {
		if (event.type == SDL_QUIT)
			return STATE_QUIT;
	}
	SDL_RenderClear(rend);
	SDL_RenderCopy(rend, tex_background, NULL, &rect_background);
	SDL_RenderPresent(rend);
	return STATE_NONE;
}
