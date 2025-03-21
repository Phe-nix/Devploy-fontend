import { PUBLIC_BASE_API } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = (async ({ parent, params, fetch }) => {
    const { accessToken } = await parent();
	const { appId } = params;
	const appInfo = await fetch(`${PUBLIC_BASE_API}/application/${appId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	const settingInfo = await fetch(`${PUBLIC_BASE_API}/setting`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return {
		appInfo: appInfo.ok ? await appInfo.json() : null,
		settingInfo: settingInfo.ok ? await settingInfo.json() : null
	};
});
