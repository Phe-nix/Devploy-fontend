import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const { appId } = params;
	const appInfo = await fetch(`http://127.0.0.1:3000/application/${appId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return {
		appInfo: appInfo.ok ? await appInfo.json() : null
	};
};
