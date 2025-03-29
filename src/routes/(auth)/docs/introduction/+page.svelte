<script lang="ts">
	import { BicepsFlexed } from 'lucide-svelte';
	import { Sparkles } from 'lucide-svelte';
	import { ChevronRight } from 'lucide-svelte';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="flex flex-col gap-y-16">
	<header class="flex flex-col gap-3 pb-4">
		<h1 class="text-3xl font-bold">🚀What is DevPloy?</h1>
		<p class="text-base text-muted-foreground">
			Web Application PaaS base for student and staff in KMITL (King Mongkut's Institute of
			Technology Ladkrabang).
		</p>

		<p class="text-base text-pretty text-justify text-clip">
			DevPloy is an project open-source that provides deployment services to web applications that
			users want to use in real life. It is a web application in the form of a Platform-as-a-Service
			(PaaS). The system is designed to work efficiently and can be controlled. DevPloy is based on
			a web application that provides the same Deployment service called
			<a href="https://iserv.kmitl.ac.th/" class="underline underline-offset-4 cursor-pointer"
				>Iserv
			</a>
			which was the inspiration to develop and solve the limitations that the original website had.
		</p>
		<p class="font-bold pt-6">So why we should use DevPloy?</p>
		<p>
			Devploy is developed to focus on helping students in KMITL with a focus on <span
				class="font-semibold">Efficiency</span
			>, <span class="font-semibold">Ease of use</span> and <span class="font-semibold">Free</span> for
			everyone in KMITL.
		</p>
	</header>

	<section class="flex flex-col gap-6">
		<h1 class="text-3xl font-bold">🔨Developers Team</h1>
		<div class="grid md:grid-cols-3 grid-row-3 place-content-center gap-4">
			<div class="bg-card border p-2 flex flex-col text-center items-center gap-2 w-1/2">
				<Avatar.Root class="size-28">
					<Avatar.Image src="/imgs/devTeams/Panwit-300x300.jpg" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<p class="font-semibold">Assoc. Prof. Dr Panwit Tuwanut</p>
				<p class="text-muted-foreground text-sm">Project Adviser</p>
			</div>
			<div class="bg-card border p-2 flex flex-col text-center items-center gap-2 w-1/2">
				<Avatar.Root class="size-28">
					<Avatar.Image src="/imgs/devTeams/Tong.jpg" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<p class="font-semibold">Mr. Khemmathiti Wangsaptawee</p>
				<p class="text-muted-foreground text-sm">Software Developer</p>
			</div>
			<div class="bg-card border p-2 flex flex-col text-center items-center gap-2 w-1/2">
				<Avatar.Root class="size-28">
					<Avatar.Image src="/imgs/devTeams/Gun.jpg" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<p class="font-semibold">Mr. Thavith Javisooth</p>
				<p class="text-muted-foreground text-sm">Software Developer</p>
			</div>
		</div>
	</section>
	<Button class="self-end" variant="outline" onclick={() => {
		goto('/docs/applications')
	}}>
		<p>WorkSpaces</p>
		<ChevronRight />
	</Button>
</div>
