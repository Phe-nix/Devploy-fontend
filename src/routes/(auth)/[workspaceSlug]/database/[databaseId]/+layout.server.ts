import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const { databaseId } = params;
	const appInfo = await fetch(`http://127.0.0.1:3000/database/${databaseId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return {
		databaseInfo: appInfo.ok ? await appInfo.json() : null
	};
};
