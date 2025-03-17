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
	default: async ({request, cookies}) => {
		let accessToken = cookies.get('accessToken');
		const form = await superValidate(request, zod(formSchema));
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
