import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	event.cookies.delete('accessToken', {
		path: '/'
	});
	event.cookies.delete('refreshToken', {
		path: '/'
	});
	return redirect(302, '/login');
};
