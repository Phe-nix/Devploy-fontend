<script lang="ts">
	import CodeBlock from '$lib/components/customs/codeBlock.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { CircleAlert } from 'lucide-svelte';
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
            <li>Config your application</li>
            <div>
                
            </div>
		</ol>
		<CodeBlock class="" code="console.log('Hello world')" language="javascript" />
	</section>
</div>
