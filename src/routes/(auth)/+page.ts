import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { workspace } = await parent();
    if (workspace.length !== 0) {
        redirect(302, '/' + workspace[0].slug);
    }
	return {};
};
