<script lang="ts">
	import DeleteDb from '$lib/components/customs/databases/settings/delete-db.svelte';
	import FormUpdatePorts from '$lib/components/customs/databases/settings/form-update-ports.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { PageData } from './$types';
	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
	console.log(data);
</script>

<main class="my-4 flex flex-col space-y-5">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Database Settings</h3>
	<FormUpdatePorts {data} />
	<section
		class="flex flex-col border rounded dark:border-[hsla(357,55%,26%,1)] border-red-300 my-4"
	>
		<div class="flex flex-col gap-y-4 px-4 py-8">
			<div class="flex flex-col gap-1">
				<Label class="scroll-m-20 text-xl font-semibold tracking-tight">Delete Database</Label>
				<p class="text-muted-foreground text-sm">
					The application will be permanently deleted, This action is irreversible and can not be
					undone.
				</p>
			</div>
		</div>
		<div
			class="border-t p-4 dark:border-[hsla(357,55%,26%,1)] border-red-300 bg-red-100 dark:bg-[hsla(357,37%,12%)] flex justify-end"
		>
			<DeleteDb {data} />
		</div>
	</section>
</main>
