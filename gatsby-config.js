require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'Faster Pussycat Productions',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
        sassOptions: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: require.resolve('./src/utils/typography.js'),
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: 'https://admin.fppdesign.com.au/graphql',
        auth: {
          htaccess: {
            username: process.env.HTACCESS_USER,
            password: process.env.HTACCESS_PASSWORD,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Faster Pussycat Productions',
        short_name: 'FPP Design',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#599e01',
        display: 'minimal-ui',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
  ],
}
