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

	let {
		data,
		nowState = $bindable()
	}: { data: { form: SuperValidated<Infer<FormSchema>> }; nowState: string } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),

		onUpdate({ form }) {
			if (form.valid) {
				goto(`/${page.params.workspaceSlug}/applications`);
				toast.success('Database created successfully');
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
					<Input {...props} bind:value={$formData.name} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="databaseName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Database name</Form.Label>
					<Input {...props} bind:value={$formData.databaseName} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="username">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Database username</Form.Label>
					<Input {...props} bind:value={$formData.username} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Database password</Form.Label>
					<Input {...props} bind:value={$formData.password} />
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
