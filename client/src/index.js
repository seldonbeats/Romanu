import React, {Suspense}  from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalContextProvider } from "./Context/GlobalContext";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux';
import { StateProvider } from "./Context/StateProvider";
import { initialState } from "./Context/initalState";
import reducer from "./Context/reducer";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import store from './store';


 //Localisaton
 i18n
 .use(initReactI18next) // passes i18n down to react-i18next
 .use(LanguageDetector)
 .use(HttpApi)
 .init({
   supportedLngs: ['en','ru','kz'],
   fallbackLng: "en",
   detection: {
     order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
     caches: ['cookie']
   },
   backend: {
    loadPath: '/assets/languages/{{lng}}/translation.json',
   },
   

 });

ReactDOM.render(
  <Suspense>
  <React.StrictMode>
    <Router>
    <GlobalContextProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
      <Provider store={store}>

        <App />

      </Provider>
      </StateProvider>
      </GlobalContextProvider>
    </Router>
  </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);


