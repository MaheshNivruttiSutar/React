import { setupServer } from 'msw/node';
import { teamHandlers } from './handlers';

export const server = setupServer(...teamHandlers);
