<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import VersionSwitcher from './version-switcher.svelte';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	// Menu items.
	const items = {
		version: ['0.1-beta'],
		main: [
			{
				title: "Introduction",
				url: '/docs/introduction',
			}
		]
	}
</script>

<Sidebar.Root class="mt-14" {...restProps} bind:ref>
	<Sidebar.Header>
		<VersionSwitcher versions={items.version} defaultVersion={items.version[0]} />
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>DevPloy</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items.main as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
