import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../src/assets/i18n/en.json";
import uk from "../src/assets/i18n/uk.json";

export default i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: en
            },
            uk: {
                translation: uk
            }
        },
        lng: localStorage.getItem('locale') ?? 'uk',
        fallbackLng: "uk",

        interpolation: {
            escapeValue: false
        }
    })