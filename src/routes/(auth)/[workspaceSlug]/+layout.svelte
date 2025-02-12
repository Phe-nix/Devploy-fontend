<script lang="ts">
    // import components
    import Navbar from "$lib/components/custom/navbar-main.svelte";
</script>

<Navbar/>

<div class="max-w-sm w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto min-h-full">
    <slot/>
</div>