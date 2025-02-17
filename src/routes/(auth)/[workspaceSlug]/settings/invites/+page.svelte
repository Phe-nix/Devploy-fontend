<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import EditUserWorkspace from '$lib/components/customs/settings/workspacesPage/dialog/edit-user-workspace.svelte';
	import type { PageProps } from './$types';
	import DeleteUserWorkspace from '$lib/components/customs/settings/workspacesPage/dialog/delete-user-workspace.svelte';
	// import AccpetInvite from './dialog-workspaces/accpet-invite.svelte';
	// import DeleteInvite from './dialog-workspaces/delete-invite.svelte';
	import InviteButton from '$lib/components/customs/settings/workspacesPage/invite-button.svelte';

    let { data } :PageProps = $props();
</script>

<div class="space-y-12">
	<div class="flex flex-col space-y-4">
		<div class="flex items-center justify-between">
			<div class="flex flex-col space-y-2">
				<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">Invited</h4>
				<p class="text-muted-foreground text-sm">The workspace that have invite you.</p>
			</div>
			<InviteButton data={data}/>
		</div>
        {#if  data.info.Invite != 0}
		<div class="flex justify-between bg-card border-[1px] p-4 rounded-lg my-2 items-center">
			<div class="flex gap-3">
				<Avatar.Root>
					<Avatar.Image src="https://github.com/identicons/T0NG.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col">
					<p>T0NG</p>
					<p class="text-muted-foreground text-sm">@64070011</p>
				</div>
			</div>
			<div class="flex space-x-4">
				<!-- <AccpetInvite />
				<DeleteInvite /> -->
			</div>
		</div>
        {:else}
        <div class="flex flex-col items-center justify-center space-y-2 h-[25em] xl:h-[34em] md:h-[28em]">
            <div class="border bg-card text-card-foreground p-3 rounded-lg shadow-xl text-3xl">
                🥲
            </div>
            <div class="text-lg font-semibold">You don't have any Invite.</div>
            <p class="text-sm text-muted-foreground">I know it's that sound bad but wait a minues. Maybe your friend forgot to invite you.</p>
        </div>
        {/if}
	</div>
</div>