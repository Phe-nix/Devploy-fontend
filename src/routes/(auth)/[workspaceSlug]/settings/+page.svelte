<script lang="ts">
	// import shadcn-svelte
	import * as Card from '$lib/components/ui/card';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	// import components
	import Sidebar from '$lib/components/ui/sidebar/sidebar.svelte';
	// import Profile from "$lib/components/custom/setting-user/page/profile.svelte";
	// import Appearance from "$lib/components/custom/setting-user/page/appearance.svelte";
	// import Users from "$lib/components/custom/setting-user/page/data-table-users/users.svelte";
	// import DockerSwarms from "$lib/components/custom/admin/cluster/docker-swarms.svelte";
	// import Workspaces from "$lib/components/custom/setting-user/page/workspaces.svelte";

	import { User } from 'lucide-svelte';

	let nowPageSide = $state('Profile');

	const sidebarNavItems = $state([
		{
			title: 'Profile',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-user"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>`
		},
		{
			title: 'Appearance',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`
		},
		{
			title: 'Workspaces',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-user"><path d="M15 13a3 3 0 1 0-6 0"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/></svg>`
		}
	]);

	let className: string | undefined | null = undefined;
	export { className as class };
	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	let isActive: boolean = true;
	let title: string = $state(nowPageSide);
	const active = (text: string) => {
		title = text;
		nowPageSide = text;
	};
</script>

<Card.Root>
	<Card.Content>
		<div class="space-y-6 p-10 pb-16">
			<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside class="-mx-4 lg:w-1/5">
					<div
						class={cn(
							'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 flex-wrap justify-center',
							className
						)}
					>
						{#each sidebarNavItems as item}
							<Button
								onclick={() => {
									active(item.title);
								}}
								variant="ghost"
								class={cn(
									!isActive && 'hover:underline',
									'relative justify-start hover:bg-transparent'
								)}
								data-sveltekit-noscroll
							>
								{#if isActive && title === item.title}
									<div
										class="bg-muted absolute inset-0 rounded-md"
										in:send={{ key: 'active-sidebar-tab' }}
										out:receive={{ key: 'active-sidebar-tab' }}
									></div>
								{/if}
								<div class="relative flex items-center gap-x-2 font-semibold text-base">
									{@html item.icon}
									<span class="hidden md:block">
										{item.title}
									</span>
								</div>
							</Button>
						{/each}
					</div>
				</aside>
				<div class="flex-1 lg:max-w-4xl md:max-w-xl">
					{#if nowPageSide === 'Profile'}
						<!-- <Profile /> -->
					{:else if nowPageSide === 'Appearance'}
						<!-- <Appearance /> -->
					{:else if nowPageSide === 'Workspaces'}
						<!-- <Workspaces /> -->
					{/if}
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
