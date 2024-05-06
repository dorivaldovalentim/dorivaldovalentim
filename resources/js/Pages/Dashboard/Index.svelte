<script>
    import Layout from "@/Layouts/Dashboard.svelte";
</script>

<Layout title="Dashboard">
    <svelte:fragment slot="header">
        <div class="row g-2 align-items-center">
            <div class="col">
                <!-- Page pre-title -->
                <div class="page-pretitle">Overview</div>
                <h2 class="page-title">Dashboard</h2>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="body">Home</svelte:fragment>
</Layout>
