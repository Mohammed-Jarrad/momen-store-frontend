import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import arTranslate from "./locale/ar.json"
import heTranslate from "./locale/he.json"
import LanguageDetector from "i18next-browser-languagedetector"

let resources = {
	ar: {
		translation: arTranslate,
	},
	he: {
		translation: heTranslate,
	},
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "ar",
		debug: true,
		lng: "",
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
	})

export default i18n
