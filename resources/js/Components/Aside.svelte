<script>
    import { page, Link } from "@inertiajs/svelte";
</script>

<aside class="fixed-top card py-3">
    <div class="card-body">
        <div class="d-flex flex-column justify-content-between h-100">
            <div class="text-center">
                <div
                    class="img-container border rounded-circle border-light border-3 overflow-hidden w-50 mx-auto mb-2"
                >
                    <img
                        src={$page.props.profile.image ?? "/avatar.jpg"}
                        alt="Foto de Perfil"
                        class="w-100"
                    />
                </div>

                <h1 class="name fw-bold fs-2">{$page.props.profile.name}</h1>

                <h2 class="fs-3">
                    {$page.props.profile.title ?? "Fullstack Developer"}
                </h2>

                <div class="d-flex flex-wrap justify-content-center gap-2">
                    {#each $page.props.social_networks || [] as item}
                        <a
                            href={item.link}
                            class="social-button d-flex align-items-center justify-content-center border border-dark text-white rounded-circle"
                            target="_blank"
                        >
                            {@html item.icon}
                        </a>
                    {/each}
                </div>

                <hr />

                <h2>Resumo</h2>

                <div>
                    {@html $page.props.profile.excerpt ?? "Sem descrição"}
                </div>
            </div>

            <div class="text-center">
                <Link class="btn btn-outline-light w-75 rounded-pill"
                    >Contactar</Link
                >
            </div>
        </div>
    </div>
</aside>

<style>
    aside {
        width: 250px;
        height: calc(100vh - 40px);
        top: 50%;
        bottom: 50%;
        left: 20px;
        transform: translateY(-50%);
        background: #ffffff22 0% 0% no-repeat padding-box;
        border: 0.30000001192092896px solid #ffffff66;
        border-radius: 10px;
    }

    .name {
        color: #d8ae5e;
    }

    .social-button {
        width: 40px;
        height: 40px;
        filter: invert(1) brightness(1);
    }
</style>
