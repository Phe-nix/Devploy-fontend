import axios from 'axios';
import type { RequestHandler } from './$types';
import { PUBLIC_BASE_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({url, cookies}) => {
    console.log(url.searchParams)
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const codeVerifier = cookies.get('codeVerifier');
    const cookieState = cookies.get('state');
    const req = await axios.post(`${PUBLIC_BASE_API}/auth/google/callback`, {
        code,state,codeVerifier,cookieState
    })
    if (req.status !== 200) {
        return new Response(JSON.stringify({ message: req.data.message }), { status: 500 });
    }
    cookies.delete('state', {
        path: '/',
    });
    cookies.delete('codeVerifier', {
        path: '/',
    });
    const { accessToken } = req.data;
    cookies.set('accessToken', accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
    });
    return redirect(302, '/');
};
