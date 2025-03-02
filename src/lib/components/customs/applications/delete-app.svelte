<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';

	import {
		confirmDeleteForm,
		type ConfirmDeleteForm
	} from '$lib/types/validate/application/confirm-delete-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let {
		data
	}: {
		data: {
			appInfo: any;
			form: SuperValidated<Infer<ConfirmDeleteForm>>;
		};
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(confirmDeleteForm),
		id: crypto.randomUUID(),

		onUpdated({ form }) {
			if (form.valid) {
				goto(`/${page.params.workspaceSlug}/applications`);
				isOpen = false;
				toast.success('Application deleted successfully');
			} else if (!form.valid) {
				toast.error('Form is invalid. Please check the fields and try again');
			}
		},
		onError({ result }) {
			toast.error('Something went wrong. Please try again');
		}
	});

	const { form: formData, enhance } = form;

	let isOpen = $state(false);
</script>

<Dialog.Root
	open={isOpen}
	onOpenChange={(open) => {
		isOpen = open;
	}}
>
	<Dialog.Trigger
		><Button class="w-16 bg-destructive dark:text-white hover:bg-red-300" size="sm">Delete</Button
		></Dialog.Trigger
	>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Delete Application</Dialog.Title>
			<Dialog.Description>
				This application will be deleted, along with all of its Deployments and It can't undone.
			</Dialog.Description>
			<Alert.Root variant="destructive">
				<CircleAlert class="size-4" />
				<Alert.Title>Warning</Alert.Title>
				<Alert.Description>This action is not reversible. Please be certain.</Alert.Description>
			</Alert.Root>
		</Dialog.Header>
		<form method="POST" action="?/delete" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							>Enter the application name <span class="text-muted-foreground"
								>devploy/{data.appInfo.name}</span
							> to continue:</Form.Label
						>
						<Input {...props} bind:value={$formData.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="confirm">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							>Type <span class="text-muted-foreground">delete {data.appInfo.name}</span> to confirm:</Form.Label
						>
						<Input {...props} bind:value={$formData.confirm} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="flex items-center justify-between">
				<Button
					onclick={() => {
						isOpen = false;
					}}>Cancel</Button
				>
				<Form.Button
					type="submit"
					class="my-4 bg-destructive"
					onsubmit={() => {
						toast.success('Application deleted successfully');
					}}>Submit</Form.Button
				>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
