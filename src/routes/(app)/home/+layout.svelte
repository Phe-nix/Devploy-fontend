<script lang="ts">
  // shadcn-svelte
  import * as Tabs from "$lib/components/ui/tabs";
  import { Button } from "$lib/components/ui/button/index.js";

  // import components
  import EmptyProjects from "$lib/components/custom/emtpy-projects.svelte";
  import CardServicesDatabases from "$lib/components/custom/card-services-databases.svelte";
  import DropdownCreateService from "$lib/components/custom/button-create-service.svelte";

  import { goto, pushState, replaceState } from "$app/navigation";
  import { page } from "$app/stores";

  let services = {
    app: [
      {
        id: "1",
        name: "Zela-Frontend",
        time: "21",
        img: "https://github.com/Phe-nix.png",
        linkGit: "Phe-nix/zela",
        stack: "Svelte",
      },
    ],
    database: [
      {
        id: "1",
        name: "Zela-database",
        time: "21",
        stack: "MongoDB",
      },
    ],
  };
</script>

<div>
  <div class="py-6 flex justify-between items-center">
    <h2
      class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Team Name
    </h2>
    {#if $page.url.pathname == "/home/applications"}
      <DropdownCreateService type="application"/>
    {:else if $page.url.pathname == "/home/databases"}
    <DropdownCreateService type="database"/>
    {/if}

  </div>
  <Tabs.Root value="app" class="w-full py-6">
    <Tabs.List class="grid w-full grid-cols-3">
      <Tabs.Trigger
        value="app"
        on:click={() => {
          goto("/home/applications");
        }}>Applications</Tabs.Trigger
      >
      <Tabs.Trigger
        value="database"
        on:click={() => {
          goto("/home/databases");
        }}>Databases</Tabs.Trigger
      >
      <Tabs.Trigger
        value="setting"
        on:click={() => {
          goto("/home/setting");
        }}>Setting</Tabs.Trigger
      >
    </Tabs.List>
    <Tabs.Content value="app">
      <slot />
    </Tabs.Content>
    <Tabs.Content value="database">
      <slot />
    </Tabs.Content>
    <Tabs.Content value="setting">
      <slot />
    </Tabs.Content>
  </Tabs.Root>
</div>
