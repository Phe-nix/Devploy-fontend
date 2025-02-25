import type { PageServerLoad, Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { confirmDeleteForm } from '$lib/types/validate/application/confirm-delete-schema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(confirmDeleteForm))
	};
};

export const actions: Actions = {
	delete: async (event) => {
		const form = await superValidate(event, zod(confirmDeleteForm));
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
