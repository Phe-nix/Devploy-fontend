<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { PageProps } from './$types';

	let username = 'Phe-nix';

    let data : PageProps = $props();
    let profile = data.data.userProfile;
</script>
<div class="grid space-y-5">
	<div class="flex flex-col space-y-2">
		<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Profile</h3>
		<p class="text-muted-foreground text-sm">Show your profile 😎.</p>
	</div>
	<Avatar.Root class="size-28">
		<Avatar.Image src={profile.picture} alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="User">Username</Label>
		<Input type="text" id="User" placeholder="User" disabled value="{profile.firstName}  {profile.lastName}" />
	</div>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="User">StudentID</Label>
		<Input type="text" id="ID" placeholder="studenId" disabled value={profile.studentId} />
	</div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="User">Email</Label>
		<Input type="email" id="Email" placeholder="Email" disabled value={profile.email} />
	</div>
</div>
