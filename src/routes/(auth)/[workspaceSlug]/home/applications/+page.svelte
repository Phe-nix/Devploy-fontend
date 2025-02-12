<script lang="ts">
  // shadcn-svelte
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  // import components
  import EmptyProjects from "$lib/components/custom/emtpy-projects.svelte";
  import CardServicesDatabases from "$lib/components/custom/card-services-databases.svelte";

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
      {
        id: "1",
        name: "Zela-Frontend",
        time: "21",
        img: "https://github.com/Phe-nix.png",
        linkGit: "Phe-nix/zela",
        stack: "Svelte",
      },
      {
        id: "1",
        name: "Zela-Frontend",
        time: "21",
        img: "https://github.com/Phe-nix.png",
        linkGit: "Phe-nix/zela",
        stack: "Svelte",
      },
      {
        id: "1",
        name: "Zela-Frontend",
        time: "21",
        img: "https://github.com/Phe-nix.png",
        linkGit: "Phe-nix/zela",
        stack: "Svelte",
      },
      {
        id: "1",
        name: "Zela-Frontend",
        time: "21",
        img: "https://github.com/Phe-nix.png",
        linkGit: "Phe-nix/zela",
        stack: "Svelte",
      },
      {
        id: "1",
        name: "Zela-Frontend",
        time: "21",
        img: "https://github.com/Phe-nix.png",
        linkGit: "Phe-nix/zela",
        stack: "Svelte",
      },
      {
        id: "1",
        name: "Zela-Frontend",
        time: "21",
        img: "https://github.com/Phe-nix.png",
        linkGit: "Phe-nix/zela",
        stack: "Svelte",
      },
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

<Card.Root>
  <Card.Header>
    <form class="flex w-full max-w-5xl mx-auto items-center space-x-2">
      <Input
        class="shadow-lg p-4"
        type="text"
        placeholder="🔍 Search something..."
      />
    </form>
  </Card.Header>
  <Card.Content>
    {#if services == undefined}
      <EmptyProjects type="service" />
    {:else}
      <div class="my-2">
        <h2
          class="scroll-m-20 pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
          Applications ({services.app.length})
        </h2>
        <ScrollArea class="w-fit h-[25em] xl:h-[34em] md:h-[28em]">
          <div
            class="flex flex-row gap-3 flex-wrap items-center justify-center "
          >
            {#each services.app as service}
              <CardServicesDatabases {service} />
            {/each}
          </div>
        </ScrollArea>
      </div>
    {/if}
  </Card.Content>
</Card.Root>
