<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';

	// shadcn-svelte
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { formSchema, type FormSchema } from '$lib/types/validate/databases/new/form-schema';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';

	let {
		data,
		nowState = $bindable(),
		db
	}: {
		data: {
			accessToken: any;
			form: SuperValidated<Infer<FormSchema>>;
		};
		nowState: string;
		db: string;
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onUpdate({ form }) {
			if (form.valid) {
				try {
					const res = axios.post(
						`${PUBLIC_BASE_API}/workspace/${page.params.workspaceSlug}/database`,
						{
							name: form.data.name,
							username: form.data.username,
							password: form.data.password,
							databaseName: form.data.databaseName,
							image: db
						},
						{
							headers: {
								authorization: `Bearer ${data.accessToken}`
							}
						}
					);
					toast.promise(res, {
						loading: 'Loading...',
						success: (data) => {
							const res = data;
							const { databaseId } = res.data;
							goto(`/${page.params.workspaceSlug}/database/${databaseId}/info`, {
								invalidateAll: true,
							});
							return form.data.name + ' database has been Created';
						},
						error: (e: any) => {
							return e.message;
						}
					});
				} catch (e: any) {
					toast.error(e.message + '. Please try again');
				}
			} else {
				toast.error('Form is invalid. Please check the fields and try again');
			}
		},
		onError({ result }) {
			toast.error('Something went wrong. Please try again');
		}
	});

	const { form: formData, enhance } = form;
</script>

<div>
	<form method="POST" use:enhance class="py-6 flex flex-col w-full md:px-20 space-y-2">
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Name</Form.Label>
					<Input {...props} placeholder="DevployDB" bind:value={$formData.name} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="flex flex-col gap-2">
			<Label>Type database</Label>
			<Input name="typeDB" placeholder={db} disabled bind:value={db} />
		</div>
		<Form.Field {form} name="databaseName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Database name</Form.Label>
					<Input {...props} placeholder="DevployDB" bind:value={$formData.databaseName} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="username">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Username</Form.Label>
					<Input {...props} placeholder="admin" bind:value={$formData.username} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Password</Form.Label>
					<Input
						type="password"
						{...props}
						placeholder="admin123"
						bind:value={$formData.password}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="flex justify-between w-full max-w-5xl">
			<Button
				onclick={() => {
					nowState = 'select';
				}}>Back</Button
			>
			<Form.Button>Deploy</Form.Button>
		</div>
	</form>
</div>
