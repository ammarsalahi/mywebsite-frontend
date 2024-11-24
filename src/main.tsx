import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './components/styles/index.css';
import './components/styles/cooperation.css';
import './components/styles/list.css';
import './components/styles/detail.css'
import './components/styles/about.css'
import './components/styles/carousel.css'
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import "./i18n.ts"

import { RecoilRoot } from 'recoil'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
       <App />
    </RecoilRoot>
  </React.StrictMode>,
)
