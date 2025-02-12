import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_BASE_API } from '$env/static/public';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const accessToken = cookies.get('accessToken');
    console.log("Fetching data from Layout Server Load");
	if (!locals.user) {
		redirect(302, '/login');
	}
	const response = await fetch(`${PUBLIC_BASE_API}/workspace`, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${accessToken}`
		}
	});
	return {
		accessToken,
        workspace: response.ok ? await response.json() : []
	};
};