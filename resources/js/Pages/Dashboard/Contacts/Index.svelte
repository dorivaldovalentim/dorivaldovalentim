<script>
    import Layout from "@/Layouts/Dashboard.svelte";
    import { onMount } from "svelte";
    import Modal from "@/Components/Modal.svelte";
    import { useForm, router } from "@inertiajs/svelte";
    import Editor from "@tinymce/tinymce-svelte";

    const API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;
    let value = null;

    export let contacts = [];

    let id = null;

    let form = useForm({
        name: null,
        email: null,
        phone: null,
        description: null,
    });

    onMount(() => {
        const modal = document.getElementById("modal-theme");
        modal.addEventListener("hidden.bs.modal", () => {
            reset();
        });
    });

    const show = (contact) => {
        router.get(route("contact.show", contact.id), {
            onSuccess: () => {
                fill(contact);
            },
        });
    };

    const destroy = (id) => {
        if (confirm("Tem a certeza que quer eliminar este contacto?")) {
            $form.delete(route("contact.destroy", id), {
                onSuccess: () => {
                    document.querySelector('[data-bs-dismiss="modal"]').click();
                    reset();
                },
            });
        }
    };

    const fill = (contact) => {
        id = contact.id;
        $form.name = contact.name;
        $form.email = contact.email;
        $form.phone = contact.phone;
        value = contact.description;
    };

    const reset = () => {
        id = null;
        $form.reset();
    };
</script>

<Layout title="Contactos">
    <svelte:fragment slot="header">
        <div class="row g-2 align-items-center">
            <div class="col">
                <!-- Page pre-title -->
                <div class="page-pretitle">Overview</div>
                <h2 class="page-title">Contactos</h2>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="body">
        <div class="row row-cards">
            {#each contacts as contact}
                <div class="col-12 col-md-6 col-lg-4">
                    <button
                        on:click={show(contact)}
                        data-bs-toggle="modal"
                        data-bs-target="#modal-theme"
                        class="card card-link card-link-rotate w-100"
                        ><div
                            class="card-status-top"
                            class:bg-success={contact.seen}
                            class:bg-danger={!contact.seen}
                        ></div>
                        <div class="card-body d-flex justify-content-between">
                            <p class="mb-0">{contact.name}</p>
                        </div>
                    </button>
                </div>
            {/each}
        </div>
    </svelte:fragment>

    <svelte:fragment slot="additional">
        <Modal title="Visualizar contacto" size="lg">
            <div class="row">
                <div class="col-12 col-md-4 mb-3">
                    <input
                        bind:value={$form.name}
                        type="text"
                        id="name"
                        class="form-control"
                        placeholder="Nome"
                        readonly
                        disabled
                    />
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <input
                        bind:value={$form.email}
                        type="text"
                        id="email"
                        class="form-control"
                        placeholder="Nome"
                        readonly
                        disabled
                    />
                </div>

                <div class="col-12 col-md-4 mb-3">
                    <input
                        bind:value={$form.phone}
                        type="text"
                        id="phone"
                        class="form-control"
                        placeholder="Nome"
                        readonly
                        disabled
                    />
                </div>

                <div class="col-12 mb-3">
                    <Editor apiKey={API_KEY} bind:value language="pt_PT" />
                </div>
            </div>

            <svelte:fragment slot="additionalActions">
                {#if id}
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                {/if}
            </svelte:fragment>
        </Modal>
    </svelte:fragment>
</Layout>
