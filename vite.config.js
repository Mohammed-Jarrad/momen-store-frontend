import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest: {
				name: "Momen Store",
				short_name: "Momen Store",
				start_url: "./",
				display: "standalone",
				background_color: "#00a28a",
				lang: "ar",
				scope: "./",
				theme_color: "#00a28a",
				prefer_related_applications: true,
				icons: [
					{
						src: "/icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				description: "online market",
				categories: ["marketing", "mobiles", "market", "online"],
				orientation: "any",
				shortcuts: [
					{
						name: "الطلبات",
						url: "/orders",
						description: "طلبات المستخدم",
					},
					{
						name: "السلة",
						url: "/cart",
						description: "سلة المنتجات",
					},
				],
				screenshots: [
					{
						src: "",
						sizes: "",
						label: "",
						platform: "",
						type: "",
					},
				],
				dir: "rtl",
				display_override: ["window-controls-overlay"],
			},
		}),
	],
})
