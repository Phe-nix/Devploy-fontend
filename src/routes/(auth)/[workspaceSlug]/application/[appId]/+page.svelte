<script lang="ts">
	// shadcn-svelte
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card/index.js';

	// import components
	import Status from '$lib/components/customs/applications/status.svelte';

	import type { PageData } from './$types';
	import { page } from '$app/stores';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
</script>

<div>
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/{$page.params.workspaceSlug}/applications">Applications</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Page>{data.appInfo.name}</Breadcrumb.Page>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<div class="py-4 flex justify-between items-center">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			{data.appInfo.name}
		</h2>
		<Status status={data.appInfo.status} />
	</div>
</div>

<Tabs.Root value="general" class="w-full py-6">
	<Tabs.List class="grid w-full grid-cols-4">
		<Tabs.Trigger value="general">Info</Tabs.Trigger>
		<Tabs.Trigger value="logs">Logs</Tabs.Trigger>
		<Tabs.Trigger value="monitor">Monitor</Tabs.Trigger>
		<Tabs.Trigger value="domain">Domains</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="general">
		<Card.Root>
			<Card.Content>
				<!-- <GeneralDetail /> -->
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="logs">
		<Card.Root>
			<Card.Content>
				<!-- <Logs /> -->
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="monitor">
		<Card.Root>
			<Card.Content>
				<!-- <Monitor /> -->
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="domain">
		<Card.Root>
			<Card.Content>
				<!-- <Domain /> -->
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
