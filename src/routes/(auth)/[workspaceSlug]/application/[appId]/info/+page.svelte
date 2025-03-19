<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { RefreshCcw } from 'lucide-svelte';
	import { Hammer } from 'lucide-svelte';
	import { CirclePlay } from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Github } from 'lucide-svelte';
	import { GitBranch } from 'lucide-svelte';

	import type { PageData } from './$types';
	import axios from 'axios';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import { Globe } from 'lucide-svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { KeyRound } from 'lucide-svelte';

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
			img: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 12 12"><path fill="#ffcc95" fill-rule="evenodd" d="M6 12A6 6 0 1 1 6 0a6 6 0 0 1 0 12M3.324 4.643q0-.47.32-.953q.321-.483.935-.8t1.433-.317q.762 0 1.344.265q.584.265.9.72q.318.457.318.991q0 .422-.18.738q-.182.317-.431.548q-.25.23-.895.775a4 4 0 0 0-.287.27a1 1 0 0 0-.16.213c-.289.667-1.543.592-1.302-.342a1.8 1.8 0 0 1 .363-.535q.225-.23.609-.547q.335-.278.485-.419t.252-.314a.73.73 0 0 0 .103-.377a.85.85 0 0 0-.313-.669q-.312-.272-.806-.272q-.577 0-.85.275q-.273.274-.462.81q-.18.56-.677.56a.7.7 0 0 1-.496-.196q-.203-.195-.203-.424M6 9.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5"/></svg>'
		}
	];

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const deployApllication = () => {
		const req = axios.post(
			`${PUBLIC_BASE_API}/application/${data.appInfo.id}/deploy`,
			{},
			{
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${data.accessToken}`
				}
			}
		);
		toast.promise(req, {
			loading: 'Loading...',
			success: () => {
				invalidateAll();
				return data.appInfo.name + ' has been Deployed';
			},
			error: (e: any) => {
				return e.message;
			}
		});
	};

	let newInstallCommand = $state(data.appInfo.config.installCommand || '');
	let newBuildCommand = $state(data.appInfo.config.buildCommand || '');
	let newStartCommand = $state(data.appInfo.config.startCommand || '');
	let newPort = $state(data.appInfo.config.port || '');

	const buildCongfig = () => {
		const application = data.appInfo;
		const config = {
			...application.config,
			installCommand: newInstallCommand,
			buildCommand: newBuildCommand,
			startCommand: newStartCommand,
			port: newPort
		};
		const req = axios.put(
			`${PUBLIC_BASE_API}/application/${data.appInfo.id}`,
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
		toast.promise(req, {
			loading: 'Loading...',
			success: () => {
				invalidateAll();
				return data.appInfo.name + ' config has been updated';
			},
			error: (e: any) => {
				return e.message;
			}
		});
	};
</script>

<div class="my-4 flex flex-col space-y-5">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Production Deployment</h3>
	<div class="flex gap-3">
		<Button
			size="sm"
			onclick={() => {
				deployApllication();
			}}>Deploy</Button
		>
	</div>
	<Separator />
	{#if data.appInfo.buildPack != 'static'}
		<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Update config</h3>
		<div class="flex flex-col gap-3 px-10">
			<div class="flex flex-col gap-2">
				<Label class="text-muted-foreground" for="terms">Install command</Label>
				<Input class="" type="text" placeholder="install command" bind:value={newInstallCommand} />
			</div>
			<div class="flex flex-col gap-2">
				<Label class="text-muted-foreground" for="terms">Build command</Label>
				<Input class="" type="text" placeholder="build command" bind:value={newBuildCommand} />
			</div>
			<div class="flex flex-col gap-2">
				<Label class="text-muted-foreground" for="terms">Start command</Label>
				<Input class="" type="text" placeholder="start command" bind:value={newStartCommand} />
			</div>
			<div class="flex flex-col gap-2">
				<Label class="text-muted-foreground" for="terms">Port</Label>
				<Input class="" type="text" placeholder="port" bind:value={newPort} />
			</div>
			<Button
				size="sm"
				class="w-22 self-end my-2"
				onclick={() => {
					buildCongfig();
				}}>Update</Button
			>
		</div>
		<Separator />
	{/if}
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Application info</h3>
	<div class="grid grid-cols-2 gap-4">
		<div class="flex flex-col gap-2">
			<Label class="text-muted-foreground" for="terms">Deployment</Label>
			<div class="flex items-center gap-2">
				<Globe class="size-5" />
				<a href="http://{data.appInfo.url}.localhost" class="font-semibold hover:underline"
					>{data.appInfo.url}.localhost</a
				>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<Label class="text-muted-foreground" for="terms">Name</Label>
			<p class="font-semibold">{data.appInfo.name}</p>
		</div>
		<div class="flex flex-col gap-2">
			<Label class="text-muted-foreground" for="terms">Github</Label>
			<div class="flex items-center gap-2">
				<Github class="size-5" />
				<a href={data.appInfo.gitHub} class="font-semibold hover:underline">{data.appInfo.gitHub}</a
				>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<Label class="text-muted-foreground" for="terms">Souce</Label>
			<div class="flex items-center gap-2">
				<GitBranch class="size-5" />
				<p class="font-semibold">{data.appInfo.branch}</p>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<Label class="text-muted-foreground" for="terms">Stack</Label>
			{#each stacks as stack}
				{#if stack.value == data.appInfo.buildPack}
					<div class="flex items-center gap-2">
						{@html stack.img}
						<p class="font-semibold">{data.appInfo.buildPack}</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<!-- <div class="w-full overflow-x-auto">
		<p>config: {JSON.stringify(data.appInfo.config)}</p>
	</div> -->
</div>
