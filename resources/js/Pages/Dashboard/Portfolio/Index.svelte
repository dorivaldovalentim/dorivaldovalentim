<script>
    import Layout from "@/Layouts/Dashboard.svelte";
    import { Link } from "@inertiajs/svelte";

    export let portfolios = [];
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
                    <Link
                        href={route("portfolio.create")}
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
                    </Link>

                    <Link
                        href={route("portfolio.create")}
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
                    </Link>
                </div>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="body">
        <div class="row g-4">
            <div class="col-md-3">
                <form
                    action="./"
                    method="get"
                    autocomplete="off"
                    novalidate
                    class="sticky-top"
                >
                    <div class="form-label">Job Types</div>
                    <div class="mb-4">
                        <label class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                name="form-type[]"
                                value="1"
                                checked
                            />
                            <span class="form-check-label">Programming</span>
                        </label>
                        <label class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                name="form-type[]"
                                value="2"
                                checked
                            />
                            <span class="form-check-label">Design</span>
                        </label>
                        <label class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                name="form-type[]"
                                value="3"
                            />
                            <span class="form-check-label"
                                >Management / Finance</span
                            >
                        </label>
                        <label class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                name="form-type[]"
                                value="4"
                            />
                            <span class="form-check-label"
                                >Customer Support</span
                            >
                        </label>
                        <label class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                name="form-type[]"
                                value="5"
                            />
                            <span class="form-check-label"
                                >Sales / Marketing</span
                            >
                        </label>
                    </div>
                    <div class="form-label">Remote</div>
                    <div class="mb-4">
                        <label class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" />
                            <span class="form-check-label form-check-label-on"
                                >On</span
                            >
                            <span class="form-check-label form-check-label-off"
                                >Off</span
                            >
                        </label>
                    </div>
                    <div class="form-label">Salary Range</div>
                    <div class="mb-4">
                        <label class="form-check">
                            <input
                                type="radio"
                                class="form-check-input"
                                name="form-salary"
                                value="1"
                                checked
                            />
                            <span class="form-check-label">$20K - $50K</span>
                        </label>
                        <label class="form-check">
                            <input
                                type="radio"
                                class="form-check-input"
                                name="form-salary"
                                value="2"
                                checked
                            />
                            <span class="form-check-label">$50K - $100K</span>
                        </label>
                        <label class="form-check">
                            <input
                                type="radio"
                                class="form-check-input"
                                name="form-salary"
                                value="3"
                            />
                            <span class="form-check-label">> $100K</span>
                        </label>
                        <label class="form-check">
                            <input
                                type="radio"
                                class="form-check-input"
                                name="form-salary"
                                value="4"
                            />
                            <span class="form-check-label"
                                >Drawing / Painting</span
                            >
                        </label>
                    </div>
                    <div class="form-label">Immigration</div>
                    <div class="mb-4">
                        <label class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" />
                            <span class="form-check-label form-check-label-on"
                                >On</span
                            >
                            <span class="form-check-label form-check-label-off"
                                >Off</span
                            >
                        </label>
                        <div class="small text-muted">
                            Only show companies that can sponsor a visa
                        </div>
                    </div>
                    <div class="form-label">Location</div>
                    <div class="mb-4">
                        <select class="form-select">
                            <option>Anywhere</option>
                            <option>London</option>
                            <option>San Francisco</option>
                            <option>New York</option>
                            <option>Berlin</option>
                        </select>
                    </div>
                    <div class="mt-5">
                        <button class="btn btn-primary w-100">
                            Confirm changes
                        </button>
                        <a href="#" class="btn btn-link w-100">
                            Reset to defaults
                        </a>
                    </div>
                </form>
            </div>

            <div class="col-md-9">
                <div class="row row-cards">
                    <div class="space-y">
                        {#each portfolios as portfolio}
                            <!-- content here -->
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-auto">
                                        <div class="card-body">
                                            <Link
                                                href={route(
                                                    "portfolio.edit",
                                                    portfolio.id,
                                                )}
                                            >
                                                <div
                                                    class="avatar avatar-md"
                                                    style:background-image={`url(/storage/${portfolio?.cover?.path})`}
                                                ></div>
                                            </Link>
                                        </div>
                                    </div>

                                    <div class="col">
                                        <div class="card-body ps-0">
                                            <div class="row">
                                                <div class="col">
                                                    <h3 class="mb-0">
                                                        <Link
                                                            href={route(
                                                                "portfolio.edit",
                                                                portfolio.id,
                                                            )}
                                                        >
                                                            {portfolio.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md">
                                                    <div
                                                        class="mt-3 list-inline list-inline-dots mb-0 text-muted d-sm-block d-none"
                                                    >
                                                        <div
                                                            class="list-inline-item"
                                                        >
                                                            <!-- Download SVG icon from http://tabler-icons.io/i/building-community -->
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="icon icon-inline"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="2"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                ><path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                /><path
                                                                    d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8"
                                                                /><path
                                                                    d="M13 7l0 .01"
                                                                /><path
                                                                    d="M17 7l0 .01"
                                                                /><path
                                                                    d="M17 11l0 .01"
                                                                /><path
                                                                    d="M17 15l0 .01"
                                                                /></svg
                                                            >
                                                            {portfolio
                                                                .clients?.[0]
                                                                ?.name}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="mt-3 list mb-0 text-muted d-block d-sm-none"
                                                    >
                                                        <div class="list-item">
                                                            <!-- Download SVG icon from http://tabler-icons.io/i/building-community -->
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="icon icon-inline"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="2"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                ><path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                /><path
                                                                    d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8"
                                                                /><path
                                                                    d="M13 7l0 .01"
                                                                /><path
                                                                    d="M17 7l0 .01"
                                                                /><path
                                                                    d="M17 11l0 .01"
                                                                /><path
                                                                    d="M17 15l0 .01"
                                                                /></svg
                                                            >
                                                            CMS Max
                                                        </div>

                                                        <div class="list-item">
                                                            <!-- Download SVG icon from http://tabler-icons.io/i/license -->
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="icon icon-inline"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="2"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                ><path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                /><path
                                                                    d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11"
                                                                /><path
                                                                    d="M9 7l4 0"
                                                                /><path
                                                                    d="M9 11l4 0"
                                                                /></svg
                                                            >
                                                            Full-time
                                                        </div>
                                                        <div class="list-item">
                                                            <!-- Download SVG icon from http://tabler-icons.io/i/map-pin -->
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="icon icon-inline"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="2"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                ><path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                /><path
                                                                    d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
                                                                /><path
                                                                    d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
                                                                /></svg
                                                            >
                                                            Remote / USA
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-auto">
                                                    <div class="mt-3 badges">
                                                        {#each portfolio.technologies as technology}
                                                            <a
                                                                href="#"
                                                                class="badge badge-outline text-muted border fw-normal badge-pill"
                                                                >{technology.technology}</a
                                                            >
                                                        {/each}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </svelte:fragment>
</Layout>
