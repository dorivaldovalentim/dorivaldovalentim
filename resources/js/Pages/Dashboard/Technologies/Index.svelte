<script>
    import Layout from "@/Layouts/Dashboard.svelte";
    import { useForm } from "@inertiajs/svelte";
    import { onMount } from "svelte";
    import Modal from "@/Components/Modal.svelte";
    import InputError from "@/Components/InputError.svelte";

    export let technologies = [];

    let id = null;

    let form = useForm({
        technology: null,
    });

    onMount(() => {
        const modal = document.getElementById("modal-theme");
        modal.addEventListener("hidden.bs.modal", () => {
            reset();
        });
    });

    const store = () => {
        $form.post(route("technology.store"), {
            onSuccess: () => {
                document.querySelector('[data-bs-dismiss="modal"]').click();
                reset();
            },
        });
    };

    const edit = (technology) => {
        fill(technology);
    };

    const update = () => {
        $form
            .transform((data) => ({
                ...data,
            }))
            .put(route("technology.update", id), {
                onSuccess: () => {
                    document.querySelector('[data-bs-dismiss="modal"]').click();
                    reset();
                },
            });
    };

    const destroy = (id) => {
        if (confirm("Tem a certeza que quer eliminar esta tecnologia?")) {
            $form.delete(route("technology.destroy", id), {
                onSuccess: () => {
                    document.querySelector('[data-bs-dismiss="modal"]').click();
                    reset();
                },
            });
        }
    };

    const fill = (technology) => {
        id = technology.id;
        $form.technology = technology.technology;
    };

    const reset = () => {
        id = null;
        $form.reset();
    };
</script>

<Layout title="Tecnologias">
    <svelte:fragment slot="header">
        <div class="row g-2 align-items-center">
            <div class="col">
                <!-- Page pre-title -->
                <div class="page-pretitle">Overview</div>
                <h2 class="page-title">Tecnologias</h2>
            </div>

            <div class="col-auto ms-auto d-print-none">
                <div class="btn-list">
                    <a
                        href="/"
                        class="btn btn-primary d-none d-sm-inline-block"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-theme"
                    >
                        <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon me-0"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"
                            ></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                    </a>

                    <a
                        href="/"
                        class="btn btn-primary d-sm-none btn-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-theme"
                        aria-label="Nova tarefa"
                    >
                        <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"
                            ></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="body">
        <div class="row row-cards">
            {#each technologies as technology}
                <div class="col-12 col-md-6 col-lg-4">
                    <button
                        on:click={edit(technology)}
                        data-bs-toggle="modal"
                        data-bs-target="#modal-theme"
                        class="card card-link card-link-rotate w-100"
                    >
                        <div class="card-body d-flex justify-content-between">
                            <p class="mb-0">{technology.technology}</p>
                        </div>
                    </button>
                </div>
            {/each}
        </div>
    </svelte:fragment>

    <svelte:fragment slot="additional">
        <form on:submit|preventDefault={id ? update : store}>
            <Modal title={id ? "Actualizar tecnologia" : "Nova tecnologia"}>
                <div class="mb-3">
                    <label for="technology" class="form-label">Tecnologia</label>
                    <input
                        bind:value={$form.technology}
                        type="text"
                        id="technology"
                        class:is-invalid={$form.errors.technology}
                        class="form-control"
                        placeholder="Tecnologia"
                        required
                    />

                    {#if $form.errors.technology}
                        <InputError message={$form.errors.technology} />
                    {/if}
                </div>

                <svelte:fragment slot="additionalActions">
                    {#if !id}
                        <button
                            type="submit"
                            class="btn btn-primary"
                            class:opacity-25={$form.processing}
                            disabled={$form.processing}
                        >
                            Nova tecnologia
                        </button>
                    {:else}
                        <a
                            on:click|preventDefault={() => destroy(id)}
                            href="/"
                            class="btn btn-danger"
                        >
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
                                class="icon icon-tabler icons-tabler-outline icon-tabler-trash me-0"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path
                                    d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                                />
                                <path
                                    d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                                />
                            </svg>
                        </a>

                        <button
                            type="submit"
                            class="btn btn-primary"
                            class:opacity-25={$form.processing}
                            disabled={$form.processing}
                        >
                            Actualizar tecnologia
                        </button>
                    {/if}
                </svelte:fragment>
            </Modal>
        </form>
    </svelte:fragment>
</Layout>
