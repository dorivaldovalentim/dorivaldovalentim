<script>
    import Menu from "@/Components/Menu.svelte";
    import Aside from "@/Components/Aside.svelte";
    import Mouse from "@/Components/Mouse.svelte";

    export let title;
</script>

<svelte:head>
    <title>{title} « Dorivaldo Valentim</title>
</svelte:head>

<main>
    <Mouse></Mouse>

    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <Aside></Aside>
            </div>

            <div class="col">
                <slot></slot>
            </div>

            <div class="col">
                <Menu></Menu>
            </div>
        </div>
    </div>
</main>
