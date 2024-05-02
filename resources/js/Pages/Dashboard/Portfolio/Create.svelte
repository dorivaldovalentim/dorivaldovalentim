<script>
    import Layout from "@/Layouts/App.svelte";
    import { useForm } from "@inertiajs/svelte";
    import InputError from "@/Components/InputError.svelte";

    export let clients = [];
    export let skills = [];
    export let technologies = [];

    let selectedClients = null;
    let selectedSkills = null;
    let selectedTechnologies = null;

    let form = useForm({
        name: null,
        excerpt: null,
        description: null,
        file_id: null,
        clients: [],
        skills: [],
        technologies: [],
    });

    const store = () => {
        console.log($form.clients);
        $form.post(route("portfolio.store"), {
            onSuccess: () => {
                // reset();
            },
        });
    };

    const reset = () => {
        $form.reset();
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
                    </button>
                </div>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="body">
        <form on:submit|preventDefault={store} id="portfolio-form">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nome</label>
                        <input
                            bind:value={$form.name}
                            type="text"
                            id="name"
                            class:is-invalid={$form.errors.name}
                            class="form-control"
                            placeholder="Nome"
                        />
                        {#if $form.errors.name}
                            <InputError message={$form.errors.name} />
                        {/if}
                    </div>

                    <div class="mb-3">
                        <label for="excerpt" class="form-label">Resumo</label>
                        <input
                            bind:value={$form.excerpt}
                            type="text"
                            id="excerpt"
                            class:is-invalid={$form.errors.excerpt}
                            class="form-control"
                            placeholder="Resumo"
                        />
                        {#if $form.errors.excerpt}
                            <InputError message={$form.errors.excerpt} />
                        {/if}
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label"
                            >Descrição</label
                        >
                        <textarea
                            bind:value={$form.description}
                            id="description"
                            class:is-invalid={$form.errors.description}
                            class="form-control"
                            placeholder="Descrição"
                            rows="4"
                        ></textarea>
                        {#if $form.errors.description}
                            <InputError message={$form.errors.description} />
                        {/if}
                    </div>

                    <!-- Additional fields for relationships -->
                    <div class="mb-3">
                        <label for="clients" class="form-label">Clientes</label>
                        <select
                            type="text"
                            bind:value={selectedClients}
                            on:change={() => ($form.clients.push(selectedClients))}
                            class:is-invalid={$form.errors.clients}
                            placeholder="Clientes"
                            class="form-select"
                            id="theme-select"
                            multiple="multiple"
                        >
                            {#each clients as client}
                                <option value={client.id}>
                                    {client.name}
                                </option>
                            {/each}
                        </select>
                        {#if $form.errors.clients}
                            <InputError message={$form.errors.clients} />
                        {/if}
                    </div>

                    <div class="mb-3">
                        <label for="skills" class="form-label"
                            >Habilidades</label
                        >
                        <select
                            type="text"
                            bind:value={selectedSkills}
                            on:change={() => ($form.skills.push(selectedSkills))}
                            class:is-invalid={$form.errors.skills}
                            placeholder="Habilidades"
                            class="form-select"
                            id="theme-select"
                            multiple="multiple"
                        >
                            {#each skills as skill}
                                <option value={skill.id}>
                                    {skill.skill}
                                </option>
                            {/each}
                        </select>

                        {#if $form.errors.skills}
                            <InputError message={$form.errors.skills} />
                        {/if}
                    </div>
                    <div class="mb-3">
                        <label for="technologies" class="form-label"
                            >Tecnologias</label
                        >
                        <select
                            type="text"
                            bind:value={selectedTechnologies}
                            on:change={() =>
                                ($form.technologies.push(selectedTechnologies))}
                            class:is-invalid={$form.errors.technologies}
                            placeholder="Tecnologias"
                            class="form-select"
                            id="theme-select"
                            multiple="multiple"
                        >
                            {#each technologies as technology}
                                <option value={technology.id}>
                                    {technology.technology}
                                </option>
                            {/each}
                        </select>
                        {#if $form.errors.technologies}
                            <InputError message={$form.errors.technologies} />
                        {/if}
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">Multiple File Upload</h3>
                            <form
                                class="dropzone dz-clickable"
                                id="dropzone"
                                action="./"
                                autocomplete="off"
                                novalidate=""
                            >
                                <div class="dz-default dz-message">
                                    <button class="dz-button" type="button"
                                        >Drop files here to upload</button
                                    >
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </svelte:fragment>
</Layout>
