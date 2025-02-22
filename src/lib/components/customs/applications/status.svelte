<script lang="ts">
	// import shadcn-svelte
	import { Tooltip } from 'bits-ui';
	// import SVG
	import { Earth } from 'lucide-svelte';

	// props
	let status = $props();
</script>

{#if status == 'inProgress'}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger
				><div class="relative">
					<div class="absolute top-0 right-0">
						<span class="relative flex h-3 w-3">
							<span
								class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75"
							></span>
							<span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
						</span>
					</div>
					<Earth class="size-8" />
				</div></Tooltip.Trigger
			>
			<Tooltip.Content sideOffset={8}>
				<div class="bg-background">
					<Tooltip.Arrow class="rounded-[2px] border-l border-t border-dark-10" />
				</div>
				<div
					class="flex items-center justify-center rounded-xl border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
				>
					On Processing 🏃‍♂️
				</div>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{:else if status == 'Deployed'}
<Tooltip.Provider>
    <Tooltip.Root>
        <Tooltip.Trigger
            ><div class="relative">
                <div class="absolute top-0 right-0">
                    <span class="relative flex h-3 w-3">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75"
                        ></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                    </span>
                </div>
                <Earth class="size-8" />
            </div></Tooltip.Trigger
        >
        <Tooltip.Content sideOffset={8}>
            <div class="bg-background">
                <Tooltip.Arrow class="rounded-[2px] border-l border-t border-dark-10" />
            </div>
            <div
                class="flex items-center justify-center rounded-xl border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
            >
            Service is running 😎
            </div>
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>
{:else if status == 'Failed'}
<Tooltip.Provider>
    <Tooltip.Root>
        <Tooltip.Trigger
            ><div class="relative">
                <div class="absolute top-0 right-0">
                    <span class="relative flex h-3 w-3">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75"
                        ></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                    </span>
                </div>
                <Earth class="size-8" />
            </div></Tooltip.Trigger
        >
        <Tooltip.Content sideOffset={8}>
            <div class="bg-background">
                <Tooltip.Arrow class="rounded-[2px] border-l border-t border-dark-10" />
            </div>
            <div
                class="flex items-center justify-center rounded-xl border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
            >
            Oh no! Something wrong 😭
            </div>
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>
{:else}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger
				><div class="relative">
					<div class="absolute top-0 right-0">
						<span class="relative flex h-3 w-3">
							<span
								class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75"
							></span>
							<span class="relative inline-flex rounded-full h-3 w-3 bg-gray-600"></span>
						</span>
					</div>
					<Earth class="size-8" />
				</div></Tooltip.Trigger
			>
			<Tooltip.Content sideOffset={8}>
				<div class="bg-background">
					<Tooltip.Arrow class="rounded-[2px] border-l border-t border-dark-10" />
				</div>
				<div
					class="flex items-center justify-center rounded-xl border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
				>
					It's not started yet 🤔
				</div>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/if}
