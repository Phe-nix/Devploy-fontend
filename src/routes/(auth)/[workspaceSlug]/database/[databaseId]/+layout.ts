import { PUBLIC_BASE_API } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const { databaseId } = params;
	const appInfo = await fetch(`${PUBLIC_BASE_API}/database/${databaseId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return {
		databaseInfo: appInfo.ok ? await appInfo.json() : null
	};
};
