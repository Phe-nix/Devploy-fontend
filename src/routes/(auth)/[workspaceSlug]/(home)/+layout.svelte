<script lang="ts">
	// shadcn-svelte
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button/index.js';

	// import components
	import { Plus } from 'lucide-svelte';

	// import data
	import type { LayoutProps } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	const tabs = [
		{
			title: 'applications',
			value: 'app'
		},
		{
			title: 'databases',
			value: 'database'
		},
		{
			title: 'settings',
			value: 'setting'
		}
	];

	let { children }: LayoutProps = $props();
</script>

<div>
	<div class="flex justify-between items-center">
		<h2
			class="scroll-m-20 pb-2 text-2xl sm:text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			{page.params.workspaceSlug}
		</h2>
		{#if page.url.pathname == '/' + page.params.workspaceSlug + '/applications' || page.url.pathname == '/' + page.params.workspaceSlug + '/applications/'}
			<Button
				size="sm"
				onclick={() => {
					goto(`/${page.params.workspaceSlug}/new/application`, { invalidateAll: true });
				}}
			>
				<Plus class="size-6" />
				<p class="">Deploy Applications</p>
			</Button>
		{:else if page.url.pathname == '/' + page.params.workspaceSlug + '/databases' || page.url.pathname == '/' + page.params.workspaceSlug + '/databases/'}
			<Button
				size="sm"
				onclick={() => {
					goto(`/${page.params.workspaceSlug}/new/database`, { invalidateAll: true });
				}}
			>
				<Plus class="size-6" />
				<p class="">Deploy Database</p>
			</Button>
		{/if}
	</div>
	<Tabs.Root value="app" class="w-full pt-6">
		<Tabs.List class="grid w-full grid-cols-3">
			<Tabs.Trigger
				value="app"
				onclick={() => {
					goto(`/${page.params.workspaceSlug}/applications`);
				}}>Applications</Tabs.Trigger
			>
			<Tabs.Trigger
				value="database"
				onclick={() => {
					goto(`/${page.params.workspaceSlug}/databases`);
				}}>Databases</Tabs.Trigger
			>
			<Tabs.Trigger
				value="setting"
				onclick={() => {
					goto(`/${page.params.workspaceSlug}/settings/profile`);
				}}>Setting</Tabs.Trigger
			>
		</Tabs.List>
		{#each tabs as item}
			<Tabs.Content value={item.value}>
				{@render children()}
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</div>
