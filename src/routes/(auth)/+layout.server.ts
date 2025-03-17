import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_BASE_API } from '$env/static/public';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const accessToken = cookies.get('accessToken');
    console.log("Fetching data from Layout Server Load");
	if (!locals.user) {
		redirect(302, '/login');
	}
	const response = await fetch('http://127.0.0.1:3000/workspace', {
		method: 'GET',
		headers: {
			authorization: `Bearer ${accessToken}`
		}
	});

	const resSetting = await fetch(`${PUBLIC_BASE_API}/setting`, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${accessToken}`
		}
	})

	return {
		accessToken,
        workspace: response.ok ? await response.json() : [],
		userProfile: locals.user,
		baseSetting: resSetting.ok ? await resSetting.json() : [],
	};
};
