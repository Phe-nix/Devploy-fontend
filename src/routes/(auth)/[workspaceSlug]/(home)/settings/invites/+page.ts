import { PUBLIC_BASE_API } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
	const { accessToken } = await parent();
	const res = await fetch(`${PUBLIC_BASE_API}/invite`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return {
		invites: res.ok ? await res.json() : null
	};
};
