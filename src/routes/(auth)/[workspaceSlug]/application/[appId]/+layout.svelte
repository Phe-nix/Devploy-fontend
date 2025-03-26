<script lang="ts">
	// shadcn-svelte
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card/index.js';

	// import components
	import Status from '$lib/components/customs/applications/status.svelte';

	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { goto, invalidateAll } from '$app/navigation';
	import { PUBLIC_BASE_API } from '$env/static/public';

	let { data, children }: LayoutProps = $props();

	let status = $state(data.appInfo.status || '');
	let tailingURL = $state(page.url.pathname.split('/').pop());
	
	$effect(() => {
		tailingURL = page.url.pathname.split('/').pop();
	})

	$effect(() => {
		const statusLog = new WebSocket(`${PUBLIC_BASE_API}/application/${data.appInfo.id}/status`);
		statusLog.onmessage = (event) => {
			status = event.data;
		};
	});
</script>

<div>
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link
					class="hover:cursor-pointer hover:underline"
					onclick={() =>
						goto(`/${page.params.workspaceSlug}/applications`, {
							invalidateAll: true
						})}>Applications</Breadcrumb.Link
				>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Page>{data.appInfo.name}</Breadcrumb.Page>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<div class="py-4 flex justify-between items-center">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			{data.appInfo.name}
		</h2>
		<Status status={status} />
	</div>
</div>

<Tabs.Root bind:value={tailingURL} class="w-full py-6">
	<Tabs.List class="grid w-full grid-cols-4">
		<Tabs.Trigger
			value="info"
			onclick={() => {
				goto(`/${page.params.workspaceSlug}/application/${page.params.appId}/info`);
			}}>Info</Tabs.Trigger
		>
		<Tabs.Trigger
			value="logs"
			onclick={() => {
				goto(`/${page.params.workspaceSlug}/application/${page.params.appId}/logs`);
			}}>Logs</Tabs.Trigger
		>
		<Tabs.Trigger
			disabled={status != 'Deployed'}
			value="monitor"
			onclick={() => {
				goto(`/${page.params.workspaceSlug}/application/${page.params.appId}/monitor`);
			}}>Monitor</Tabs.Trigger
		>
		<Tabs.Trigger
			value="settings"
			onclick={() => {
				goto(`/${page.params.workspaceSlug}/application/${page.params.appId}/settings`);
			}}>Settings</Tabs.Trigger
		>
	</Tabs.List>
	{#if page.url.pathname.split('/').pop() == 'info'}	
	<Tabs.Content value="info">
		<Card.Root>
			<Card.Content>
				{@render children()}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	{:else if page.url.pathname.split('/').pop() == 'logs'}
	<Tabs.Content value="logs">
		<Card.Root>
			<Card.Content>
				{@render children()}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	{:else if page.url.pathname.split('/').pop() == 'monitor'}
	<Tabs.Content value="monitor">
		<Card.Root>
			<Card.Content>
				{@render children()}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	{:else if page.url.pathname.split('/').pop() == 'settings'}
	<Tabs.Content value="settings">
		<Card.Root>
			<Card.Content>
				{@render children()}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	{/if}
</Tabs.Root>
