import type { PageServerLoad, Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { confirmDeleteForm } from '$lib/types/validate/application/confirm-delete-schema.js';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_BASE_API } from '$env/static/public';
import { toast } from 'svelte-sonner';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(confirmDeleteForm))
	};
};

export const actions: Actions = {
	delete: async (event) => {
		let accessToken = event.cookies.get('accessToken');
		const form = await superValidate(event, zod(confirmDeleteForm));

		if (!form.valid) {
			return fail(400, { form });
		}

		const res = await fetch(`${PUBLIC_BASE_API}/application/${event.params.appId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${accessToken}`
			}
		});

		if (!res.ok) {
			return fail(500, { message: 'Failed to delete the application', form });
		}

		return {
			form
		};
	}
};
