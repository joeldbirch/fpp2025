import React from 'react'

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'en' })

  setHeadComponents([
    <link key="preconnect-fonts" rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />,
    <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link key="preconnect-assets" rel="preconnect" href="https://assets.fppdesign.com.au" crossOrigin="anonymous" />,
    <link key="preconnect-jsdelivr" rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />,
  ])
}
