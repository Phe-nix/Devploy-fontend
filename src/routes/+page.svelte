<script lang="ts">
  // import shadcn-svelte
  import * as Card from "$lib/components/ui/card/index.js";
  import { Mail } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div
  class="h-full w-full flex flex-col items-center space-y-10 my-48"
>
  <div class="flex flex-col space-y-10 items-center">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      LOGO
    </h1>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Sign in to Devploy
    </h1>
  </div>
  <Card.Root class="p-8 md:p-20">
    <Card.Content>
      <div class="flex flex-col items-center">
        <Button href="/home" class="my-4 p-[1.5em]">
          <Mail class="mr-2 h-4 w-4" />
          Login with @kmitl.ac.th
        </Button>
        <p class="text-base text-muted-foreground">Please use <span class="font-bold">@KMITL</span> to Sign in</p>
      </div>
    </Card.Content>
  </Card.Root>
</div>
