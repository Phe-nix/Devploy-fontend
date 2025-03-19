<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { member, data } = $props();
	
	onMount(() => {
		if (data.info == null) {
			goto('/');
		}
	});

	let isOpen = $state(false);

	const delteWorkspace = async () => {
		const req = axios.delete(`${PUBLIC_BASE_API}/workspace/${data.info.slug}/member`, {
			data: {
				email: member.email
			},
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			}
		});
		toast.promise(req, {
			loading: 'Loading...',
			success: (data) => {
				invalidateAll();
				return 'That user has been deleted';
			},
			error: (e: any) => {
				return e.message;
			}
		});
	};
</script>

<div>
	{#if member.email != data.userProfile.email && member.Permission != 'OWNER'}
		<AlertDialog.Root
			open={isOpen}
			onOpenChange={(open) => {
				isOpen = open;
			}}
		>
			<AlertDialog.Trigger>
				<Button variant="destructive" size="sm">
					<p>Kick</p>
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure to delete?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete your service.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action
						onclick={() => {
							isOpen = false;
							delteWorkspace();
						}}>Continue</AlertDialog.Action
					>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	{/if}
</div>
