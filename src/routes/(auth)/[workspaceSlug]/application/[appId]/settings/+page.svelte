<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';

	import { Input } from '$lib/components/ui/input/index.js';
	import { PUBLIC_BASE_API } from '$env/static/public';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import DeleteApp from '$lib/components/customs/applications/delete-app.svelte';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	let appName = $state(data.appInfo.name);
	let newURL = $state(data.appInfo.url);

</script>

<main class="my-4 flex flex-col space-y-5">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Application Settings</h3>
	<section class="py-5 flex flex-col border rounded p-4 my-4">
		<div class="flex flex-col gap-y-4">
			<div class="flex flex-col gap-1">
				<Label class="scroll-m-20 text-xl font-semibold tracking-tight">Application Name</Label>
				<p class="text-muted-foreground text-sm">Used to identify your Application</p>
			</div>
			<Input placeholder="application name" class="max-w-xs" bind:value={appName} />
		</div>
		<Button
			disabled={appName == data.appInfo.name}
			class="w-16 self-end"
			size="sm"
			onclick={() => {
				const req = axios.put(
					`${PUBLIC_BASE_API}/application/${data.appInfo.id}`,
					{
						name: appName
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
						return 'Application rename successful.';
					},
					error: (e: any) => {
						return e.message;
					}
				});
			}}>Save</Button
		>
	</section>
	<section class="py-5 flex flex-col border rounded p-4 my-4">
		<div class="flex flex-col gap-y-4">
			<div class="flex flex-col gap-1">
				<Label class="scroll-m-20 text-xl font-semibold tracking-tight">URL</Label>
				<p class="text-muted-foreground text-sm">
					Used to identify your Application URL of your Deployments.
				</p>
			</div>
			<Input placeholder="application name" class="max-w-xs" bind:value={newURL} />
		</div>
		<Button
			disabled={newURL == data.appInfo.url}
			class="w-16 self-end"
			size="sm"
			onclick={() => {
				const req = axios.post(
					`${PUBLIC_BASE_API}/application/${data.appInfo.id}/url`,
					{
						url: newURL
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
						return 'URL application have been changed.';
					},
					error: (e: any) => {
						return e.message;
					}
				});
			}}>Save</Button
		>
	</section>
	<section
		class="flex flex-col border rounded dark:border-[hsla(357,55%,26%,1)] border-red-300 my-4"
	>
		<div class="flex flex-col gap-y-4 px-4 py-8">
			<div class="flex flex-col gap-1">
				<Label class="scroll-m-20 text-xl font-semibold tracking-tight">Delete Application</Label>
				<p class="text-muted-foreground text-sm">
					The application will be permanently deleted, This action is irreversible and can not be
					undone.
				</p>
			</div>
		</div>
		<div
			class="border-t p-4 dark:border-[hsla(357,55%,26%,1)] border-red-300 bg-red-100 dark:bg-[hsla(357,37%,12%)] flex justify-end"
		>
			<DeleteApp {data}/>
		</div>
	</section>
</main>
