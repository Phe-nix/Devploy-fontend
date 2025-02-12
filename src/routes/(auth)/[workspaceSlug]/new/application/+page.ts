import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({parent, fetch}) => {
    const { accessToken } = await parent();
    const res = await fetch('http://127.0.0.1:3000/source', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + accessToken,
        },
    });
    const source = res.ok ? await res.json() : null;
    if (source.length == 0) {
        // Hardcoded redirect to the GitHub app installation page
        // This should be replaced with a dynamic redirect to the GitHub app installation page
        redirect(302, "https://github.com/apps/devploy-dev/installations/select_target");
    }

    return {
        source,
    };
});
