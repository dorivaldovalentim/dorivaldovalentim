<script>
    import Layout from "@/Layouts/App.svelte";
    import { useForm, router } from "@inertiajs/svelte";
    import InputError from "@/Components/InputError.svelte";
    import { onMount } from "svelte";
    import TomSelect from "tom-select/dist/js/tom-select.complete";
    import "tom-select/dist/css/tom-select.bootstrap4.min.css";
    import Editor from "@tinymce/tinymce-svelte";
    import Dropzone from "dropzone";
    import "dropzone/dist/basic.css";
    import "dropzone/dist/dropzone.css";

    const API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

    export let portfolio = [];
    export let clients = [];
    export let skills = [];
    export let technologies = [];
    export let errors = {};

    let dropzone;
    let value = portfolio.description;

    let selects = [
        { id: "clients", items: [] },
        { id: "skills", items: [] },
        { id: "technologies", items: [] },
    ];

    let form = useForm({
        name: portfolio.name,
        excerpt: portfolio.excerpt,
        clients: portfolio.clients?.map((client) => client.id),
        skills: portfolio.skills?.map((skill) => skill.id),
        technologies: portfolio.technologies?.map((tech) => tech.id),
        file: null,
    });

    onMount(() => {
        selects.forEach((item) => {
            let el = document.querySelector(`#${item.id}-select`);

            let selectItem = new TomSelect(el, {
                plugins: ["drag_drop", "remove_button"],
            });

            selectItem.on("change", (value) => {
                $form[item.id] = value;
            });

            selectItem.addItems($form[item.id]);
        });

        dropzone = new Dropzone("#dropzone", {
            uploadMultiple: false,
            maxFiles: 1,
            addRemoveLinks: true,
        });

        dropzone.on("addedfile", (file) => {
            $form.file = file;
        });

        let mockFile = { name: portfolio.cover?.name };
        dropzone.displayExistingFile(
            mockFile,
            `/storage/${portfolio.cover?.path}`,
        );
    });

    const update = () => {
        router.post(route("portfolio.update", portfolio.id), {
            _method: "put",
            forceFormData: true,
            ...$form,
            description: value,
        });
    };
</script>

<Layout title="Portfólio">
    <svelte:fragment slot="header">
        <div class="row g-2 align-items-center">
            <div class="col">
                <!-- Page pre-title -->
                <div class="page-pretitle">Overview</div>
                <h2 class="page-title">Portfólio</h2>
            </div>

            <div class="col-auto ms-auto d-print-none">
                <div class="btn-list">
                    <button
                        type="submit"
                        form="portfolio-form"
                        class="btn btn-primary d-none d-sm-inline-block"
                    >
                        <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon me-0"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#fff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"
                            />
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        </svg>
                    </button>

                    <button
                        type="submit"
                        form="portfolio-form"
                        class="btn btn-primary d-sm-none btn-icon"
                        aria-label="Novo portfólio"
                    >
                        <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon me-0"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#fff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"
                            />
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="body">
        <form on:submit|preventDefault={update} id="portfolio-form">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nome</label>
                        <input
                            bind:value={$form.name}
                            type="text"
                            id="name"
                            class:is-invalid={errors.name}
                            class="form-control"
                            placeholder="Nome"
                        />

                        {#if errors.name}
                            <InputError message={errors.name} />
                        {/if}
                    </div>

                    <div class="mb-3">
                        <label for="excerpt" class="form-label">Resumo</label>
                        <textarea
                            bind:value={$form.excerpt}
                            type="text"
                            id="excerpt"
                            class:is-invalid={errors.excerpt}
                            class="form-control"
                            placeholder="Resumo"
                            rows="5"
                        ></textarea>

                        {#if errors.excerpt}
                            <InputError message={errors.excerpt} />
                        {/if}
                    </div>
                </div>

                <div class="col-md-6">
                    <!-- Additional fields for relationships -->
                    <div class="mb-3">
                        <label for="clients" class="form-label">Clientes</label>
                        <select
                            type="text"
                            class:is-invalid={errors.clients}
                            placeholder="Clientes"
                            class="form-select"
                            id="clients-select"
                            multiple="multiple"
                        >
                            {#each clients as client}
                                <option value={client.id}>
                                    {client.name}
                                </option>
                            {/each}
                        </select>

                        {#if errors.clients}
                            <InputError message={errors.clients} />
                        {/if}
                    </div>

                    <div class="mb-3">
                        <label for="skills" class="form-label"
                            >Habilidades</label
                        >
                        <select
                            type="text"
                            class:is-invalid={errors.skills}
                            placeholder="Habilidades"
                            class="form-select"
                            id="skills-select"
                            multiple="multiple"
                        >
                            {#each skills as skill}
                                <option value={skill.id}>
                                    {skill.skill}
                                </option>
                            {/each}
                        </select>

                        {#if errors.skills}
                            <InputError message={errors.skills} />
                        {/if}
                    </div>

                    <div class="mb-3">
                        <label for="technologies" class="form-label"
                            >Tecnologias</label
                        >

                        <select
                            type="text"
                            class:is-invalid={errors.technologies}
                            placeholder="Tecnologias"
                            class="form-select"
                            id="technologies-select"
                            multiple="multiple"
                        >
                            {#each technologies as technology}
                                <option value={technology.id}>
                                    {technology.technology}
                                </option>
                            {/each}
                        </select>

                        {#if errors.technologies}
                            <InputError message={errors.technologies} />
                        {/if}
                    </div>
                </div>

                <div class="col-12">
                    <div class="mb-3">
                        <Editor apiKey={API_KEY} bind:value language="pt_PT" />

                        {#if errors.description}
                            <InputError message={errors.description} />
                        {/if}
                    </div>

                    <div class="card mb-3">
                        <div class="card-body">
                            <h3 class="card-title">Imagem</h3>
                            <div
                                action="./"
                                id="dropzone"
                                class="dropzone dz-clickable"
                            >
                                <div class="dz-default dz-message">
                                    <button class="dz-button" type="button"
                                        >Arraste ou clique para fazer o upload</button
                                    >
                                </div>
                            </div>

                            {#if errors.file}
                                <InputError message={errors.file} />
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </svelte:fragment>
</Layout>
