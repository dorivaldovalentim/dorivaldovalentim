<script setup>
    import { Link, router, page } from "@inertiajs/svelte";
    import "@tabler/core/dist/css/tabler.min.css";
    import "@tabler/core/dist/css/tabler-vendors.min.css";
    import "@tabler/core/dist/css/demo.min.css";
    import "@tabler/core/dist/js/tabler.min";
    import "@tabler/core/dist/js/demo-theme";

    export let title;

    const logout = () => {
        router.post(route("logout"));
        window.location = route("home");
    };
</script>

<svelte:head>
    <title>{title} « Dashboard « Dorivaldo Valentim</title>
</svelte:head>

<div class="page">
    <!-- Navbar -->
    <header class="navbar navbar-expand-md d-print-none">
        <div class="container-xl">
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-menu"
                aria-controls="navbar-menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <h1
                class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"
            >
                <Link href={route("dashboard")}>
                    <img
                        src="@/public/logo.svg"
                        width="110"
                        height="32"
                        alt="Tabler"
                        class="navbar-brand-image"
                    />
                </Link>
            </h1>

            <div class="navbar-nav flex-row order-md-last">
                <div class="d-none d-md-flex">
                    <a
                        href="?theme=dark"
                        class="nav-link px-0 hide-theme-dark"
                        title="Modo escuro"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                    >
                        <!-- Download SVG icon from http://tabler-icons.io/i/moon -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
                            />
                        </svg>
                    </a>
                    <a
                        href="?theme=light"
                        class="nav-link px-0 hide-theme-light"
                        title="Modo claro"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                    >
                        <!-- Download SVG icon from http://tabler-icons.io/i/sun -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"
                            />
                            <path
                                d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"
                            />
                        </svg>
                    </a>
                </div>

                <div class="nav-item dropdown">
                    <a
                        href="#"
                        class="nav-link d-flex lh-1 text-reset p-0"
                        data-bs-toggle="dropdown"
                        aria-label="Abrir menu do usuário"
                    >
                        <div class="d-none d-xl-block ps-2">
                            <div>{$page.props.auth.user.name}</div>
                            <div class="mt-1 small text-muted">
                                {$page.props.auth.user.email}
                            </div>
                        </div>
                    </a>

                    <div
                        class="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
                    >
                        <div class="dropdown-divider"></div>
                        <form on:submit|preventDefault={logout}>
                            <button type="submit" class="dropdown-item"
                                >Terminar Sessão</button
                            >
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <header class="navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbar-menu">
            <div class="navbar">
                <div class="container-xl">
                    <ul class="navbar-nav">
                        <li
                            class:active={route().current("dashboard")}
                            class="nav-item"
                        >
                            <Link href={route("dashboard")} class="nav-link">
                                <span
                                    class="nav-link-icon d-md-none d-lg-inline-block"
                                    ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                        <path
                                            d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"
                                        />
                                        <path
                                            d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"
                                        />
                                    </svg>
                                </span>

                                <span class="nav-link-title">
                                    Página Inicial
                                </span>
                            </Link>
                        </li>

                        <li
                            class:active={route().current("client.index")}
                            class="nav-item"
                        >
                            <Link href={route("client.index")} class="nav-link">
                                <span
                                    class="nav-link-icon d-md-none d-lg-inline-block"
                                    ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-user-dollar"
                                        ><path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        /><path
                                            d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
                                        /><path
                                            d="M6 21v-2a4 4 0 0 1 4 -4h3"
                                        /><path
                                            d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"
                                        /><path d="M19 21v1m0 -8v1" /></svg
                                    >
                                </span>

                                <span class="nav-link-title"> Clientes </span>
                            </Link>
                        </li>

                        <li
                            class:active={route().current("skill.index")}
                            class="nav-item"
                        >
                            <Link href={route("skill.index")} class="nav-link">
                                <span
                                    class="nav-link-icon d-md-none d-lg-inline-block"
                                    ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-brain"
                                        ><path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        /><path
                                            d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"
                                        /><path
                                            d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"
                                        /><path
                                            d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"
                                        /><path
                                            d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"
                                        /><path
                                            d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"
                                        /><path
                                            d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"
                                        /></svg
                                    >
                                </span>

                                <span class="nav-link-title">
                                    Habilidades
                                </span>
                            </Link>
                        </li>

                        <li
                            class:active={route().current("technology.index")}
                            class="nav-item"
                        >
                            <Link
                                href={route("technology.index")}
                                class="nav-link"
                            >
                                <span
                                    class="nav-link-icon d-md-none d-lg-inline-block"
                                    ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-manual-gearbox"
                                        ><path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        /><path
                                            d="M5 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                        /><path
                                            d="M12 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                        /><path
                                            d="M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                        /><path
                                            d="M5 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                        /><path
                                            d="M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                        /><path d="M5 8l0 8" /><path
                                            d="M12 8l0 8"
                                        /><path
                                            d="M19 8v2a2 2 0 0 1 -2 2h-12"
                                        /></svg
                                    >
                                </span>

                                <span class="nav-link-title">
                                    Tecnologias
                                </span>
                            </Link>
                        </li>

                        <li
                            class:active={route().current("portfolio.index")}
                            class="nav-item"
                        >
                            <Link
                                href={route("portfolio.index")}
                                class="nav-link"
                            >
                                <span
                                    class="nav-link-icon d-md-none d-lg-inline-block"
                                    ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-packages"
                                        ><path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        /><path
                                            d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"
                                        /><path d="M2 13.5v5.5l5 3" /><path
                                            d="M7 16.545l5 -3.03"
                                        /><path
                                            d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"
                                        /><path d="M12 19l5 3" /><path
                                            d="M17 16.5l5 -3"
                                        /><path
                                            d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5"
                                        /><path d="M7 5.03v5.455" /><path
                                            d="M12 8l5 -3"
                                        /></svg
                                    >
                                </span>

                                <span class="nav-link-title"> Portfólio </span>
                            </Link>
                        </li>

                        <li
                            class:active={route().current(
                                "social_network.index",
                            )}
                            class="nav-item"
                        >
                            <Link
                                href={route("social_network.index")}
                                class="nav-link"
                            >
                                <span
                                    class="nav-link-icon d-md-none d-lg-inline-block"
                                    ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-social"
                                        ><path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        /><path
                                            d="M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                        /><path
                                            d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                        /><path
                                            d="M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                        /><path
                                            d="M12 14m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
                                        /><path d="M12 7l0 4" /><path
                                            d="M6.7 17.8l2.8 -2"
                                        /><path d="M17.3 17.8l-2.8 -2" /></svg
                                    >
                                </span>

                                <span class="nav-link-title">
                                    Redes Sociais
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>

    <div class="page-wrapper">
        <!-- Page header -->
        <div class="page-header d-print-none">
            <div class="container-xl">
                <slot name="header" />
            </div>
        </div>

        <!-- Page body -->
        <div class="page-body">
            <div class="container-xl">
                <slot name="body" />
            </div>
        </div>

        <!-- Page additional content -->
        <slot name="additional" />

        <footer class="footer footer-transparent d-print-none">
            <div class="container-xl">
                <div
                    class="row text-center align-items-center flex-row-reverse"
                >
                    <div class="col-lg-auto ms-lg-auto">
                        <ul class="list-inline list-inline-dots mb-0">
                            <li class="list-inline-item">
                                <a href="./license.html" class="link-secondary"
                                    >Licença</a
                                >
                            </li>

                            <li class="list-inline-item">
                                <a
                                    href="https://github.com/dorivaldovalentim/personal-manager"
                                    target="_blank"
                                    class="link-secondary"
                                    rel="noopener">Código</a
                                >
                            </li>

                            <li class="list-inline-item">
                                <a
                                    href="https://github.com/sponsors/dorivaldovalentim"
                                    target="_blank"
                                    class="link-secondary"
                                    rel="noopener"
                                >
                                    <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon text-pink icon-filled icon-inline"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path
                                            d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                                        />
                                    </svg>
                                    Patrocinar
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 col-lg-auto mt-3 mt-lg-0">
                        <ul class="list-inline list-inline-dots mb-0">
                            <li class="list-inline-item">
                                Copyright &copy; 2023
                                <a
                                    href="https://tabler.io"
                                    class="link-secondary">Tabler</a
                                >. Todos os direitos reservados
                            </li>

                            <li class="list-inline-item">
                                <a
                                    href="./changelog.html"
                                    class="link-secondary"
                                    rel="noopener"
                                >
                                    v1.0.0-beta19
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>
