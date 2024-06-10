import './bootstrap';

import { createInertiaApp } from '@inertiajs/svelte'
import "@tabler/core/dist/css/tabler.min.css";
import "@tabler/core/dist/css/tabler-vendors.min.css";
import "@tabler/core/dist/css/demo.min.css";
import "@tabler/core/dist/js/tabler.min";
import "@tabler/core/dist/js/demo-theme";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} » ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.svelte')
        return pages[`./Pages/${name}.svelte`]()
    },
    setup({ el, App }) {
        new App({ target: el, hydrate: true })
    },
    progress: {
        color: '#4B5563',
    },
})