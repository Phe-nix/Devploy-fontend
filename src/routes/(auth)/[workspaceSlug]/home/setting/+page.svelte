<script lang="ts">
  // import shadcn-svelte
  import * as Card from "$lib/components/ui/card";

  // import components
  import Sidebar from "$lib/components/custom/setting-user/sidebar.svelte";
  import Profile from "$lib/components/custom/setting-user/page/profile.svelte";
  import Appearance from "$lib/components/custom/setting-user/page/appearance.svelte";
  import Users from "$lib/components/custom/setting-user/page/data-table-users/users.svelte";
  import DockerSwarms from "$lib/components/custom/admin/cluster/docker-swarms.svelte";
  import { User } from "lucide-svelte";
  import Workspaces from "$lib/components/custom/setting-user/page/workspaces.svelte";

  let nowPageSide = "Profile";

  const sidebarNavItems = [
    {
      title: "Profile",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-user"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>`,
    },
    {
      title: "Appearance",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    },
    // {
    //   title: "Users",
    //   icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    // },
    {
      title: "Workspaces",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-user"><path d="M15 13a3 3 0 1 0-6 0"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/></svg>`
    }
  ];
</script>

<Card.Root>
  <Card.Content>
    <div class="space-y-6 p-10 pb-16">
      <div
        class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"
      >
        <aside class="-mx-4 lg:w-1/5">
          <Sidebar items={sidebarNavItems} bind:nowPageSide />
        </aside>
        <div class="flex-1 lg:max-w-4xl md:max-w-xl">
          {#if nowPageSide === "Profile"}
            <Profile />
          {:else if nowPageSide === "Appearance"}
            <Appearance />
          <!-- {:else if nowPageSide === "Users"}
            <Users /> -->
          {:else if nowPageSide === "Workspaces"}
            <Workspaces/>
          {/if}
        </div>
      </div>
    </div>
  </Card.Content>
</Card.Root>
