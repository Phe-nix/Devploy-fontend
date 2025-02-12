<script lang="ts">
  // import shadcn-svelte
  import * as Card from "$lib/components/ui/card/index.js";
  import { Mail } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { toast } from "svelte-sonner";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  // lib func
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import icon_light from "$lib/assets/icon/light_iron.png"
  import icon_black from "$lib/assets/icon/black_icon.png";
  
  import { PUBLIC_BASE_API } from '$env/static/public';

</script>
<div
  class="flex flex-col items-center justify-center md:space-y-10 space-y-20 min-h-screen"
>
  <div class="flex flex-col space-y-2 items-center">
    <h1 class="hidden dark:block">
      <img src={icon_light} class="size-24" alt="Logo"/>
    </h1>
    <h1 class="block dark:hidden">
      <img src={icon_black} class="size-24" alt="Logo"/>
    </h1>
    <h1 class="text-2xl font-bold tracking-tight md:text-2xl">
      Sign in to Devploy
    </h1>
  </div>
  <Card.Root class="p-8 md:p-20">
    <Card.Content>
      <div class="flex flex-col items-center">
        <Button
          href="{PUBLIC_BASE_API}/auth/google/login"
          on:click={() => {
            // toast.loading("Loading...");
            // setTimeout(() => {
            //   goto("/home/applications/");
            //   toast.success("Login success");
            // }, 5000); // หน่วงเวลา 5 วินาทีก่อนทำงานต่อ
          }}
          class="my-4 p-[1.5em]"
        >
          <Mail class="mr-2 h-4 w-4" />
          Login with @kmitl.ac.th
        </Button>
        <p class="text-base text-muted-foreground">
          Please use
          <Tooltip.Root>
            <Tooltip.Trigger>
              <span class="font-bold">@KMITL</span>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom" class="p-4">
              <p class="font-bold">6407xxxx@kmitl.ac.th</p>
            </Tooltip.Content>
          </Tooltip.Root>
          to Sign in
        </p>
      </div>
    </Card.Content>
  </Card.Root>
</div>
