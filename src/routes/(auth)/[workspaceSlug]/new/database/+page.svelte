<script lang="ts">
  // shadcn-svelte
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  // import components
  import SelectDatabase from "$lib/components/custom/create-database/select-database.svelte";
  import FormConfigDatabase from "$lib/components/custom/create-database/form-config-database.svelte";

  let isSelectDatabase = false;
</script>

<div class="py-2 flex flex-col">
  <h2
    class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    Let build something new.
  </h2>
  <p class="text-muted-foreground text-sm">to deploy service</p>
</div>
<div class="py-4">
  {#if !isSelectDatabase}
  <SelectDatabase bind:isSelectDatabase/>
  {:else}
  <FormConfigDatabase bind:isSelectDatabase/>
  {/if}
  <!-- <FormConfigDatabase /> -->
</div>
