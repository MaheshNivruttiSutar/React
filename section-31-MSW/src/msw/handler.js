import { http, HttpResponse } from 'msw';
import { mockDb } from './mockDb';

export const handler = [
    http.get('https://dummyjson.com/users', () => {
        return HttpResponse.json({
            users: mockDb,
        });
    }),
];