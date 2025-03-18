<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Form from '$lib/components/ui/form/index.js';

	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	// import { userSchema } from '$lib/types/validate/user-schema';
	import * as Select from '$lib/components/ui/select/index.js';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { id, role, appQuota, dbQuota, data } = $props();

	const Role = {
		OWNER: 'OWNER',
		ADMIN: 'ADMIN',
		MEMBER: 'MEMBER'
	};
	const userSchema = z.object({
		role: z.nativeEnum(Role).default(role),
		applicationQuota: z
			.number()
			.int()
			.positive()
			.min(0)
			.default(appQuota as number),
		databaseQuota: z
			.number()
			.int()
			.positive()
			.min(0)
			.default(dbQuota as number)
	});

	let isOpen = $state(false);
	const token = $state(data.accessToken);

	const { form, errors, enhance } = superForm(defaults(zod(userSchema)), {
		SPA: true,
		validators: zod(userSchema),
		onUpdate({ form }) {
			console.log(form);
			if (form.valid) {
				try {
					const res = axios.put(
						`${PUBLIC_BASE_API}/dashboard/user/${id}`,
						{
							role: form.data.role,
							applicationQuota: form.data.applicationQuota,
							databaseQuota: form.data.databaseQuota
						},
						{
							headers: {
								authorization: `Bearer ${token}`
							}
						}
					);
					toast.promise(res, {
						loading: 'Loading...',
						success: () => {
							isOpen = false;
							goto(`/admin/Users`);
							return data.studentId + ' has been Edited';
						},
						error: (e: any) => {
							return e.message;
						}
					});
				} catch (e: any) {
					toast.error(e.message + '. Please try again');
				}
			}
		}
	});
</script>

<Dialog.Root
	open={isOpen}
	onOpenChange={(open) => {
		isOpen = open;
	}}
>
	<Dialog.Trigger>
		<Button variant="ghost">Edit User</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" use:enhance class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<div class="flex flex-col gap-2">
					<Label>Role</Label>
					<Select.Root type="single" bind:value={$form.role} name="role">
						<Select.Trigger class="w-full">{$form.role}</Select.Trigger>
						<Select.Content>
							<Select.Item value="OWNER">Owner</Select.Item>
							<Select.Item value="ADMIN">Admin</Select.Item>
							<Select.Item value="MEMBER">Member</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
				{#if $errors.role}<p class="text-destructive">
						{$errors.role[0]}
					</p>{/if}
			</div>
			<div class="flex flex-col gap-1">
				<div class="flex flex-col gap-2">
					<Label>Application Quota</Label>
					<Input
						type="number"
						name="applicationQuota"
						required={true}
						aria-invalid={$errors.applicationQuota ? 'true' : undefined}
						bind:value={$form.applicationQuota}
					/>
				</div>
				{#if $errors.applicationQuota}<p class="text-destructive">
						{$errors.applicationQuota[0]}
					</p>{/if}
			</div>
			<div class="flex flex-col gap-1">
				<div class="flex flex-col gap-2">
					<Label>Database Quota</Label>
					<Input
						type="number"
						name="databaseQuota"
						required={true}
						aria-invalid={$errors.databaseQuota ? 'true' : undefined}
						bind:value={$form.databaseQuota}
					/>
				</div>
				{#if $errors.databaseQuota}<p class="text-destructive">
						{$errors.databaseQuota[0]}
					</p>{/if}
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
