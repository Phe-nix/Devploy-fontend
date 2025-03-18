<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { z } from 'zod';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { data, form: initialForm }: { data: any; form: SuperValidated<Infer<FormSchemaLimit>> } =
		$props();

	const formSchemalimit = z.object({
		baseUrl: z.string().min(2).max(25).default(data.baseSetting.baseUrl),
		reservePort: z.number().int().positive(),
		reservePortEnd: z.number().int().positive(),
		defaultApplicationQuota: z.number().int().positive(),
		defaultDatabaseQuota: z.number().int().positive()
	});

	type FormSchemaLimit = typeof formSchemalimit;

	const form = superForm(initialForm, {
		validators: zodClient(formSchemalimit),
		onUpdate({ form }) {
			if (form.valid) {
				try {
					const res = axios.put(
						`${PUBLIC_BASE_API}/setting`,
						{
							baseUrl: form.data.baseUrl,
							reservePort: form.data.reservePort,
							reservePortEnd: form.data.reservePortEnd,
							defaultApplictionQuota: form.data.defaultApplicationQuota,
							defaultDatabaseQuota: form.data.defaultDatabaseQuota
						},
						{
							headers: {
								authorization: `Bearer ${data.accessToken}`
							}
						}
					);
					toast.promise(res, {
						loading: 'Loading...',
						success: () => {
							goto(`/admin/Quota`, {
								invalidateAll: true
							});
							return 'Setting has been Changed';
						},
						error: (e: any) => {
							return e.message;
						}
					});
				} catch (e: any) {
					return e.message;
				}
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<div>
	<div class="p-4">
		<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Setting limit</h3>
	</div>
	<div class="mx-auto w-1/2">
		<form method="POST" use:enhance class="flex flex-col">
			<Form.Field {form} name="baseUrl">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-2">
							<Form.Label>BaseUrl</Form.Label>
							<p class="text-xs text-muted-foreground">{'( ' + data.baseSetting.baseUrl + ' )'}</p>
						</div>
						<Input {...props} bind:value={$formData.baseUrl} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="reservePort">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-2">
							<Form.Label>ReservePort</Form.Label>
							<p class="text-xs text-muted-foreground">
								{'( ' + data.baseSetting.reservePort + ' )'}
							</p>
						</div>
						<Input type="number" {...props} bind:value={$formData.reservePort} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="reservePortEnd">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-2">
							<Form.Label>ReservePortEnd</Form.Label>
							<p class="text-xs text-muted-foreground">
								{'( ' + data.baseSetting.reservePortEnd + ' )'}
							</p>
						</div>
						<Input type="number" {...props} bind:value={$formData.reservePortEnd} />
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="defaultApplicationQuota">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-2">
							<Form.Label>DefaultApplicationQuota</Form.Label>
							<p class="text-xs text-muted-foreground">
								{'( ' + data.baseSetting.defaultApplictionQuota + ' )'}
							</p>
						</div>
						<Input type="number" {...props} bind:value={$formData.defaultApplicationQuota} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="defaultDatabaseQuota">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-2">
							<Form.Label>DefaultDatabaseQuota</Form.Label>
							<p class="text-xs text-muted-foreground">
								{'( ' + data.baseSetting.defaultDatabaseQuota + ' )'}
							</p>
						</div>
						<Input type="number" {...props} bind:value={$formData.defaultDatabaseQuota} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="self-end">Update</Form.Button>
		</form>
	</div>
</div>
