<script>
    import Menu from "@/Components/Menu.svelte";
    import Aside from "@/Components/Aside.svelte";

    export let title;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<main>
    <div class="row">
        <div class="col-12 col-md-3">
            <Aside></Aside>
        </div>

        <div class="col-12 col-md-8">
            <slot></slot>
        </div>

        <div class="col-12 col-md-1">
            <Menu></Menu>
        </div>
    </div>
</main>
