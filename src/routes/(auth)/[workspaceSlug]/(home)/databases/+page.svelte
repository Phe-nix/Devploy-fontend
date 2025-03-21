<script lang="ts">
    // shadcn-svelte
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  
    // import components
    import EmtpyApp from "$lib/components/customs/applications/emtpy-app.svelte";
    import CardApp from "$lib/components/customs/applications/card-app.svelte";
    import CardDb from "$lib/components/customs/databases/card-db.svelte";
    
    let { data } = $props();
    let services = $state(data.info.Database);

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
      {#if services.length === 0}
        <EmtpyApp type="database" />
      {:else}
        <div class="my-2">
          <h2
            class="scroll-m-20 pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          >
            Databases ({services.length}/{data.userProfile.databaseQuota})
          </h2>
          <ScrollArea class="w-fit h-[25em] xl:h-[34em] md:h-[28em]">
            <div
              class="flex flex-row gap-3 flex-wrap items-center justify-center"
            >
              {#each services as service}
                <CardDb {service} info={data} />
              {/each}
            </div>
          </ScrollArea>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
