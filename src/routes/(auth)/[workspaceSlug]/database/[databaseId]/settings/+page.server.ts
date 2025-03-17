import { formSchemaPort } from '$lib/types/validate/databases/setting/form-edit-port';
import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { confirmDeleteForm } from '$lib/types/validate/application/confirm-delete-schema.js';
export const load: PageServerLoad = async () => {
	return {
		formUpdate: await superValidate(zod(formSchemaPort)),
		formDelete: await superValidate(zod(confirmDeleteForm))
	};
};

export const actions: Actions = {
	update: async ({ request, cookies }) => {
		const formUpdate = await superValidate(request, zod(formSchemaPort));
		if (!formUpdate.valid) {
			return fail(400, {
				formUpdate
			});
		}
		return {
			formUpdate
		};
	},

	delete: async ({ request, cookies }) => {
		const formDelete = await superValidate(request, zod(confirmDeleteForm));
		if (!formDelete.valid) {
			return fail(400, {
				formDelete
			});
		}
		return {
			formDelete
		};
	}
};
