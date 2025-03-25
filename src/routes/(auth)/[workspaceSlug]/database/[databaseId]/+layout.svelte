<script lang="ts">
	// shadcn-svelte
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card/index.js';

	// import components
	import Status from '$lib/components/customs/applications/status.svelte';

	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { data, children }: LayoutProps = $props();
	let tailingURL = $state(page.url.pathname.split('/').pop());
</script>

<div>
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link
					class="hover:cursor-pointer hover:underline"
					onclick={() =>
						goto(`/${page.params.workspaceSlug}/databases`, {
							invalidateAll: true
						})}>Databases</Breadcrumb.Link
				>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Page>{data.databaseInfo.name}</Breadcrumb.Page>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<div class="py-4 flex justify-between items-center">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			{data.databaseInfo.name}
		</h2>
		<Status status={data.databaseInfo.status} />
	</div>
</div>

<Tabs.Root bind:value={tailingURL} class="w-full py-6">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger
			value="info"
			onclick={() => {
				goto(`/${page.params.workspaceSlug}/database/${page.params.databaseId}/info`);
			}}>Info</Tabs.Trigger
		>
		<Tabs.Trigger
			value="settings"
			onclick={() => {
				goto(`/${page.params.workspaceSlug}/database/${page.params.databaseId}/settings`);
			}}>Settings</Tabs.Trigger
		>
	</Tabs.List>
	<Tabs.Content value="info">
		<Card.Root>
			<Card.Content>
				{@render children()}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="settings">
		<Card.Root>
			<Card.Content>
				{@render children()}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
