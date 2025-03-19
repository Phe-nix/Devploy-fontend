<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import KickUserWorkspace from '$lib/components/customs/settings/membersPage/kick-user-workspace.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let { data } = $props();
</script>

<div class="space-y-12">
	<div class="flex flex-col space-y-4">
		<div class="flex items-center justify-between">
			<div class="flex flex-col space-y-2">
				<h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">Members</h4>
				<p class="text-muted-foreground text-sm">List members all in this workspace.</p>
			</div>
		</div>
		{#each data.info.Members as member}
			<div class="flex justify-between bg-card border-[1px] p-4 rounded-lg my-2 items-center">
				<div class="flex gap-3">
					<Avatar.Root>
						<Avatar.Image src={member.picture} alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex flex-col">
						<p>{member.firstName} {member.lastName}</p>
						<p class="text-muted-foreground text-sm">{member.email}</p>
					</div>
				</div>
				<div class="flex space-x-4">
					<KickUserWorkspace {member} {data} />
				</div>
			</div>
		{/each}
	</div>
</div>
