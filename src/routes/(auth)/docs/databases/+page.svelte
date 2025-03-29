<script lang="ts">
	import { goto } from '$app/navigation';
	import CodeBlock from '$lib/components/customs/codeBlock.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CircleAlert } from 'lucide-svelte';
	import { ChevronRight } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-y-16">
	<section class="flex flex-col gap-3">
		<h1 class="text-3xl font-bold">Databases</h1>
		<p class="text-base text-muted-foreground">
			Storage collect data from application that was deployed.
		</p>

		<p class="text-base text-pretty text-justify text-clip">
			Database is one part of web development. When users want the deployed website to be usable,
			they must use a database to store various data from the application.
		</p>
	</section>
	<section class="flex flex-col gap-6">
		<ol class="list-decimal space-y-4">
			<li>
				Start with "Deploy Database" at <a
					href="/"
					class="underline underline-offset-2 cursor-pointer">Databases Page</a
				>.
			</li>
			<li>Select you type of database to deploy.</li>
			<Alert.Root>
				<CircleAlert class="size-4" />
				<Alert.Description>
                    Postgrat, MongoDB 2 Type of database is ready to use in Future will be more than this.
                </Alert.Description>
			</Alert.Root>
            <li>Config info of DB.</li>
            <Alert.Root>
				<CircleAlert class="size-4" />
				<Alert.Description>
                    If you have application as a back-end. you need to update <span class="font-semibold">.Env</span> for application can connect a DB.
                </Alert.Description>
			</Alert.Root>
            <CodeBlock
				class=""
				code="DATABASE_URL='postgresql://username:password@postgres:port/databae_name?schema=public'"
				language="javascript"
			/>
		</ol>
	</section>
</div>
