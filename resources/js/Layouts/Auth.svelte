<script setup>
    import { Link } from "@inertiajs/svelte";

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
