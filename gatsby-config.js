var excludedRoutes = require('./data/excludedWPRoutes.js')

module.exports = {
  siteMetadata: {
    title: 'Faster Pussycat Productions',
    subtitle: 'The home of fast and furry-ous design',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: require.resolve('./src/utils/typography.js'),
      },
    },
    // Temporarily disabled for build troubleshooting
    // {
    //   resolve: 'gatsby-source-wordpress',
    //   options: {
    //     baseUrl: 'admin.fppdesign.com.au',
    //     protocol: 'https',
    //     hostingWPCOM: false,
    //     useACF: true,
    //     auth: {
    //       htaccess_user: 'cat',
    //       htaccess_pass: 'seabird-away-bedside',
    //       htaccess_sendImmediately: false,
    //     },
    //     verboseOutput: true,
    //     excludedRoutes: excludedRoutes,
    //   },
    // },
    // Temporarily disabled for build troubleshooting (Sharp conflict)
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: 'Faster Pussycat Productions',
    //     short_name: 'FPP Design',
    //     start_url: '/',
    //     background_color: '#ffffff',
    //     theme_color: '#599e01',
    //     display: 'minimal-ui',
    //     icons: [
    //       {
    //         src: '/icons/icon-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/icons/icon-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //     ],
    //     //icon: "src/img/icon.png" // This path is relative to the root of the site.
    //   },
    // },
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
  ],
}
