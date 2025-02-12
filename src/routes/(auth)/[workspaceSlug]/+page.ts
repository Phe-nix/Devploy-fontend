import type { PageLoad } from "../$types";
import { PUBLIC_BASE_API } from '$env/static/public';

export const load: PageLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const workspaceSlug  = params;
	const workspaceInfo = await fetch(`${PUBLIC_BASE_API}/workspace/${workspaceSlug}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return {
        info: workspaceInfo.ok ? await workspaceInfo.json() : null
    };
};