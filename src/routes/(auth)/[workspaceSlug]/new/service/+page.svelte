<script lang="ts">
  // shadcn-svelte
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { toast } from "svelte-sonner";

  // import components
  import GithubConnect from "$lib/components/custom/create-service/githubConnect.svelte";
  import SelectRepo from "$lib/components/custom/create-service/selectRepo.svelte";
  import FormBuiltApp from "$lib/components/custom/create-service/formBuiltApp.svelte";
  import { goto } from "$app/navigation";

  let isprivateRepo = false;
  let isSignedInGithub = false;
  let isSelectRepo = false;
</script>

<div class="py-2 flex flex-col">
  <h2
    class="scroll-m-20 pb-2 text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    Let build something new.
  </h2>
  <p class="text-muted-foreground text-sm">to deploy service</p>
</div>
<div class="py-4 w-full">
  <Card.Root>
    <Card.Header>
      <Card.Title tag="h1">Import Application</Card.Title>
      <Card.Description
        >Import project to deployment with Github</Card.Description
      >
    </Card.Header>
    <Card.Content class="py-10">
      {#if !isSignedInGithub && !isprivateRepo}
        <GithubConnect bind:isprivateRepo bind:isSignedInGithub />
      {:else if (isprivateRepo && !isSignedInGithub) || (!isprivateRepo && isSignedInGithub && isSelectRepo)}
        <FormBuiltApp />
      {:else if isSignedInGithub || !isprivateRepo}
        <SelectRepo bind:isSelectRepo />
      {/if}
    </Card.Content>
    <Card.Footer class="flex justify-between">
      <Button
        on:click={() => {
          goto("/home/applications");
        }}>Back</Button
      >
      {#if (isprivateRepo && !isSignedInGithub) || (!isprivateRepo && isSignedInGithub && isSelectRepo)}
        <Button
          on:click={() => {
            goto("/home/applications");
             toast.success("The service has been created")
          }}>Let Built</Button
        >
      {:else}
        <Button disabled>Let Built</Button>
      {/if}
    </Card.Footer>
  </Card.Root>
</div>
