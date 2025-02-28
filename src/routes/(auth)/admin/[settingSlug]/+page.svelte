<script lang="ts">
	import { page } from '$app/state';
	import ListUsers from '$lib/components/customs/admin/allUsers/list-users.svelte';
	import type { PageData } from './$types';

	let { data } = $props();

</script>

<div class="min-h-[100vh] flex-1 md:min-h-min">
	{#if page.params.settingSlug == 'Users'}
		<ListUsers />
	{/if}
</div>
