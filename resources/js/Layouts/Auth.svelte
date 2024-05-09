<script setup>
    import { Link } from "@inertiajs/svelte";
    import "@tabler/core/dist/css/tabler.min.css";
    import "@tabler/core/dist/css/tabler-vendors.min.css";
    import "@tabler/core/dist/css/demo.min.css";
    import "@tabler/core/dist/js/tabler.min";
    import "@tabler/core/dist/js/demo-theme";

    export let title;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="page page-center">
    <div class="container container-tight py-4">
        <div class="text-center mb-4">
            <Link
                href={route("home")}
                class="navbar-brand navbar-brand-autodark"
            >
                <img src="@/Public/logo.svg" height="36" alt="" />
            </Link>
        </div>

        <slot></slot>
    </div>
</div>
