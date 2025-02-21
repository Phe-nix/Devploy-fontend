<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Trash2 } from 'lucide-svelte';
	import EditUserWorkspace from '$lib/components/customs/settings/workspacesPage/dialog/edit-user-workspace.svelte';
	import type { PageProps } from './$types';
	import DeleteUserWorkspace from '$lib/components/customs/settings/workspacesPage/dialog/delete-user-workspace.svelte';
	import InviteButton from '$lib/components/customs/settings/workspacesPage/invite-button.svelte';

	let { data }: PageProps = $props();
</script>

<div class="space-y-12">
	<div class="flex flex-col space-y-4">
		<div class="flex flex-col space-y-2">
			<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">Workspaces</h4>
			<p class="text-muted-foreground text-sm">
				The workspace that are associated with your Devploy account.
			</p>
		</div>
		{#each data.workspace as workspace}
			<div class="flex justify-between bg-card border-[1px] p-4 rounded-lg my-2 items-center">
				<div class="flex gap-3">
					<Avatar.Root>
						<Avatar.Image src="https://avatar.vercel.sh/${workspace.slug}.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex flex-col">
						<p class="font-semibold">{workspace.name}</p>
						<p class="text-muted-foreground text-sm">{workspace.permission[0].role}</p>
					</div>
				</div>
				{#if workspace == data.workspace[0]}
				<div class="space-x-4 hidden">
					<EditUserWorkspace workspace={data} data={workspace}/>
					<DeleteUserWorkspace permisstion={data} slug={workspace.slug}/>
				</div>
				{:else}
				<div class="flex space-x-4">
					<EditUserWorkspace workspace={data} data={workspace}/>
					<DeleteUserWorkspace permisstion={data} slug={workspace.slug}/>
				</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
