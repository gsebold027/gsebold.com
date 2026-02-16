import enCommon from './en/common.json'
import enForms from './en/forms.json'
import enLandingPage from './en/landing-page.json'
import enNotFoundPage from './en/not-found-page.json'
import ptCommon from './pt/common.json'
import ptForms from './pt/forms.json'
import ptLandingPage from './pt/landing-page.json'
import ptNotFoundPage from './pt/not-found-page.json'

export const translations = {
  en: {
    common: enCommon,
    forms: enForms,
    'landing-page': enLandingPage,
    'not-found-page': enNotFoundPage
  },
  pt: {
    common: ptCommon,
    forms: ptForms,
    'landing-page': ptLandingPage.contact,
    'not-found-page': ptNotFoundPage
  }
}
