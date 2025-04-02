import axios from 'axios';
import type { RequestHandler } from './$types';
import { PUBLIC_BASE_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const req = await axios.get(`${PUBLIC_BASE_API}/auth/google/login`);
	if (req.status !== 200) {
		return new Response(JSON.stringify({ error: 'Failed to get login URL' }), { status: 500 });
	}
	const { url, state, codeVerifier } = req.data;
    cookies.set('state', state, {
        path: '/',
    });
    cookies.set('codeVerifier', codeVerifier, {
        path: '/',
    });
	return redirect(302, url);
};
