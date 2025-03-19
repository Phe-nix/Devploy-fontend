<script lang="ts">
	// shadcn-svelte
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { toast } from 'svelte-sonner';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	// SVG Icons
	import { LoaderCircle } from 'lucide-svelte';
	import { GitBranch } from 'lucide-svelte';
	import { Github } from 'lucide-svelte';
	import { Info } from 'lucide-svelte';
	import { Plus } from 'lucide-svelte';
	import { Minus } from 'lucide-svelte';

	// import components
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
	let sources = data.source;
	let sourceSelected = $state(data.source[0]);
	let selectedRepo = $state({
		name: '',
		url: '',
		language: ''
	});
	let search = $state('');
	let searchField = $state('');
	let sourceState = $state<'repo' | 'branch' | 'config'>('repo');
	let applicationName = $state('');
	let repoBranch = $state('');
	let buildPack = $state('');

	let newInstallCommand = $state('npm install');
	let newBuildCommand = $state('npm run build');
	let newStartCommand = $state('node build/index.js');
	let newPort = $state('3000');

	let numEnv = $state(1);
	let newEnv = $state([{ key: '', value: '' }]);
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

	let checkStack = (repolang: String) => {
		if (repolang.toLowerCase() == 'javascript' || repolang.toLowerCase() == 'typescript') {
			buildPack = 'nodejs';
		} else if (repolang.toLowerCase() == 'python') {
			buildPack = 'python';
		} else {
			buildPack = 'static';
		}
	};

	const stacks = [
		{
			name: 'NodeJS',
			value: 'nodejs',
			img: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#242938" rx="60"/><path fill="#81cd39" d="M119.878 31.116c4.919-2.815 11.325-2.828 16.239 0c24.722 13.97 49.452 27.917 74.17 41.895c4.65 2.619 7.759 7.793 7.712 13.15v84.045c.035 5.579-3.382 10.877-8.287 13.436c-24.641 13.893-49.27 27.802-73.907 41.695c-5.019 2.87-11.554 2.649-16.418-.457c-7.387-4.282-14.787-8.544-22.175-12.822c-1.51-.9-3.212-1.616-4.278-3.08c.943-1.27 2.628-1.428 3.997-1.983c3.083-.981 5.916-2.555 8.748-4.082c.717-.49 1.591-.302 2.278.136c6.317 3.622 12.579 7.35 18.917 10.937c1.352.781 2.721-.256 3.877-.9c24.18-13.667 48.39-27.281 72.567-40.952c.896-.431 1.391-1.382 1.318-2.363c.017-27.725.004-55.454.009-83.18c.102-1.112-.542-2.136-1.549-2.592c-24.555-13.829-49.099-27.678-73.65-41.51a2.56 2.56 0 0 0-2.892-.005c-24.552 13.837-49.09 27.7-73.642 41.527c-1.003.457-1.676 1.464-1.557 2.58c.005 27.726 0 55.455 0 83.184a2.35 2.35 0 0 0 1.336 2.334c6.551 3.715 13.111 7.404 19.667 11.107c3.694 1.987 8.228 3.169 12.298 1.646c3.59-1.288 6.107-4.953 6.039-8.765c.034-27.563-.017-55.13.025-82.69c-.09-1.223 1.071-2.234 2.261-2.118c3.148-.022 6.3-.043 9.448.008c1.314-.03 2.218 1.288 2.056 2.52c-.013 27.738.034 55.476-.021 83.213c.008 7.393-3.029 15.437-9.867 19.054c-8.423 4.363-18.835 3.438-27.157-.746c-7.204-3.596-14.08-7.84-21.156-11.692c-4.918-2.545-8.318-7.864-8.283-13.439V86.161c-.052-5.468 3.182-10.736 7.975-13.317c24.637-13.903 49.27-27.818 73.902-41.728"/><path fill="#81cd39" d="M141.372 89.335c10.745-.692 22.248-.41 31.917 4.884c7.487 4.056 11.637 12.57 11.769 20.887c-.209 1.121-1.382 1.74-2.453 1.663c-3.117-.004-6.236.043-9.353-.021c-1.323.051-2.091-1.168-2.257-2.337c-.896-3.98-3.067-7.921-6.812-9.841c-5.75-2.878-12.416-2.733-18.686-2.673c-4.577.242-9.499.639-13.377 3.33c-2.977 2.039-3.881 6.155-2.819 9.47c1.002 2.38 3.749 3.148 5.998 3.856c12.949 3.387 26.671 3.049 39.373 7.506c5.259 1.817 10.403 5.35 12.203 10.856c2.355 7.38 1.323 16.2-3.928 22.124c-4.258 4.875-10.459 7.529-16.644 8.97c-8.228 1.835-16.767 1.882-25.123 1.067c-7.857-.896-16.034-2.96-22.099-8.313c-5.187-4.504-7.72-11.522-7.469-18.294c.06-1.144 1.199-1.942 2.295-1.848c3.139-.025 6.279-.034 9.418.005c1.255-.09 2.184.994 2.249 2.176c.578 3.791 2.003 7.771 5.31 10.018c6.38 4.117 14.387 3.835 21.693 3.95c6.053-.268 12.848-.349 17.787-4.35c2.606-2.282 3.378-6.1 2.674-9.384c-.763-2.773-3.664-4.065-6.155-4.91c-12.783-4.043-26.659-2.576-39.318-7.149c-5.14-1.816-10.11-5.25-12.084-10.53c-2.755-7.473-1.493-16.717 4.308-22.44c5.656-5.695 13.82-7.888 21.583-8.672"/></g></svg>`
		},
		{
			name: 'Python',
			value: 'python',
			img: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 128 128"><linearGradient id="deviconPython0" x1="70.252" x2="170.659" y1="1237.476" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5a9fd4"/><stop offset="1" stop-color="#306998"/></linearGradient><linearGradient id="deviconPython1" x1="209.474" x2="173.62" y1="1098.811" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd43b"/><stop offset="1" stop-color="#ffe873"/></linearGradient><path fill="url(#deviconPython0)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007c-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521c-2.268 9.405-2.368 15.275 0 25.096c1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837c-4.244-.706-8.645-1.027-12.866-1.008M50.037 9.557c2.55 0 4.634 2.117 4.634 4.721c0 2.593-2.083 4.69-4.634 4.69c-2.56 0-4.633-2.097-4.633-4.69c-.001-2.604 2.073-4.721 4.633-4.721" transform="translate(0 10.26)"/><path fill="url(#deviconPython1)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547c7.816 2.297 15.312 2.713 24.665 0c6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519c2.578-7.735 2.467-15.174 0-25.096c-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692c0 2.602-2.074 4.719-4.634 4.719c-2.55 0-4.633-2.117-4.633-4.719c0-2.595 2.083-4.692 4.633-4.692" transform="translate(0 10.26)"/><radialGradient id="deviconPython2" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b8b8b8" stop-opacity="0.498"/><stop offset="1" stop-color="#7f7f7f" stop-opacity="0"/></radialGradient><path fill="url(#deviconPython2)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416c-18.276 0-33.092-2.873-33.092-6.416s14.815-6.417 33.092-6.417c18.275 0 33.091 2.872 33.091 6.417" opacity="0.444"/></svg>`
		},
		{
			name: 'Static',
			value: 'static',
			img: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#fff" d="m16 2l5 5v14.008a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2zm-5 13v2h2v-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.5 3.5 0 0 0-3.433 2.813l1.962.393A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2z"/></svg>'
		}
	];

	const triggerContent = $derived(
		data.source.find((f: any) => f.name == sourceSelected.name).name ?? 'Select a GitHub'
	);

	const triggerStackImg = $derived(
		stacks.find((f: any) => f.value == buildPack)?.img ?? 'Select Built Packs'
	);

	const triggerStackName = $derived(stacks.find((f: any) => f.value == buildPack)?.name ?? '');
