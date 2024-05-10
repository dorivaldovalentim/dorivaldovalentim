<script>
    import { Link } from "@inertiajs/svelte";

    let data = [
        {
            label: "Início",
            link: "home",
            active: "home",
        },
        {
            label: "História",
            link: "history",
            active: "history",
        },
        {
            label: "Competências",
            link: "skills",
            active: "skills",
        },
        {
            label: "Portfólio",
            link: "portfolio",
            active: "portfolio",
        },
        {
            label: "Contactos",
            link: "contacts",
            active: "contacts",
        },
    ];
</script>

<header class="fixed-top h-100">
    <nav class="navbar navbar-expand-lg bg-body-tertiary align-items-center justify-self-end h-100">
        <ul class="nav flex-column align-items-center">
            {#each data as item}
                <li
                    class:active={route().current(item.active)}
                    class="nav-item fs-3"
                >
                    <Link href={route(item.link)} class="nav-link">
                        {item.label}
                    </Link>
                </li>
            {/each}
        </ul>
    </nav>
</header>

<style lang="scss">
    header {
        left: calc(100% - 200px);
        min-width: 200px;
        width: 200px;

        .navbar {
            justify-content: center;
        }

        .active {
            font-weight: bold;
        }
    }
</style>
