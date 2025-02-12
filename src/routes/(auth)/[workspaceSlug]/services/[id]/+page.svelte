<script lang="ts">
  // shadcn-svelte
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as Tabs from "$lib/components/ui/tabs";
  import * as Card from "$lib/components/ui/card/index.js";
  import GeneralDetail from "$lib/components/custom/service-detail/general-detail.svelte";
  import { Input } from "$lib/components/ui/input/index.js";

  // import components
  import ServicesStatus from "$lib/components/custom/services-status.svelte";
  import Logs from "$lib/components/custom/service-detail/logs.svelte";
  import Monitor from "$lib/components/custom/service-detail/monitor.svelte";
  import Domain from "$lib/components/custom/service-detail/domain.svelte";

  // import SVG

  // เดี๋ยวมาทำให้ดีกว่านี้55555555555
  // let thisroute = window.location.pathname;
  // let goBack = thisroute.split("/").slice(0, -2).join("/");
</script>

<div>
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/home/applications">Projects</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Page>Zela</Breadcrumb.Page>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  <div class="py-4 flex justify-between items-center">
    <h2
      class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Zela project
    </h2>
    <ServicesStatus status="running" />
  </div>
</div>

<Tabs.Root value="general" class="w-full py-6">
  <Tabs.List class="grid w-full grid-cols-4">
    <Tabs.Trigger value="general">General</Tabs.Trigger>
    <Tabs.Trigger value="logs">Logs</Tabs.Trigger>
    <Tabs.Trigger value="monitor">Monitor</Tabs.Trigger>
    <Tabs.Trigger value="domain">Domains</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="general">
    <Card.Root>
      <Card.Content>
        <GeneralDetail />
      </Card.Content>
    </Card.Root>
  </Tabs.Content>
  <Tabs.Content value="logs">
    <Card.Root>
      <Card.Content>
        <Logs />
      </Card.Content>
    </Card.Root>
  </Tabs.Content>
  <Tabs.Content value="monitor">
    <Card.Root>
      <Card.Content>
        <Monitor />
      </Card.Content>
    </Card.Root>
  </Tabs.Content>
  <Tabs.Content value="domain">
    <Card.Root>
      <Card.Content>
        <Domain />
      </Card.Content>
    </Card.Root>
  </Tabs.Content>
</Tabs.Root>
