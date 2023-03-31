import en from '../assets/languages/en.json'
import ru from '../assets/languages/ru.json'
import kz from '../assets/languages/kz.json'
import { initReactI18next } from "react-i18next";
import i18n from 'i18next'


const resources = {
	en: {
		translation: en,
	},
	ru: {
		translation: ru,
	},
	kz: {
		translation: kz,
	},
};

i18n
.use(initReactI18next)
.init({
    resources,
    lng:JSON.parse(localStorage.getItem('language')),
    fallbackLng:'ru'
})

export default i18n;