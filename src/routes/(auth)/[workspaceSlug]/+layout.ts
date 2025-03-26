import { PUBLIC_BASE_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const { workspaceSlug } = params;
	const workspaceInfo = await fetch(`${PUBLIC_BASE_API}/workspace/${workspaceSlug}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	const getQuotaApp = await fetch(`${PUBLIC_BASE_API}/quota/application`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})

	const getQuotaDB = await fetch(`${PUBLIC_BASE_API}/quota/database`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})

	if (!workspaceInfo.ok) {
		redirect(302, '/');
	}
	return {
		info: workspaceInfo.ok ? await workspaceInfo.json() : null,
		quotaApp : getQuotaApp.ok ? await getQuotaApp.json() : null,
		quotaDB : getQuotaDB.ok ? await getQuotaDB.json() : null
	};
};
