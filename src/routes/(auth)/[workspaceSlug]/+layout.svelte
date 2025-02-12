<script lang="ts">
    // import components
    import Navbar from "$lib/components/customs/navbar/navbar.svelte";
    
    // import data
    import type { LayoutProps } from "./$types";
    import { setContext } from 'svelte';
    
    let { data, children }: LayoutProps = $props();

    // console.log(data)
</script>

<Navbar workspaces={data}/>

<div class="max-w-sm w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto min-h-full">
    {@render children()}
</div>