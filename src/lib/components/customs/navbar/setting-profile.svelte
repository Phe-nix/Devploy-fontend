<script lang="ts">
	//import shadcn-svelte
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';

	// import SVG
	import { LogOut } from 'lucide-svelte';
	import { UserRound } from 'lucide-svelte';
	import { Settings } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import type { ActionData } from '../../../../routes/(auth)/[workspaceSlug]/$types';

	const { userProfile } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost">
			<Avatar.Root>
				<Avatar.Image src={userProfile.picture} alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<form action="">
		<DropdownMenu.Content align="start" class="w-56 ">
			<DropdownMenu.Label class="text-lg"
				>{userProfile.firstName} {userProfile.lastName}</DropdownMenu.Label
			>
			<DropdownMenu.Separator />
			<DropdownMenu.Item class="flex flex-row gap-x-2 cursor-pointer">
				<Settings class="text-primary" />
				Settings
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<form>
					<button type="submit" formaction="?/logout" class="text-destructive font-bold flex flex-row gap-x-2 cursor-pointer">
						<LogOut />
						Sign out
					</button>
				</form>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</form>
</DropdownMenu.Root>
