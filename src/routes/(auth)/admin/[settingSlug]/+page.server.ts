import { PUBLIC_BASE_API } from '$env/static/public';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

import { superValidate } from 'sveltekit-superforms';
import { formSchemalimit } from '$lib/types/validate/databases/setting/form-limit';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ parent, params, fetch }) => {
	const { accessToken } = await parent();
	const allUsers = await fetch(`${PUBLIC_BASE_API}/dashboard/user`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return {
		alluser: allUsers.ok ? await allUsers.json() : null,
		form: await superValidate(zod(formSchemalimit))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchemalimit));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
