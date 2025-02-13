<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
  import { page } from '$app/stores';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
  let newName = $state('');
	console.log($page.params);
</script>

<main class="h-dvh w-full flex flex-col gap-2 items-center">
	<div class="w-10/12 flex flex-col gap-2">
		<h1 class="text-4xl font-bold">DevPloy Playground</h1>
		<h1 class="text-4xl font-bold">{$page.params.workspaceSlug}</h1>
		<div class="h-0.5 w-full bg-black"></div>
		<div class="w-full flex justify-between items-center">
			<h2 class="text-3xl font-bold">{data.appInfo.name}</h2>
			<button
				class="rounded border shadow text-white bg-red-500 hover:bg-red-600 active:bg-red-700 px-2 py-1"
        onclick={async () => {
          const res = await fetch(`http://127.0.0.1:3000/application/${data.appInfo.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${data.accessToken}`
            }
          });
          if (res.ok) {
            goto(`/${$page.params.workspaceSlug}`);
          }
        }}
				>Delete</button
			>
		</div>
		<div class="h-0.5 w-full bg-black"></div>
		<p class="w-full text-center text-3xl">Info</p>
    <div class="p-2 rounded border shadow w-full bg-slate-50">
      <p>id: {data.appInfo.id}</p>
      <p>name: {data.appInfo.name}</p>
      <p>github: {data.appInfo.gitHub}</p>
      <p>branch: {data.appInfo.branch}</p>
      <p>buildPack: {data.appInfo.buildPack}</p>
      <div class="w-full overflow-x-auto">
        <p>config: {JSON.stringify(data.appInfo.config)}</p>
      </div>
    </div>
    <p class="w-full text-center text-3xl">Rename Application (Edit Application)</p>
    <div class="flex gap-2 w-full">
      <input type="text" class="p-2 rounded border shadow w-full" placeholder="New Name" bind:value={newName} />
      <button class="rounded border shadow text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-2 py-1" onclick={async () => {
        const application = data.appInfo;
        console.log(application);
        const payload = {
          name: newName,
          github: application.gitHub,
          branch: application.branch,
          buildPack: application.buildPack,
          souceId: application.Souce.installID
        }
        const res = await fetch(`http://127.0.0.1:3000/application/${application.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${data.accessToken}`
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          invalidateAll();
        }
      }}>Rename</button>
    </div>
	</div>
</main>
