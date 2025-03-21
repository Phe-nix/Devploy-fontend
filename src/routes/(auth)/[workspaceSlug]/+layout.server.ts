import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_BASE_API } from '$env/static/public';

export const load: LayoutServerLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const { workspaceSlug } = params;
	const workspaceInfo = await fetch(`${PUBLIC_BASE_API}/workspace/${workspaceSlug}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (!workspaceInfo.ok)
	{
		redirect(302, '/')
	}
	return {
        info: workspaceInfo.ok ? await workspaceInfo.json() : null
    };
};
