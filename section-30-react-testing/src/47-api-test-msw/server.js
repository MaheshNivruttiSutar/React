import { setupServer } from 'msw/node';
import { recipeHandlers } from './handlers';

export const server = setupServer(...recipeHandlers);
