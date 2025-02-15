<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Trash2 } from 'lucide-svelte';
	import EditUserWorkspace from './dialog/edit-user-workspace.svelte';
	// import AlertDeleteUser from './dialog-workspaces/alert-delete-user.svelte';
	// import AccpetInvite from './dialog-workspaces/accpet-invite.svelte';
	// import DeleteInvite from './dialog-workspaces/delete-invite.svelte';
	// import InviteUser from './invite-user.svelte';
</script>

<div class="space-y-12">
	<div class="flex flex-col space-y-4">
		<div class="flex flex-col space-y-2">
			<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">Workspaces</h4>
			<p class="text-muted-foreground text-sm">
				The workspace that are associated with your Devploy account.
			</p>
		</div>
		<div class="flex justify-between bg-card border-[1px] p-4 rounded-lg my-2 items-center">
			<div class="flex gap-3">
				<Avatar.Root>
					<Avatar.Image src="https://github.com/identicons/Phe-nix.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col">
					<p>Phe-nix</p>
					<p class="text-muted-foreground text-sm">Owner</p>
				</div>
			</div>
			<div class="flex space-x-4">
				<EditUserWorkspace />
				<!-- <AlertDeleteUser /> -->
			</div>
		</div>
	</div>
	<div class="flex flex-col space-y-4">
		<div class="flex items-center justify-between">
			<div class="flex flex-col space-y-2">
				<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">Invited</h4>
				<p class="text-muted-foreground text-sm">The workspace that have invite you.</p>
			</div>
			<!-- <InviteUser /> -->
		</div>
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
	</div>
</div>
