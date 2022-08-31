/// <reference types="@sveltejs/adapter-cloudflare" />

declare namespace App {
	interface Platform {
		env?: {
			PRODUCTS: KVNamespace;
			CATEGORIES: KVNamespace;
			CONTENT: KVNamespace;
		};
	}
}
