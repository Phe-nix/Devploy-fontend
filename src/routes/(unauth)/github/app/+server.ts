import axios from 'axios';
import type { RequestHandler } from './$types';
import { PUBLIC_BASE_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({url, cookies}) => {
    const code = url.searchParams.get('code');
    const installation_id = url.searchParams.get('installation_id');
    const setup_action = url.searchParams.get('setup_action');
    const accessToken = cookies.get('accessToken');
    const req = await axios.post(`${PUBLIC_BASE_API}/github/app`, {
        code, installation_id, setup_action
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    if (req.status !== 200) {
        return new Response(JSON.stringify({ message: req.data.message }), { status: 500 });
    }
    return redirect(302, '/');
};
