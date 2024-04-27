<script>
    import { router } from "@inertiajs/svelte";

    const logout = () => {
        router.post(route("logout"));
        window.location = route("home");
    };
</script>

<main>
    Hello World!

    <form on:submit|preventDefault={logout}>
        <button type="submit" class="dropdown-item">Terminar Sessão</button>
    </form>
</main>
