<script lang="ts">
	// import shadcn-svelte
	import * as Card from '$lib/components/ui/card';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { cn } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	import type { LayoutProps } from './$types';
	import { goto } from '$app/navigation';

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
		},
		{
			title: 'Invites',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>`
		},
		{
			title: 'Members',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
		}
	]);

	let className: string | undefined | null = $state(undefined);
	export { className as class };
	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	let isActive: boolean = $state(true);
	let title: string = $state('');
	const active = (text: string) => {
		title = text;
		nowPageSide = text;
	};

	let { children }: LayoutProps = $props();
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
									goto(`/${$page.params.workspaceSlug}/settings/${item.title.toLowerCase()}`);
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
					{@render children()}
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
