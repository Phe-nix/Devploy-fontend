<script lang="ts">
    // import components
    import SelectWorkspace from './select-workspace.svelte';
    import SettingProfile from './setting-profile.svelte';
    import DarkLightMode from '../dark-light-mode/dark-light-mode.svelte';
	import { page } from '$app/stores';

	// import shadcn-svelte
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';

	// icon
	import { Menu } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	// import icon_light from '$lib/assets/icon/light_iron.png';
	// import icon_black from '$lib/assets/icon/black_icon.png';

    //PropData data
    let { workspaces } = $props()
</script>

<div class="max-sm:hidden w-full py-2 mb-6 px-10 border-b bg-card text-card-foreground shadow-sm sticky top-0 z-50">
	<div class="flex flex-row justify-between">
		<div class="flex flex-row items-center space-x-10">
			<a href="/{$page.params.workspaceSlug}/applications" class="text-2xl font-bold hidden dark:block">
				<!-- <img src={icon_light} class="size-10" alt="LOGO" /> -->
                 LOGO
			</a>
			<a href="/{$page.params.workspaceSlug}/applications" class="text-2xl font-bold block dark:hidden">
                 LOGO
			</a>
			<Button variant="ghost" class="text-sm font-medium text-muted-foreground">Docs</Button>
			<Button
				variant="ghost"
				class="text-sm font-medium text-muted-foreground">Server</Button
			>
		</div>
		<div class="flex flex-row items-center space-x-5">
			<SelectWorkspace {workspaces}/>
			<SettingProfile userProfile={workspaces.userProfile}/>
			<DarkLightMode />
		</div>
	</div>
</div>

<!--Reponsive-->
<div class="sm:hidden w-screen py-2 mb-6 border-b bg-card text-card-foreground shadow-sm">
	<div class="flex flex-row items-center mx-2 justify-between">
		<div class="flex flex-row items-center space-x-4">
			<Sheet.Root>
				<Sheet.Trigger>
					<Menu />
				</Sheet.Trigger>
				<Sheet.Content side="left">
					<div class="flex flex-col z-50 gap-2 p-2 inset-y-0 left-0 h-full w-3/4 sm:max-w-sm pr-0">
						<a href="/{$page.params.workspaceSlug}/applications" class="text-foreground/60 items-center hidden dark:block">
							<!-- <img src={icon_light} class="size-10" alt="LOGO" /> -->
                             LOGO
						</a>
						<a href="/{$page.params.workspaceSlug}/applications" class="text-foreground/60 items-center block dark:hidden">
							<!-- <img src={icon_black} class="size-10" alt="LOGO" /> -->
                             LOGO
						</a>
						<div
							class="relative overflow-hidden my-4 h-[calc(100vh-8rem)] pb-10 pl-6 flex flex-col space-y-5"
							data-scroll-area-root
							style="overflow: hidden;"
						>
							<a href="/home/applications" class="font-semibold">Docs</a>
							<a href="/admin" class="font-semibold">Server</a>
						</div>
					</div>
				</Sheet.Content>
			</Sheet.Root>
			<SelectWorkspace {workspaces}/>
		</div>
		<SettingProfile userProfile={workspaces.userProfile}/>
	</div>
</div>
