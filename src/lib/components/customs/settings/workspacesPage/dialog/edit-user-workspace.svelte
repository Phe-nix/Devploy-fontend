<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	import { PackageSearch } from 'lucide-svelte';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { data, workspace, role } = $props();
	let isOpen = $state(false);
	let name = $state(data.name);
	const changeNameWorkspace = async () => {
		const res = axios.put(
			`${PUBLIC_BASE_API}/workspace/${data.slug}`,
			{
				name: name
			},
			{
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${workspace.accessToken}`
				}
			}
		);
		toast.promise(res, {
			loading: 'Loading...',
			success: (data) => {
				goto(`/${$page.params.workspaceSlug}/settings/workspaces`, {
					invalidateAll: true
				});
				return name + ' has been updated';
			},
			error: (e: any) => {
				return e.message;
			}
		});
	};
</script>

{#if role == 'OWNER'}
	<Dialog.Root
		open={isOpen}
		onOpenChange={(open) => {
			isOpen = open;
		}}
	>
		<Dialog.Trigger>
			<Button size="sm" class="">
				<p>Edit</p>
			</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Edit <span class="italic">{name}</span></Dialog.Title>
				<Dialog.Description>
					Make changes to your service here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<form
				onsubmit={() => {
					changeNameWorkspace();
					isOpen = false;
				}}
			>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="name" class="text-right">Name</Label>
						<Input id="name" bind:value={name} class="col-span-3" />
					</div>
				</div>
				<Dialog.Footer>
					<Button type="submit">Save changes</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
{/if}
