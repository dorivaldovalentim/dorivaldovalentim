<script>
    import Menu from "@/Components/Menu.svelte";

    export let title;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<main>
    <Menu></Menu>
    <slot></slot>
</main>
