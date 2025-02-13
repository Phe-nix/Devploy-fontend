<script lang="ts">
	// shadcn-svelte
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button/index.js';

	// import components
	import Navbar from '$lib/components/customs/navbar/navbar.svelte';

	// import data
	import type { LayoutProps } from './$types';
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';

	let { data, children }: LayoutProps = $props();
</script>

<Navbar workspaces={data} />
<div class="max-w-sm w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto min-h-full">
	<div>
		<div class="flex justify-between items-center">
			<h2
				class="scroll-m-20 pb-2 text-2xl sm:text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				{$page.params.workspaceSlug}
			</h2>
		</div>
		<Tabs.Root value="app" class="w-full pt-6">
			<Tabs.List class="grid w-full grid-cols-3">
				<Tabs.Trigger value="app" onclick={() => { goto(`/${$page.params.workspaceSlug}/applications`)}}>Applications</Tabs.Trigger>
				<Tabs.Trigger value="database" onclick={() => { goto(`/${$page.params.workspaceSlug}/databases`)}}>Databases</Tabs.Trigger>
				<Tabs.Trigger value="setting" onclick={() => { goto(`/${$page.params.workspaceSlug}/settings`)}}>Setting</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="app">
				{@render children()}
			</Tabs.Content>
			<Tabs.Content value="database">
				{@render children()}
			</Tabs.Content>
			<Tabs.Content value="setting">
				{@render children()}
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
