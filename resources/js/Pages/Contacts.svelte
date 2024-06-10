<script>
    import Layout from "@/Layouts/App.svelte";
    import { useForm } from "@inertiajs/svelte";
    import InputError from "@/Components/InputError.svelte";
    import Editor from "@tinymce/tinymce-svelte";

    const API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

    let value;
    let form = useForm({
        name: null,
        email: null,
        phone: null,
        description: null,
    });

    const store = () => {
        $form
            .transform((data) => ({
                ...data,
                description: value,
            }))
            .post(route("contact.store"), {
                onSuccess: () => {
                    reset();
                },
            });
    };

    const reset = () => {
        $form.reset();
    };
</script>

<Layout title="Contactos">
    <form on:submit|preventDefault={store} class="row">
        <div class="col-12 col-md-6 mb-3">
            <input
                bind:value={$form.name}
                type="text"
                id="name"
                class:is-invalid={$form.errors.name}
                class="form-control"
                placeholder="Nome"
                required
            />

            {#if $form.errors.name}
                <InputError message={$form.errors.name} />
            {/if}
        </div>

        <div class="col-12 col-md-6 mb-3">
            <input
                bind:value={$form.email}
                type="email"
                id="email"
                class:is-invalid={$form.errors.email}
                class="form-control"
                placeholder="E-mail"
                required
            />

            {#if $form.errors.email}
                <InputError message={$form.errors.email} />
            {/if}
        </div>

        <div class="col-12 col-md-12 mb-3">
            <input
                bind:value={$form.phone}
                type="text"
                id="phone"
                class:is-invalid={$form.errors.phone}
                class="form-control"
                placeholder="Telefone"
                required
            />

            {#if $form.errors.phone}
                <InputError message={$form.errors.phone} />
            {/if}
        </div>

        <div class="col-12 col-md-12 mb-3">
            <Editor apiKey={API_KEY} bind:value language="pt_PT" />

            {#if $form.errors.description}
                <InputError message={$form.errors.description} />
            {/if}
        </div>

        <button
            type="submit"
            class="btn btn-primary"
            class:opacity-25={$form.processing}
            disabled={$form.processing}>Enviar</button
        >
    </form>
</Layout>
