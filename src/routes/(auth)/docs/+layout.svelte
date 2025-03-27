<script lang="ts">
	import DocsSidebar from '$lib/components/customs/docs/docs-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { page } from '$app/state';
	import Navbar from '$lib/components/customs/navbar/navbar.svelte';
	import type { LayoutProps } from '../$types';
	import DocNavbar from '$lib/components/customs/navbar/doc-navbar.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<DocNavbar />
<Sidebar.Provider class="">
	<DocsSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Docs</Breadcrumb.Page>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item>
						<Breadcrumb.Page>{page.url.pathname.split('/').pop()}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex flex-1 flex-col gap-4 md:px-32 px-12 py-8">
			<div class="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
				{@render children?.()}
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
