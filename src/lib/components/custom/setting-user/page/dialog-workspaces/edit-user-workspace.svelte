<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { toast } from "svelte-sonner";
  import { PackageSearch } from "lucide-svelte";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button
      size="sm"
      class="hover:text-[hsl(192,91%,36%)]"
    >
      <p>Edit</p>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit <span class="italic">Phe-nix</span></Dialog.Title
      >
      <Dialog.Description>
        Make changes to your service here. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input id="name" value="Zela-Frontend" class="col-span-3" />
      </div>
    </div>
    <Dialog.Footer>
      <Button
        type="submit"
        on:click={() => {
          toast.success("Edit success.");
        }}>Save changes</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
