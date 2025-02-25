<script lang="ts">
	//import shadcn-svelte
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	// import SVG
	import { LogOut } from 'lucide-svelte';
	import { Settings } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	const { userProfile } = $props();
	let isopen = $state(false);
</script>

<AlertDialog.Root
	open={isopen}
	onOpenChange={(open) => {
		isopen = open;
	}}
>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="ghost">
				<Avatar.Root>
					<Avatar.Image src={userProfile.picture} alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		</DropdownMenu.Trigger>
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
				<AlertDialog.Trigger>
					<button class="text-destructive font-bold flex flex-row gap-x-2 cursor-pointer">
						<LogOut />
						Sign out
					</button>
				</AlertDialog.Trigger>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure to Logout?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently logout your account.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Nope</AlertDialog.Cancel>
			<AlertDialog.Action
				onclick={async () => {
					let LogOut = new Promise<void>((resolve) => {
						location.href = '/logout';
						resolve();
					});

					toast.promise(LogOut, {
						loading: 'Loading...',
						success: () => {
							return 'Account has been Logouted';
						},
						error: (e: any) => {
							return e.message;
						}
					});
				}}>Yes</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
