<script lang="ts">
	import { page } from '$app/state';
	import ListUsers from '$lib/components/customs/admin/allUsers/list-users.svelte';
	import SettingServer from '$lib/components/customs/admin/quota/setting-server.svelte';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
</script>

<div class="min-h-[100vh] flex-1 md:min-h-min">
	{#if page.params.settingSlug == 'Users'}
		<ListUsers {data} />
	{:else if page.params.settingSlug == 'Quota'}
		<SettingServer {data} form={data.form}/>
	{/if}
</div>
