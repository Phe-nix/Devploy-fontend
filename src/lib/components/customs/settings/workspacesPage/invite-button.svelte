<script lang="ts">
	import { PUBLIC_BASE_API } from '$env/static/public';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let email = $state();

	const invitation = async () => {
		let thisWorkspace = data.info.slug;
		const request = axios.post(
			`${PUBLIC_BASE_API}/workspace/${thisWorkspace}/invite`,
			{
				email: email
			},
			{
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${data.accessToken}`
				}
			}
		);
		toast.promise(request, {
			loading: 'Loading...',
			success: (data) => {
				return email + ' has been invited';
			},
			error: (e: any) => {
				return e.message
			},
		});
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}
		><span class="">Invite User</span></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<form
			onsubmit={() => {
				invitation();
			}}
		>
			<Dialog.Header>
				<Dialog.Title>Invite User</Dialog.Title>
				<Dialog.Description>Invite your friends. Click invite when you're done.</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="email" class="text-right">Email</Label>
					<Input bind:value={email} id="email" class="col-span-3" />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">invite</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
