<script lang="ts">
	import { cn } from '$lib/utils';
	import Prism from 'prismjs';

	let { code, language, class: className } = $props();
</script>

<div class={cn('rounded-xl p-4 border-card bg-zinc-900 text-white', className)}>
	{@html Prism.highlight(code, Prism.languages[language], language)}
</div>
