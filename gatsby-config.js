module.exports = {
  siteMetadata: {
    title: 'Faster Pussycat Productions',
    subtitle: 'Data fetched from WordPress',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: '/src/utils/typography.js',
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        /*
          * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
          * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
          */
        baseUrl: "fppdesignwp.dev.au",
        // The protocol. This can be http or https.
        protocol: "https",
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the asumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
        // This feature is untested for sites hosted on Wordpress.com.
        // Defaults to true.
        useACF: true,
        auth: {
          // If auth.user and auth.pass are filled, then the source plugin will be allowed
          // to access endpoints that are protected with .htaccess.
          // htaccess_user: "your-htaccess-username",
          // htaccess_pass: "your-htaccess-password",
          // htaccess_sendImmediately: false,

          // If hostingWPCOM is true then you will need to communicate with wordpress.com API
          // in order to do that you need to create an app (of type Web) at https://developer.wordpress.com/apps/
          // then add your clientId, clientSecret, username, and password here
          // wpcom_app_clientSecret:
          //   "NMPnXYFtj2gKas7V1kZyMxr7oLry9V5ZxIyBQGu2txjVHg0GhFz6RYcKopkHICYg",
          // wpcom_app_clientId: "54793",
          wpcom_user: "dev",
          wpcom_pass: "eP6ek0vaV8Fag5dA",
        },
        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems
        verboseOutput: true,
        // Search and Replace Urls across WordPress content
        searchAndReplaceContentUrls: {
          sourceUrl: "https://fppdesignwp.dev.au",
          replacementUrl: "https://fppdesign-2018.dev.au",
        },
      },
    },
  ],
}
