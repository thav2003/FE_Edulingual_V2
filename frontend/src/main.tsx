import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider, App as AntApp } from 'antd'
import './index.css'
import './assets/styles/responsive.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#58CC02',
          colorPrimaryActive: '#58CC02',
          colorPrimaryHover: '#58CC02'
        },
        components: {
          Button: {},
          Input: {}
        }
      }}
    >
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>
)
