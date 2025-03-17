<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { zod } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import {
		formSchemaPort,
		type FormSchemaPort
	} from '$lib/types/validate/databases/setting/form-edit-port';
	import { toast } from 'svelte-sonner';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let {
		data
	}: {
		data: {
			accessToken: any;
			baseSetting: any;
			databaseInfo: any;
			formUpdate: SuperValidated<Infer<FormSchemaPort>>;
		};
	} = $props();

	const form = superForm(data.formUpdate, {
		validators: zodClient(formSchemaPort),
		id: crypto.randomUUID(),

		async onUpdate({ form }) {
			if (form.valid) {
				try {
					if (
						form.data.port >= data.baseSetting.reservePort &&
						form.data.port <= data.baseSetting.reservePortEnd
					) {
						const res = axios.put(
							`${PUBLIC_BASE_API}/database/${page.params.databaseId}`,
							{
								port: form.data.port
							},
							{
								headers: {
									authorization: `Bearer ${data.accessToken}`
								}
							}
						);

						const resStopDB = await axios.post(
							`${PUBLIC_BASE_API}/database/${page.params.databaseId}/stop`,
							{},
							{
								headers: {
									authorization: `Bearer ${data.accessToken}`
								}
							}
						);

						if (resStopDB.status == 200) {
							toast.success('Database was Stop');
						} else {
							throw new Error('Something want wrong');
						}

						toast.promise(res, {
							loading: 'Loading...',
							success: (data) => {
								const res = data;
								const { id } = res.data;
								goto(`/${page.params.workspaceSlug}/database/${id}/info`, {
									invalidateAll: true
								});
								return ' Port has been Updated';
							},
							error: (e: any) => {
								return e.message;
							}
						});
					} else {
						throw new Error('This port is not open in DevPloy');
					}
				} catch (e: any) {
					toast.error(e.message + '. Please try again');
				}
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<main class="my-4 flex flex-col space-y-5">
	<section class="py-5 flex flex-col border rounded p-4 my-4">
		<form method="POST" action="?/update" use:enhance class="flex flex-col">
			<Form.Field {form} name="port">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Port</Form.Label>
						<Input type="number" {...props} bind:value={$formData.port} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="self-end" disabled={$formData.port == 0}>Save</Form.Button>
		</form>
	</section>
</main>
