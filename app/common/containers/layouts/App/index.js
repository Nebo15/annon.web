import React from 'react';
import Helmet from 'react-helmet';

export default ({ children }) => (<div>
  <Helmet
    htmlAttributes={{ lang: 'ru', amp: undefined }} // amp takes no value
    titleTemplate="API Gateway - %s"
    defaultTitle="API Gateway"
    link={[
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/icons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', href: '/images/icons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/images/icons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'manifest', href: '/images/icons/manifest.json' },
      { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#2c83b5' },
      { rel: 'shortcut icon', href: '/favicon.ico?v=213' },
    ]}
    meta={[
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'keywords', content: 'api gateway, validation, proxy' },
      { name: 'description', content: 'Proxy server, what can validate request, control access and more.' },
      { property: 'og:title', content: 'API Gateway' },
      { property: 'og:site_name', content: 'API Gateway' },
      { property: 'og:description', content: 'Proxy server, what can validate request, control access and more.' },
      { name: 'apple-mobile-web-app-title', content: 'API Gateway' },
      { name: 'application-name', content: 'API Gateway' },
      { name: 'msapplication-TileColor', content: '#2b5797' },
      { name: 'msapplication-TileImage', content: '/images/icons/mstile-150x150.png' },
      { name: 'msapplication-config', content: '/images/icons/browserconfig.xml' },
      { name: 'theme-color', content: '#ffffff' },
    ]}
  />
  { children }
</div>);
