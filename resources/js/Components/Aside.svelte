<script>
    import { Link } from "@inertiajs/svelte";
</script>

<aside class="fixed-top card py-3">
    <div class="card-body d-flex">
        <div class="d-flex flex-column justify-content-between">
            <div class="text-center">
                <div
                    class="img-container border rounded-circle border-light border-3 overflow-hidden w-50 mx-auto mb-2"
                >
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Foto de Perfil"
                        class="w-100"
                    />
                </div>

                <h1 class="name fw-bold fs-2">Dorivaldo Valentim</h1>

                <h2 class="fs-3">Fullstack Developer</h2>

                <div class="d-flex flex-wrap justify-content-center gap-2">
                    {#each [{}, {}, {}, {}] as item}
                        <a
                            href="https://github.com/dorivaldovalentim"
                            class="social-button d-flex align-items-center justify-content-center border border-light text-white rounded-circle"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#000000"
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
                                    d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"
                                    stroke-width="0"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                    {/each}
                </div>

                <hr />

                <h2>Resumo</h2>

                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur placeat, asperiores maiores numquam incidunt
                    temporibus tempore nemo odit. Qui, impedit?
                </p>
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
    }
</style>
