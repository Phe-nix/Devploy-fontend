<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	import { setMode, mode, resetMode } from 'mode-watcher';

	let changeTheme = () => {
		if (selectData === 'system') {
			resetMode();
		} else if (selectData == undefined) {
			console.log('try again');
		} else {
			setMode(selectData);
		}
	};
	
	let selectData: any = $state($mode);

	let themeSelect = [
		{
			name: 'Light',
			value: 'light',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
		},
		{
			name: 'Dark',
			value: 'dark',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
		},
		{
			name: 'System',
			value: 'system',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-cog"><path d="M12 17v4"/><path d="m15.2 4.9-.9-.4"/><path d="m15.2 7.1-.9.4"/><path d="m16.9 3.2-.4-.9"/><path d="m16.9 8.8-.4.9"/><path d="m19.5 2.3-.4.9"/><path d="m19.5 9.7-.4-.9"/><path d="m21.7 4.5-.9.4"/><path d="m21.7 7.5-.9-.4"/><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="M8 21h8"/><circle cx="18" cy="6" r="3"/></svg>`
		}
	];
</script>

<div class="space-y-5">
	<div class="flex flex-col space-y-2">
		<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">
			Appearance
		</h4>
		<p class="text-muted-foreground text-sm">Customize the theme of your dashboard.</p>
	</div>
	<ToggleGroup.Root
		bind:value={selectData}
		variant="outline"
		size="xl"
		type="single"
		class="gap-6 flex-col md:flex-row"
	>
		{#each themeSelect as { name, value, svg }}
			<ToggleGroup.Item {value} aria-label={name}>
				<div class="flex flex-col gap-2 items-center">
					{@html svg}
					{name}
				</div>
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>

	<Button
		onclick={() => {
			changeTheme();
		}}>Save</Button
	>
</div>
