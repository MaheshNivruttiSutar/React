import { rest } from 'msw';

export const teamHandlers = [
  rest.get('/api/team', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'Neha Rao', role: 'Product Manager' },
        { id: 2, name: 'Karan Desai', role: 'Backend Engineer' },
      ])
    );
  }),
];
