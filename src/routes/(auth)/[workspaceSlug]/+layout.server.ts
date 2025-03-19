import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const { workspaceSlug } = params;
	const workspaceInfo = await fetch(`http://127.0.0.1:3000/workspace/${workspaceSlug}`, {
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
