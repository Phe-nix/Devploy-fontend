<script lang="ts">
	import DarkLightMode from '../dark-light-mode/dark-light-mode.svelte';
</script>

<div
	class="max-sm:hidden w-full py-2 px-10 border-b bg-card text-card-foreground shadow-sm sticky top-0 z-50 bg-opacity-95"
>
	<div class="flex items-center justify-between">
		<a
			href="/"
			class="text-xl font-sans hover:ring-1 hover:dark:ring-slate-900 hover:ring-slate-200 transition-shadow p-1 rounded-lg"
			>DevPloy</a
		>
		<DarkLightMode />
	</div>
</div>
