import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/types/validate/databases/new/form-schema.js';
import { zod } from 'sveltekit-superforms/adapters';
import axios from 'axios';
import { PUBLIC_BASE_API } from '$env/static/public';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		let accessToken = event.cookies.get('accessToken');
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		console.log(form.data);

		let formData = {
			name: form.data.name,
			username: form.data.username,
			password: form.data.password,
			databaseName: form.data.databaseName,
			image: ''
		}

		const res = await fetch(`${PUBLIC_BASE_API}/workspace/${event.params.workspaceSlug}/database`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(formData)
		});

		if (!res.ok) {
			return fail(500, {
				message: JSON.stringify(res.json()),
				form
			});
		} else {
			return {
				form
			};
		}
	}
};
