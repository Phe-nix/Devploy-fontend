<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
	console.log(data);
	let workspaceName = $state('');
	let WorkspaceSlug = $derived(
		workspaceName
			.toLowerCase()
			.replaceAll(' ', '-')
			.replace(/[^a-zA-Z0-9-_\.]/g, '')
	);
	let selectedWorkspace = $state($page.params.workspaceSlug);
	$effect(() => {
		goto(`/${selectedWorkspace}/`, {
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
	let email = $state('');

	const createWorkspace = async () => {
		const res = await fetch('http://127.0.0.1:3000/workspace', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			},
			body: JSON.stringify({
				name: workspaceName
			})
		});
		if (res.ok) {
			goto(`/${WorkspaceSlug}`, {
				invalidateAll: true
			});
			selectedWorkspace = WorkspaceSlug;
		}
	};

	const renameWorkspace = async () => {
		const res = await fetch(`http://127.0.0.1:3000/workspace/${selectedWorkspace}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			},
			body: JSON.stringify({
				name: reWorkspaceName
			})
		});
		if (res.ok) {
			goto(`/${reWorkspaceSlug}`, {
				invalidateAll: true
			});
			selectedWorkspace = reWorkspaceSlug;
		}
	};

	const deleteWorkspace = async () => {
		const res = await fetch(`http://127.0.0.1:3000/workspace/${selectedWorkspace}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			}
		});
		if (res.ok) {
			goto(`/`, {
				invalidateAll: true
			});
		}
	};

	const sentInvite = async () => {
		const res = await fetch(`http://127.0.0.1:3000/workspace/${selectedWorkspace}/invite`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			},
			body: JSON.stringify({
				email
			})
		});
		if (res.ok) {
			console.log('sent');
			invalidateAll();
		}
	};

	const deleteInvite = async (email: string) => {
		const res = await fetch(`http://127.0.0.1:3000/workspace/${selectedWorkspace}/invite`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			},
			body: JSON.stringify({
				email
			})
		});
		if (res.ok) {
			console.log('deleted');
			invalidateAll();
		}
	};

	const removeMember = async (email: string) => {
		const res = await fetch(`http://127.0.0.1:3000/workspace/${selectedWorkspace}/member`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			},
			body: JSON.stringify({
				email
			})
		});
		if (res.ok) {
			console.log('deleted');
			invalidateAll();
		}
	};
</script>

<main class="h-dvh w-full flex flex-col gap-2 items-center">
	<h1 class="text-4xl font-bold">DevPloy Playground</h1>
	<div class="h-0.5 w-10/12 bg-black"></div>
	<h1 class="text-2xl">Select Workspace</h1>
	<select class="p-2 rounded border shadow" bind:value={selectedWorkspace}>
		{#each data.workspace as workspace}
			<option value={workspace.slug}>{workspace.name}</option>
		{/each}
	</select>
	<div class="h-0.5 w-10/12 bg-black"></div>
	<h1 class="text-2xl">Info</h1>
	<p class="text-slate-400">Name : {data.info.name}</p>
	<p class="text-slate-400">Slug : {data.info.slug}</p>
	<div class="w-10/12 grid grid-cols-4 divide-x divide-black">
		<div class="w-full flex flex-col items-center gap-1">
			<div class="flex justify-between w-full px-2">
				<p class="font-bold">App</p>
				<button
					class="p-0.5 text-xs rounded border shadow text-white bg-green-500 hover:bg-green-600 active:bg-green-700"
					onclick={() => {
						goto(`/${selectedWorkspace}/new/application`);
					}}>Create</button
				>
			</div>
			{#each data.info.Appication as application}
				<button class="text-start hover:bg-slate-100 active:bg-slate-200 w-full p-1 rounded" onclick={() => {
					goto(`/${selectedWorkspace}/application/${application.id}`);
				}}>
					{application.name}
				</button>
			{/each}
		</div>
		<div class="w-full flex flex-col items-center">
			<p class="font-bold">DB</p>
		</div>
		<div class="w-full flex flex-col items-center">
			<p class="font-bold">Members</p>
			<div class="space-y-1 w-full px-1">
				{#each data.info.Members as member}
					<div class="w-full flex justify-between">
						<p>{member.email}</p>
						<button
							class="p-0.5 text-xs rounded border shadow text-white bg-red-500 hover:bg-red-600 active:bg-red-700"
							onclick={() => {
								removeMember(member.email);
							}}>Delete</button
						>
					</div>
				{/each}
			</div>
		</div>
		<div class="w-full flex flex-col items-center">
			<p class="font-bold">Invite</p>
			{#each data.info.Invite as invite}
				<div class="w-full flex items-center justify-between px-2">
					<p>{invite.email}</p>
					<button
						class=" p-0.5 text-xs rounded border shadow text-white bg-red-500 hover:bg-red-600 active:bg-red-700"
						onclick={() => {
							deleteInvite(invite.email);
						}}>Delete</button
					>
				</div>
			{/each}
		</div>
	</div>

	<div class="h-0.5 w-10/12 bg-black"></div>
	<h1 class="text-2xl">Create Workspace</h1>
	<input type="text" class="p-2 rounded border shadow" bind:value={workspaceName} />
	<p class="text-slate-400">Slug : {WorkspaceSlug}</p>
	<button
		class="px-4 py-2 rounded border shadow hover:bg-slate-50 active:bg-slate-100"
		onclick={() => {
			createWorkspace();
		}}>New Workspace</button
	>
	<div class="h-0.5 w-10/12 bg-black"></div>
	<h1 class="text-2xl">Rename Workspace</h1>
	<input type="text" class="p-2 rounded border shadow" bind:value={reWorkspaceName} />
	<p class="text-slate-400">Slug : {reWorkspaceSlug}</p>
	<button
		class="px-4 py-2 rounded border shadow hover:bg-slate-50 active:bg-slate-100"
		onclick={() => {
			renameWorkspace();
		}}>Rename Workspace</button
	>
	<div class="h-0.5 w-10/12 bg-black"></div>
	<h1 class="text-2xl">Delete This Workspace</h1>
	<button
		class="px-4 py-2 rounded border shadow text-white bg-red-500 hover:bg-red-600 active:bg-red-700"
		onclick={() => {
			deleteWorkspace();
		}}>Delete {selectedWorkspace}</button
	>
	<div class="h-0.5 w-10/12 bg-black"></div>
	<h1 class="text-2xl">Sent Invite User</h1>
	<div class="flex gap-2">
		<input type="email" class="p-2 rounded border shadow" placeholder="Email" bind:value={email} />
		<button
			class="px-4 py-2 rounded border shadow text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
			onclick={() => {
				sentInvite();
			}}>Sent</button
		>
	</div>
</main>
