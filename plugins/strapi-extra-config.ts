export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	
	nuxtApp._cookies.strapi_jwt.value = config.app.strapi.token;
});
