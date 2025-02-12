<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);

	const acceptInvite = async (slug: string) => {
		const res = await fetch(`http://127.0.0.1:3000/invite/${slug}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			}
		});
		if (res.ok) {
			console.log('accepted');
			invalidateAll();
		}
	};

	const deniedInvite = async (slug: string) => {
		const res = await fetch(`http://127.0.0.1:3000/invite/${slug}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${data.accessToken}`
			}
		});
		if (res.ok) {
			console.log('deleted');
			invalidateAll();
		}
	};
</script>

<main class="w-full min-h-dvh flex flex-col items-center">
	<div class="w-10/12">
		<h1 class="text-2xl font-bold">Invite</h1>
		<div class="w-full flex flex-col gap-1">
			{#each data.invite as invite}
				<div class="w-full flex justify-between">
					<p>{invite.Workspace.name}</p>
					<div class="flex gap-1">
						<button
							class="rounded shadow p-0.5 text-xs text-white bg-green-500 hover:bg-green-600 active:bg-green-700"
							onclick={() => acceptInvite(invite.Workspace.slug)}>Accept</button
						>
						<button
							class="rounded shadow p-0.5 text-xs text-white bg-red-500 hover:bg-red-600 active:bg-red-700"
							onclick={() => deniedInvite(invite.Workspace.slug)}>Denied</button
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
