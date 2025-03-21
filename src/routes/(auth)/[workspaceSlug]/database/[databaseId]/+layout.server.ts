import { PUBLIC_BASE_API } from '$env/static/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, params, fetch }) => {
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