</script>

<div class="py-2 flex flex-col">
	<h2
		class="scroll-m-20 pb-2 text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Let build something new.
	</h2>
	<p class="text-muted-foreground text-sm">to deploy service</p>
</div>
<div class="py-4 w-full">
	<Card.Root>
		<Card.Header>
			{#if sourceState == 'repo'}
				<Card.Title>Select repository.</Card.Title>
				<Card.Description>Select your repository for deployment.</Card.Description>
			{:else if sourceState == 'branch'}
				<Card.Title>Select branch of repository.</Card.Title>
				<Card.Description>Branch of version that you want to deploy.</Card.Description>
			{/if}
		</Card.Header>
		<Card.Content class="py-10 flex flex-col items-center">
			{#if sourceState == 'repo'}
				<div class="w-1/2 flex flex-col gap-2">
					<div class="flex flex-col gap-2">
						<div class="flex items-center gap-2">
							<Select.Root type="single" bind:value={sourceSelected}>
								<Select.Trigger class="w-[180px] font-semibold">{triggerContent}</Select.Trigger>
								<Select.Content>
									{#each sources as source}
										<Select.Item value={source}>{source.name}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<Button
								href="https://github.com/apps/devploy-dev/installations/select_target"
								size="sm"
								class="shadow transition"
							>
								<Plus class="size-6" />
							</Button>
						</div>
						<div class="flex gap-2">
							<Input
								bind:value={searchField}
								type="text"
								placeholder="Search..."
								class="p-2 w-full rounded border shadow"
							/>
							<Button
								onclick={() => {
									search = searchField;
								}}
								class="p-2 shadow transition"
							>
								Search
							</Button>
						</div>
					</div>
					<div class="p-2 rounded border shadow divide-y h-96 overflow-y-auto space-y-2">
						{#await getRepos(sourceSelected, search)}
							<div class="flex gap-2 items-center justify-center">
								<LoaderCircle class="animate-spin" />
								<p>Loading...</p>
							</div>
						{:then repos}
							{#each repos as repo}
								<div
									class="flex items-center gap-2 border bg-card text-card-foreground shadow-sm rounded-sm p-2 relative"
								>
									<Avatar.Root class="m-1">
										<Avatar.Image src={`https://github.com/identicons/${repo.language}.png`} />
										<Avatar.Fallback>CN</Avatar.Fallback>
									</Avatar.Root>
									<h1>{repo.name}</h1>

									<Button
										onclick={() => {
											sourceState = 'branch';
											selectedRepo.name = repo.name;
											applicationName = repo.name;
											selectedRepo.url = repo.cloneUrl;
											selectedRepo.language = repo.language;
											checkStack(repo.language);
										}}
										class="absolute right-0 m-2 font-semibold">Import</Button
									>
								</div>
							{/each}
						{/await}
					</div>
				</div>
			{:else if sourceState == 'branch'}
				<div class="flex flex-col w-1/2 gap-2">
					<div class="flex gap-2 border rounded p-2 items-center w-fit">
						<GitBranch class="size-6" />
						{selectedRepo.name}
					</div>
					{#await getBranches(sourceSelected, selectedRepo)}
						<div class="flex gap-2 items-center justify-center my-6">
							<LoaderCircle class="animate-spin" />
							<p>Loading...</p>
						</div>
					{:then branches}
						{#each branches as branch}
							<div class="w-full flex justify-between items-center border rounded p-2 gap-2">
								<p class="p-1">{branch.name}</p>
								<Button
									class="text-xs"
									size="sm"
									onclick={() => {
										sourceState = 'config';
										repoBranch = branch.name;
									}}
								>
									Import
								</Button>
							</div>
						{/each}
					{/await}
				</div>
			{:else if sourceState == 'config'}
				<div class="flex flex-col w-full px-5 space-y-2">
					<form class="space-y-4 w-full">
						<div class="flex flex-col gap-1.5">
							<Label>Application name</Label>
							<Input type="text" placeholder="Project name" bind:value={applicationName} />
						</div>
						<div class="flex flex-col gap-1.5">
							<Label>Built Packs</Label>
							<Select.Root type="single" bind:value={buildPack}>
								<Select.Trigger class="">
									<div class="flex gap-x-2 items-center justify-start">
										{@html triggerStackImg}
										{triggerStackName}
									</div></Select.Trigger
								>
								<Select.Content>
									{#each stacks as stack}
										<Select.Item value={stack.value} label={stack.name}>
											<div class="flex items-center gap-x-2">
												{@html stack.img}
												{stack.name}
											</div>
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<Separator class="my-4" />
						<Accordion.Root type="multiple" class="disabled:text-muted-foreground">
							{#if buildPack != 'static'}
								<Accordion.Item disabled={buildPack != 'nodejs'} value="item-1">
									<Accordion.Trigger>Node config</Accordion.Trigger>
									<Accordion.Content>
										<div class="flex flex-col gap-3 px-10">
											<div class="flex flex-col gap-2">
												<div class="flex items-center gap-2">
													<Label class="text-muted-foreground" for="terms">Install command</Label>
													<Tooltip.Provider>
														<Tooltip.Root>
															<Tooltip.Trigger><Info class="size-3" /></Tooltip.Trigger>
															<Tooltip.Content>
																<p>
																	The command your frontend framework provides for compiling your
																	code.
																</p>
															</Tooltip.Content>
														</Tooltip.Root>
													</Tooltip.Provider>
												</div>
												<Input
													class=""
													type="text"
													placeholder="install command"
													bind:value={newInstallCommand}
												/>
											</div>
											<div class="flex flex-col gap-2">
												<div class="flex items-center gap-2">
													<Label class="text-muted-foreground" for="terms">Build command</Label>
													<Tooltip.Provider>
														<Tooltip.Root>
															<Tooltip.Trigger><Info class="size-3" /></Tooltip.Trigger>
															<Tooltip.Content>
																<p>The command your framework provides for build code.</p>
															</Tooltip.Content>
														</Tooltip.Root>
													</Tooltip.Provider>
												</div>
												<Input
													class=""
													type="text"
													placeholder="build command"
													bind:value={newBuildCommand}
												/>
											</div>
											<div class="flex flex-col gap-2">
												<div class="flex items-center gap-2">
													<Label class="text-muted-foreground" for="terms">Start command</Label>
													<Tooltip.Provider>
														<Tooltip.Root>
															<Tooltip.Trigger><Info class="size-3" /></Tooltip.Trigger>
															<Tooltip.Content>
																<p>The command run location file to run the project.</p>
															</Tooltip.Content>
														</Tooltip.Root>
													</Tooltip.Provider>
												</div>
												<Input
													class=""
													type="text"
													placeholder="start command"
													bind:value={newStartCommand}
												/>
											</div>
											<div class="flex flex-col gap-2">
												<div class="flex items-center gap-2">
													<Label class="text-muted-foreground" for="terms">Port</Label>
													<Tooltip.Provider>
														<Tooltip.Root>
															<Tooltip.Trigger><Info class="size-3" /></Tooltip.Trigger>
															<Tooltip.Content>
																<p>Ports you want to deploy this project.</p>
															</Tooltip.Content>
														</Tooltip.Root>
													</Tooltip.Provider>
												</div>
												<Input class="" type="text" placeholder="port" bind:value={newPort} />
											</div>
										</div>
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-2">
									<Accordion.Trigger>Environment Variables</Accordion.Trigger>
									<Accordion.Content>
										{#each Array(numEnv) as _, index}
											<div class="flex items-center gap-2 my-2 justify-center">
												<div class="flex flex-col gap-2 w-full">
													{#if index == 0}
														<Label>Key</Label>
													{/if}
													<Input
														type="text"
														placeholder="KEY_NAME"
														class=""
														bind:value={newEnv[index].key}
													/>
												</div>
												<div class="flex flex-col gap-2 w-full">
													{#if index == 0}
														<Label>Value</Label>
													{/if}
													<Input
														type="text"
														placeholder="IJ57994POSD"
														class=""
														bind:value={newEnv[index].value}
													/>
												</div>
												<Button
													class="self-end"
													onclick={() => {
														newEnv = newEnv.filter((_, i) => i !== index);
														numEnv -= 1;
													}}><Minus class="size-6" /></Button
												>
											</div>
										{/each}
										<Button
											size="sm"
											onclick={() => {
												newEnv = [...newEnv, { key: '', value: '' }];
												numEnv += 1;
											}}
											class="my-4 flex items-center"
										>
											<Plus class="size-6" />
											<p>Add More</p>
										</Button>
									</Accordion.Content>
								</Accordion.Item>
							{/if}
							<Accordion.Item value="item-3">
								<Accordion.Trigger>GitHub info</Accordion.Trigger>
								<Accordion.Content>
									<div class="flex flex-col gap-1.5">
										<div class="flex flex-col gap-1.5">
											<Label>Github Repository</Label>
											<Input
												type="text"
												disabled
												placeholder="Github Repo"
												value={selectedRepo.name}
											/>
										</div>
										<div class="flex flex-col gap-1.5">
											<Label>Branch name</Label>
											<Input
												type="text"
												disabled
												placeholder="Repository Branch"
												value={repoBranch}
											/>
										</div>
									</div>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
					</form>
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="flex justify-between">
			{#if sourceState == 'repo'}
				<Button
					onclick={() => {
						goto(`/${$page.params.workspaceSlug}/applications`);
					}}>Back</Button
				>
				<Button disabled class="hidden">Let Built</Button>
			{:else if sourceState == 'branch'}
				<Button
					onclick={() => {
						sourceState = 'repo';
					}}>Back</Button
				>
			{:else if sourceState == 'config'}
				<Button
					onclick={() => {
						sourceState = 'branch';
					}}>Back</Button
				>
				<Button
					onclick={async () => {
						try {
							const payload = {
								name: applicationName,
								github: selectedRepo.url,
								branch: repoBranch,
								buildPack,
								souceId: sourceSelected.installID
							};
							const req = await axios.post(
								`${PUBLIC_BASE_API}/workspace/${$page.params.workspaceSlug}/application`,
								payload,
								{
									headers: {
										'Content-Type': 'application/json',
										authorization: `Bearer ${data.accessToken}` // ต้องใช้ตัว A เป็นตัวใหญ่ "Authorization"
									}
								}
							);

							const app = req.data;

							let env: string[] = Object.entries(newEnv)
								.filter(([_, { key, value }]) => key.trim() !== '' && value.trim() !== '')
								.map(([_, { key, value }]) => `${key.trim()}=${value.trim()}`);

							const config = {
								...app.config,
								installCommand: newInstallCommand,
								buildCommand: newBuildCommand,
								startCommand: newStartCommand,
								port: newPort,
								config: env
							};

							const reqConfig = await axios.put(
								`${PUBLIC_BASE_API}/application/${app.applicationId}`,
								{
									config
								},
								{
									headers: {
										'Content-Type': 'application/json',
										authorization: `Bearer ${data.accessToken}`
									}
								}
							);

							toast.promise(Promise.all([req, reqConfig]), {
								loading: 'Loading...',
								success: (data) => {
									const res = data;
									const { applicationId } = res[0].data;
									goto(`/${$page.params.workspaceSlug}/application/${applicationId}/info`);
									return applicationName + ' has been Created';
								},
								error: (e: any) => {
									return e.message;
								}
							});
						} catch (e: any) {
							toast.error(e.message);
						}
					}}>Let Built</Button
				>
			{/if}
		</Card.Footer>
	</Card.Root>
</div>
