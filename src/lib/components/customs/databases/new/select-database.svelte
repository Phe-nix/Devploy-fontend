<script lang="ts">
	// shadcn-svelte
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { goto } from '$app/navigation';

	let databases = [
		{
			name: 'Postgres',
			value: 'postgres',
			img: '/imgs/databases/devicon--postgresql-wordmark.png'
		},
		{
			name: 'MongoDB',
			value: 'mongodb',
			img: '/imgs/databases/skill-icons--mongodb.png'
		},
		{
			name: 'MySQL',
			value: 'mysql',
			img: '/imgs/databases/devicon--mysql-wordmark.png'
		}
	];

	let { db = $bindable(), nowState = $bindable() , ...props } = $props();
</script>

<div class="flex flex-col items-center gap-4">
	<ToggleGroup.Root
		bind:value={db}
		{...props}
		variant="outline"
		size="xl"
		type="single"
		class="gap-6 flex-col md:flex-row"
	>
		{#each databases as { name, value, img }}
			<ToggleGroup.Item {value} aria-label={name} disabled={value == 'mysql'}>
				<div class="flex flex-col items-center space-y-4">
					<img class="size-12" src={img} alt={name} />
					<Label>{name}</Label>
				</div>
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
	<div class="flex justify-between w-full max-w-5xl">
		<Button
			onclick={() => {
				goto(`/`);
			}}>Back</Button
		>
		<Button
			disabled={db == ''}
			onclick={() => {
				nowState = 'config';
			}}>Next</Button
		>
	</div>
</div>
