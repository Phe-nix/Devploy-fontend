<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  // SVG Icons
  import { Plus } from "lucide-svelte";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button class="flex gap-2 transition">
      <Plus class="size-4"/>
      <p>
        Create Projects
      </p>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create Project</Dialog.Title>
      <Dialog.Description>
        Create your new project for deployments.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="w-36">Project Name</Label>
        <Input id="name" value="Pedro Duarte" class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <Button type="submit">Create</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
