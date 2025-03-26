import { PUBLIC_BASE_API } from '$env/static/public';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';


export const load: PageServerLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const allUsers = await fetch(`${PUBLIC_BASE_API}/dashboard/user`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return {
		alluser: allUsers.ok ? await allUsers.json() : null,
	};
};

