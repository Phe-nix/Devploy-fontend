import type { Handle } from '@sveltejs/kit';
import { PUBLIC_BASE_API } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	let accessToken = event.cookies.get('accessToken');
	const refreshToken = event.cookies.get('refreshToken');

	if (!accessToken) {
		if (refreshToken) {
			const response = await event.fetch('http://127.0.0.1:3000/auth/google/refresh', {
				method: 'GET',
				headers: {
					authorization: `Bearer ${refreshToken}`
				}
			});
			if (response.ok) {
				const data = await response.json();
				accessToken = data.accessToken;
				event.cookies.set('accessToken', data.accessToken, {
					path: '/',
					expires: new Date(data.expiresAt)
				});
			}
		}
	}

	if (accessToken) {
		const response = await event.fetch('http://127.0.0.1:3000/auth/profile', {
			method: 'GET',
			headers: {
				authorization: `Bearer ${accessToken}`
			}
		});
		if (!response.ok) {
			event.locals.user = null;
			event.cookies.delete('accessToken', {
				path: '/'
			});
			event.cookies.delete('refreshToken', {
				path: '/'
			});
			return resolve(event);
		}
		const user = await response.json();
		event.locals.user = user;
	}

	return resolve(event);
};
