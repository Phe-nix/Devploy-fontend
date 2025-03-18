<script lang="ts">
	import { Ellipsis } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import EditUser from './actions/edit-user.svelte';

	let {
		id,
		role,
		appQuota,
		dbQuota,
        data
	}: { id: string; role: 'MEMBER' | 'ADMIN' | 'OWNER'; appQuota: number; dbQuota: number; data: any } =
		$props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<div class="flex flex-col items-center">
			<EditUser {id} {role} {appQuota} {dbQuota} {data} />
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
