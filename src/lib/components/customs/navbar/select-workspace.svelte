<script lang="ts">
	import { ChevronsUpDown } from 'lucide-svelte';
	import { Check } from 'lucide-svelte';
	import { CirclePlus } from 'lucide-svelte';

	import { onMount, tick } from 'svelte';
	import { cn } from '$lib/utils.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import { toast } from 'svelte-sonner';

	let { workspaces } = $props();
	let workspaceName = $state('');
	let WorkspaceSlug = $derived(
		workspaceName
			.toLowerCase()
			.replaceAll(' ', '-')
			.replace(/[^a-zA-Z0-9-_\.]/g, '')
	);
	let selectedWorkspace = $state($page.params.workspaceSlug);

	$effect(() => {
		goto(`/${selectedWorkspace}/applications`, {
			invalidateAll: true
		});
	});

	let reWorkspaceName = $state('');
	let reWorkspaceSlug = $derived(
		reWorkspaceName
			.toLowerCase()
			.replaceAll(' ', '-')
			.replace(/[^a-zA-Z0-9-_\.]/g, '')
	);

	const createWorkspace = async () => {
		const res = axios.post(
			`${PUBLIC_BASE_API}/workspace`,
			{
				name: workspaceName
			},
			{
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${workspaces.accessToken}`
				}
			}
		);
		toast.promise(res, {
			loading: 'Loading...',
			success: (data) => {
				selectedWorkspace = WorkspaceSlug;
				goto(`/${WorkspaceSlug}/applications`, {
					invalidateAll: true
				});
				showTeamDialog = false;
				return workspaceName + ' workspace' + ' has been created';
			},
			error: (e: any) => {
				return e.message;
			}
		});
	};

	let className: string | undefined | null = $state(undefined);
	export { className as class };

	const groups = [
		{
			label: 'Workspaces',
			workspaces: workspaces.workspace
		}
	];

	type Team = (typeof groups)[number]['workspaces'][number];

	let open = $state(false);
	let showTeamDialog = $state(false);
	const ids = { trigger: 'trigger-id' }; // Define the ids object with a trigger property

	let selectedTeam: Team = $state(groups[0].workspaces[0]);
	function closeAndRefocusTrigger(triggerId: string) {
		open = false;

		tick().then(() => document.getElementById(triggerId)?.focus());
	}
</script>

<Dialog.Root bind:open={showTeamDialog}>
	<Popover.Root bind:open>
		<Popover.Trigger>
			<Button
				variant="outline"
				role="combobox"
				aria-expanded={open}
				aria-label="Select a team"
				class={cn('md:w-[250px] justify-between w-[200px]', className)}
			>
				<Avatar.Root class="mr-2 h-5 w-5">
					<Avatar.Image
						src="https://avatar.vercel.sh/${selectedWorkspace}.png"
						alt={selectedWorkspace}
					/>
					<Avatar.Fallback>SC</Avatar.Fallback>
				</Avatar.Root>
				<p class="text-sm font-bold text-gray-400">
					{selectedWorkspace}
				</p>
				<ChevronsUpDown class="ml-auto h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0 outline-none">
			<Command.Root>
				<Command.Input class="outline-none" placeholder="Search workspaces..." />
				<Command.List>
					<Command.Empty>No Workspace found.</Command.Empty>
					{#each groups as group}
						<Command.Group heading={group.label}>
							{#each group.workspaces as team}
								<Command.Item
									onSelect={() => {
										selectedWorkspace = team.slug;
										selectedTeam = team;
										closeAndRefocusTrigger(ids.trigger);
									}}
									value={team.slug}
									class="text-sm"
								>
									<Avatar.Root class="mr-2 h-5 w-5">
										<Avatar.Image src="https://avatar.vercel.sh/${team.name}.png" alt={team.slug} />
										<Avatar.Fallback>SC</Avatar.Fallback>
									</Avatar.Root>
									{team.name}
									<Check
										class={cn(
											'ml-auto h-4 w-4',
											selectedTeam.slug !== team.slug && 'text-transparent'
										)}
									/>
								</Command.Item>
							{/each}
						</Command.Group>
					{/each}
				</Command.List>
				<Command.Separator />
				<Command.List>
					<Command.Group>
						<Command.Item
							onSelect={() => {
								open = false;
								showTeamDialog = true;
							}}
						>
							<CirclePlus class="mr-2 h-5 w-5" />
							Create Workspace
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create new workspace</Dialog.Title>
			<Dialog.Description>Add a new workspace to manage products and customers.</Dialog.Description>
		</Dialog.Header>
		<div>
			<div class="space-y-4 py-2 pb-4">
				<div class="space-y-2">
					<Label for="name">name</Label>
					<Input bind:value={workspaceName} id="name" placeholder="Acme Inc." />
				</div>
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (showTeamDialog = false)}>Cancel</Button>
			<Button type="submit" onclick={() => createWorkspace()}>Continue</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
