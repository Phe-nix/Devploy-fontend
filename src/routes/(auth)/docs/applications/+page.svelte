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
		<h1 class="text-3xl font-bold">Applications</h1>
		<p class="text-base text-muted-foreground">
			Our applications are like websites that users deploy.
		</p>

		<p class="text-base text-pretty text-justify text-clip">
			Application is a software or website that users have deployed on Devploy. The website will
			control the environment for deployment and other things, but users must set up config settings
			so that we can use the user's website correctly.
		</p>
		<p class="pt-2">Alright let try to deploy something. 🎉</p>
	</section>

	<section class="flex flex-col gap-6">
		<ol class="list-decimal space-y-4">
			<li>
				Start with "Deploy Applications" at <a
					href="/"
					class="underline underline-offset-2 cursor-pointer">Application Page</a
				>.
			</li>
			<p class="">If you are new here. Web will diracet you to login GitHub account.</p>
			<li>Select you repository that you want to deploy.</li>
			<Alert.Root>
				<CircleAlert class="size-4" />
				<Alert.Description
					>If you project is Node.js. Before You choose repository on GitHub make sure in project
					file .config.js you have to change <span class="font-semibold">"adapter-auto"</span> to
					<span class="font-semibold">"adapter-node"</span> for next step.</Alert.Description
				>
			</Alert.Root>
			<CodeBlock
				class=""
				code="import adapter from '@sveltejs/adapter-node';"
				language="javascript"
			/>
			<li>Config your application</li>
			<div>
				<p>Now we can deploy only 2 type of project</p>
				<ul class="list-disc">
					<li>
						Static -> HTML/CSS base files.
					</li>
					<li>
						Node.js -> Have a file config and need to run command to build project.
					</li>
				</ul>
			</div>
			<p>If your project is Static you can deploy as easy no need to config anything. But if your project is Node.js you have to config project</p>

		</ol>
	</section>
	<Button class="self-end" variant="outline" onclick={() => {
		goto('/docs/databases')
	}}>
		<p>Databases</p>
		<ChevronRight />
	</Button>
</div>
