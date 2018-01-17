import Typography from 'typography'
import twinPeaksTheme from 'typography-theme-twin-peaks'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import verticalRhythm from 'compass-vertical-rhythm'
import {brandColor, accentColor, linkColor, baseFontColor} from './colors.js'


const mobileVr = verticalRhythm({
  baseFontSize: '14px',
  baseLineHeight: '22.75px',
})


const fppTheme = Object.assign({}, twinPeaksTheme, {
  name: 'fppTheme',
  includeNormalize: true,
  baseFontSize: '16px',
  baseLineHeight: 1.625,
  googleFonts: [
      {
        name: 'Open Sans',
        styles: ['300', '400', '400i', '600'],
      },
    ],
  headerFontFamily: ['Open Sans', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'sans-serif'],
  bodyColor: baseFontColor,
  headerWeight: '300',
  headerColor: brandColor,
  overrideThemeStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    a: {
      color: linkColor,
      textShadow: 'none',
      backgroundImage: 'none',
    },
    '.s-editable a:not([class])': {
      color: linkColor,
      fontWeight: 'bold',
      textDecoration: 'none',
      textShadow:
        '.03em 0 #fff,-.03em 0 #fff,0 .03em #fff,0 -.03em #fff,.06em 0 #fff,-.06em 0 #fff,.09em 0 #fff,-.09em 0 #fff,.12em 0 #fff,-.12em 0 #fff,.15em 0 #fff,-.15em 0 #fff', // eslint-disable-line
      backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, currentColor 1px, currentColor 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
    },
    '.s-editable a:not([class]):hover,.s-editable a:not([class]):active': {
      color: accentColor,
      backgroundImage: 'none',
      textShadow: 'none',
    },
    blockquote: {
      borderLeftColor: accentColor,
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 1.354
    },
    [MOBILE_MEDIA_QUERY]: {
      html: {
        ...mobileVr.establishBaseline(),
      },
      blockquote: {
        borderLeft: `${rhythm(3 / 16)} solid ${accentColor}`,
        paddingLeft: rhythm(9 / 16),
        fontStyle: 'italic',
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
      },
    },
  })
})

const typography = new Typography(fppTheme)

export default typography
