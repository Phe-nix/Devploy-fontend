<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from '../$types';
	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
	let sourceSelected = $state(data.source[0]);
	let selectedRepo = $state({
		name: '',
		url: ''
	});
	let search = $state('');
	let searchField = $state('');
	let sourceState = $state<'repo' | 'branch' | 'config'>('repo');
	let applicationName = $state('');
	let repoBranch = $state('');
	let buildPack = $state('nodejs');

	$inspect(selectedRepo);

	const getRepos = async (source: any, search: string = '') => {
		if (!browser) return;
		const res = await fetch(
			`http://127.0.0.1:3000/source/${source.installID}/repos?search=${search}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${data.accessToken}`
				}
			}
		);
		if (res.ok) {
			const data = await res.json();
			return data;
		} else {
			const error = await res.json();
			throw new Error(error.message);
		}
	};

	const getBranches = async (source: any, repo: any) => {
		if (!browser) return;
		if (!source || !repo) {
			throw new Error('Source or repo not found');
		}
		console.log(source);
		const res = await fetch(
			`http://127.0.0.1:3000/source/${source.installID}/${repo.name}/branches`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${data.accessToken}`
				}
			}
		);
		if (res.ok) {
			const data = await res.json();
			return data;
		} else {
			const error = await res.json();
			throw new Error(error.message);
		}
	};
</script>

<main class="h-dvh w-full flex flex-col gap-2 items-center">
	<h1 class="text-4xl font-bold">DevPloy Playground</h1>
	<div class="h-0.5 w-10/12 bg-black"></div>
	<h1 class="text-2xl">Create Application</h1>
	<div class="p-2 rounded border shadow w-1/2 space-y-2">
		{#if sourceState === 'repo'}
			<div class="flex gap-2">
				<select class="p-2 rounded border shadow" bind:value={sourceSelected}>
					{#each data.source as source}
						<option value={source}>{source.name}</option>
					{/each}
				</select>
				<input
					type="text"
					class="p-2 w-full rounded border shadow"
					placeholder="Repo name"
					bind:value={searchField}
				/>
				<button
					class="bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white p-2 rounded border shadow transition"
					onclick={() => {
						search = searchField;
					}}>Search</button
				>
			</div>
			<div class="p-2 rounded border shadow divide-y h-96 overflow-y-auto space-y-2">
				{#await getRepos(sourceSelected, search)}
					<p>Loading...</p>
				{:then repos}
					{#each repos as repo}
						<div class="w-full flex justify-between items-center">
							<p class="p-1">{repo.name}</p>
							<button
								class="p-1 text-xs bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 text-white rounded"
								onclick={() => {
									sourceState = 'branch';
									selectedRepo.name = repo.name;
									applicationName = repo.name;
									selectedRepo.url = repo.cloneUrl;
								}}>Import</button
							>
						</div>
					{/each}
				{/await}
			</div>
		{:else if sourceState === 'branch'}
			<div class="flex flex-col gap-2">
				<button
					class="bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white p-2 rounded border shadow transition w-fit"
					onclick={() => {
						sourceState = 'repo';
					}}>Back</button
				>
				<div>
					<p>Selected Repo: {selectedRepo.name}</p>
					{#await getBranches(sourceSelected, selectedRepo)}
						<p>Loading...</p>
					{:then branches}
						{#each branches as branch}
							<div class="w-full flex justify-between items-center">
								<p class="p-1">{branch.name}</p>
								<button
									class="p-1 text-xs bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 text-white rounded"
									onclick={() => {
										sourceState = 'config';
										repoBranch = branch.name;
									}}>Import</button
								>
							</div>
						{/each}
					{/await}
				</div>
			</div>
		{:else if sourceState === 'config'}
			<div class="flex flex-col gap-2">
				<button
					class="bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white p-2 rounded border shadow transition w-fit"
					onclick={() => {
						sourceState = 'branch';
					}}>Back</button
				>
				<p>Applicaiton Name</p>
				<input
					type="text"
					class="p-2 w-full rounded border shadow"
					placeholder="Project Name"
					bind:value={applicationName}
				/>
				<p>Github Repo</p>
				<input
					type="text"
					class="p-2 w-full rounded border shadow"
					placeholder="Github Repo"
					value={selectedRepo.name}
					disabled
				/>
				<p>Branch</p>
				<input
					type="text"
					class="p-2 w-full rounded border shadow"
					placeholder="Repository Branch"
					value={repoBranch}
					disabled
				/>
				<p>Build Pack</p>
				<select name="" id="" class="p-2 w-full rounded border shadow" bind:value={buildPack}>
					<option value="nodejs">NodeJS</option>
					<option value="python">Python</option>
					<option value="static">Static</option>
				</select>
				<button
					class="bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white p-2 rounded border shadow transition w-full"
					onclick={async () => {
						const payload = {
							name: applicationName,
							github: selectedRepo.url,
							branch: repoBranch,
							buildPack,
							souceId: sourceSelected.installID
						};
						console.log(sourceSelected);
						const req = await fetch(`http://127.0.0.1:3000/workspace/${$page.params.workspaceSlug}/application`, {
							method: 'POST',
							headers: {
								Authorization: `Bearer ${data.accessToken}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(payload)
						});
						if (req.ok) {
							const res = await req.json();
							const {applicationId} = res;
							goto(`/${$page.params.workspaceSlug}/application/${applicationId}`);
						}
					}}>Create</button
				>
			</div>
		{/if}
	</div>
</main>
