<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button/index.js';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';

	let { permisstion, slug } = $props();
	let isOpen = $state(false);

	const delteWorkspace = async () => {
		const res = axios.delete(`${PUBLIC_BASE_API}/workspace/${slug}`, {
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${permisstion.accessToken}`
			}
		});
		toast.promise(res, {
			loading: 'Loading...',
			success: (data) => {
				goto(`/${$page.params.workspaceSlug}/settings/workspaces`, {
					invalidateAll: true
				});
				return slug + ' has been deleted';
			},
			error: (e: any) => {
				return e.message;
			}
		});
	};
</script>

<AlertDialog.Root
	open={isOpen}
	onOpenChange={(open) => {
		isOpen = open;
	}}
>
	<AlertDialog.Trigger>
		<Button variant="destructive" size="sm">
			<p>Leave</p>
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
