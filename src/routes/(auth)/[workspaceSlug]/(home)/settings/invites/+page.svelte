<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageProps } from './$types';
	import InviteButton from '$lib/components/customs/settings/workspacesPage/invite-button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	let { data }: PageProps = $props();

	let accpetInvite = (slug: string) => {
		let slugTo = slug;
		try {
			let req = axios.post(
				`${PUBLIC_BASE_API}/invite/${slugTo}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				}
			);
			toast.promise(req, {
				loading: 'Loading...',
				success: (data) => {
					invalidateAll();
					return 'Invite has been Accepted';
				},
				error: (e: any) => {
					return e.message;
				}
			});
		} catch (e: any) {
			toast.error('Something was wrong.');
		}
	};

	let deniesInvite = (slug: string) => {
		let slugTo = slug;
		try {
			let req = axios.delete(`${PUBLIC_BASE_API}/invite/${slugTo}`, {
				headers: {
					Authorization: `Bearer ${data.accessToken}`
				}
			});
			toast.promise(req, {
				loading: 'Loading...',
				success: (data) => {
					invalidateAll();
					return 'Invite has been Deleted';
				},
				error: (e: any) => {
					return e.message;
				}
			});
		} catch (e: any) {
			toast.error('Something was wrong.');
		}
	};
</script>

<div class="space-y-12">
	<div class="flex flex-col space-y-4">
		<div class="flex items-center justify-between">
			<div class="flex flex-col space-y-2">
				<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">Invited</h4>
				<p class="text-muted-foreground text-sm">The workspace that have invite you.</p>
			</div>
			<InviteButton {data} />
		</div>
		{#if data.invites.length > 0}
			{#each data.invites as invite}
				<div class="flex justify-between bg-card border-[1px] p-4 rounded-lg my-2 items-center">
					<div class="flex gap-3">
						<Avatar.Root>
							<Avatar.Image
								src="https://avatar.vercel.sh/${invite.Workspace.slug}.png"
								alt="@shadcn"
							/>
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
						<p>{invite.Workspace.name}</p>
					</div>
					<div class="flex space-x-4">
						<Button
							size="sm"
							onclick={() => {
								accpetInvite(invite.Workspace.slug);
							}}>Accpet</Button
						>
						<AlertDialog.Root>
							<AlertDialog.Trigger>
								<Button size="sm" variant="secondary">Denies</Button>
							</AlertDialog.Trigger>
							<AlertDialog.Content>
								<AlertDialog.Header>
									<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
									<AlertDialog.Description>
										This action cannot be undone. This will permanently delete invite
									</AlertDialog.Description>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
									<AlertDialog.Action
										onclick={() => {
											deniesInvite(invite.Workspace.slug);
										}}>Continue</AlertDialog.Action
									>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</div>
				</div>
			{/each}
		{:else}
			<div
				class="flex flex-col items-center justify-center space-y-2 h-[25em] xl:h-[34em] md:h-[28em]"
			>
				<div class="border bg-card text-card-foreground p-3 rounded-lg shadow-xl text-3xl">🥲</div>
				<div class="text-lg font-semibold">You don't have any Invite.</div>
				<p class="text-sm text-muted-foreground">
					I know it's that sound bad but wait a minues. Maybe your friend forgot to invite you.
				</p>
			</div>
		{/if}
	</div>
</div>
