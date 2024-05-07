<script setup>
    import Layout from "@/Layouts/Auth.svelte";
    import { useForm } from "@inertiajs/svelte";
    import InputError from "@/Components/InputError.svelte";

    let form = useForm({
        email: null,
        password: null,
        remember: false,
    });

    const submit = () => {
        $form
            .transform((data) => ({
                ...data,
                remember: data.remember ? "on" : "",
            }))
            .post("/login");
    };
</script>

<Layout title="Iniciar Sessão">
    <div class="card card-md">
        <div class="card-body">
            <h2 class="h2 text-center mb-4">Iniciar Sessão</h2>

            <form on:submit|preventDefault={submit}>
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail</label>
                    <input
                        bind:value={$form.email}
                        type="email"
                        id="email"
                        class="form-control"
                        placeholder="exemplo@email.com"
                        required
                        autocomplete="username"
                    />

                    {#if $form.errors.email}
                        <InputError message={$form.errors.email} />
                    {/if}
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label"> Senha </label>

                    <div class="input-group input-group-flat">
                        <input
                            bind:value={$form.password}
                            type="password"
                            id="password"
                            class="form-control"
                            placeholder="Senha"
                            required
                            autocomplete="current-password"
                        />
                    </div>

                    {#if $form.errors.password}
                        <InputError message={$form.errors.password} />
                    {/if}
                </div>

                <div>
                    <label class="form-check">
                        <input
                            bind:value={$form.remember}
                            type="checkbox"
                            class="form-check-input"
                            name="remember"
                        />
                        <span class="form-check-label"
                            >Manter sessão iniciada</span
                        >
                    </label>
                </div>

                <div class="form-footer">
                    <button
                        type="submit"
                        class="btn btn-primary w-100"
                        disabled={$form.processing}
                    >
                        Iniciar Sessão
                    </button>
                </div>
            </form>
        </div>
    </div>
</Layout>
