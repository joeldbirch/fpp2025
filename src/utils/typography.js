import Typography from 'typography'
import twinPeaksTheme from 'typography-theme-twin-peaks'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import verticalRhythm from 'compass-vertical-rhythm'
import {
  brandColor,
  dullBrandColor,
  accentColor,
  linkColor,
  baseFontColor
} from './colors.js'
import { RHYTHM } from './constants.js'


const mobileVr = verticalRhythm({
  baseFontSize: '16px',
  baseLineHeight: 1.625,
})


const fppTheme = Object.assign({}, twinPeaksTheme, {
  name: 'fppTheme',
  includeNormalize: true,
  baseFontSize: '16px',
  baseLineHeight: 1.625,
  googleFonts: [
      {
        name: 'Open Sans',
        styles: ['300', '400', '600'],
      },
    ],
  headerFontFamily: ['Open Sans', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'sans-serif'],
  bodyColor: baseFontColor,
  headerWeight: '300',
  headerColor: dullBrandColor,
  overrideThemeStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    hr: {
      background: 'transparent',
    },
    img: {
      height: 'auto',
      display: 'inline-block',
      verticalAlign: 'top',
      marginBottom: 0,
    },
    a: {
      color: linkColor,
      textShadow: 'none',
      backgroundImage: 'none',
    },
    '.s-editable a:not([class])': {
      color: linkColor,
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
    '.s-editable a:not([class]):hover,.s-editable a:not([class]):active': {
      color: accentColor,
    },
    blockquote: {
      borderLeftColor: accentColor,
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 1.354,
      marginBottom: `${RHYTHM}rem`,
      marginTop: `${RHYTHM * 2.5}rem`,
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
