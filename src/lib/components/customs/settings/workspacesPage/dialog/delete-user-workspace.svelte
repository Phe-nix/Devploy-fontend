<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button/index.js';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';

	let { permisstion, slug, role } = $props();
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
				goto(`/`, {
					invalidateAll: true
				});
				return slug + ' has been deleted';
			},
			error: (e: any) => {
				return e.message;
			}
		});
	};

	const leaveWorkspace = async () => {
		const req = axios.delete(`${PUBLIC_BASE_API}/workspace/${slug}/leave`, {
			headers: {
				authorization: `Bearer ${permisstion.accessToken}`
			}
		});
		toast.promise(req, {
			loading: 'Loading...',
			success: (data) => {
				invalidateAll();
				goto('/')
				return 'You have been leaved workspace';
			},
			error: (e: any) => {
				return e.message;
			}
		});
	};
</script>

{#if role == 'OWNER'}
	<AlertDialog.Root
		open={isOpen}
		onOpenChange={(open) => {
			isOpen = open;
		}}
	>
		<AlertDialog.Trigger>
			<Button variant="destructive" size="sm">
				<p>Delete</p>
			</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure to delete?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete your workspace.
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
{:else if role == 'MEMBER'}
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
				<AlertDialog.Title>Are you absolutely sure to leave?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will leave workspace.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action
					onclick={() => {
						isOpen = false;
						leaveWorkspace();
					}}>Continue</AlertDialog.Action
				>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
