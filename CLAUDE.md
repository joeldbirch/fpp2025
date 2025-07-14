# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby v2 static site for Faster Pussycat Productions (FPP Design) built in 2018, currently running on extremely outdated dependencies (Node 8, Gatsby 2.x) that require upgrading to Node 22 and modern versions.

**Critical**: This project uses hardcoded authentication credentials in `gatsby-config.js:41-42` for WordPress access. These should be moved to environment variables during the upgrade process.

## Architecture

### Content Management
- **WordPress Headless CMS**: Sources content from `admin.fppdesign.com.au` via `gatsby-source-wordpress`
- **Dynamic Page Generation**: Uses `gatsby-node.js` to create pages from WordPress content with GraphQL queries
- **Custom Fields**: Heavily uses WordPress ACF (Advanced Custom Fields) for sidebar management and page metadata

### Component Structure
- **Layout System**: React functional components with CSS Modules (`.module.scss`)
- **Base Components**: `TheWrap`, `TheBanner`, `TheMenu`, `TheFooter` form core layout
- **Content Components**: `BaseContentWrap`, `BaseMainColumn`, `BaseSideColumn` handle content layout
- **Sidebar System**: Dynamic sidebar widgets via `SidebarWidgetFactory` and WordPress data

### Styling Architecture
- **SASS/SCSS**: Comprehensive SCSS architecture in `src/sass/` with tools, settings, and framework bundles
- **CSS Modules**: Component-specific styles using `.module.scss` pattern
- **Typography**: Custom typography setup extending Twin Peaks theme with vertical rhythm
- **Responsive**: Uses typography breakpoint constants and compass vertical rhythm

## Development Commands

```bash
# Development server
npm run develop
# or alternatively: gatsby develop

# Production build
npm run build
# or alternatively: gatsby build

# Serve production build locally
npm run serve
# or alternatively: gatsby serve

# Clean Gatsby cache (useful for troubleshooting)
npm run cache
# or alternatively: rm -rf .cache

# Optimize CSS
npm run cssnano

# Optimize PNG icons
npm run icons
```

## Key Dependencies for Upgrade

Current versions are severely outdated:
- **Gatsby**: 2.3.7 → needs 5.x
- **React**: 16.8.6 → needs 18.x
- **Node SASS**: 4.11.0 → deprecated, replace with Dart Sass
- **Cross-env**: 5.2.0 → needs current version
- **gatsby-source-wordpress**: 3.0.51 → needs v6+ (major breaking changes)

## WordPress Integration Details

- **Base URL**: `admin.fppdesign.com.au` (HTTPS)
- **Authentication**: Currently hardcoded htaccess credentials (security concern)
- **ACF Integration**: Enabled for custom fields
- **Content Types**: Pages with custom sidebar configurations
- **Excluded Routes**: Managed via `data/excludedWPRoutes.js`

## Critical Files for Upgrade

1. **package.json**: All dependencies need major version updates
2. **gatsby-config.js**: WordPress source plugin configuration requires major changes for v6
3. **gatsby-node.js**: GraphQL schema changes needed for new gatsby-source-wordpress
4. **src/utils/typography.js**: Typography plugin API changes
5. **Component files**: React 18 compatibility checks needed

## Static Assets

- **Netlify Configuration**: `_headers` and `_redirects` in `/static/`
- **PWA Assets**: Icons and manifest configuration for progressive web app
- **Fonts**: Local font files in `src/fonts/`
- **Images**: Lazy loading with lazysizes library

## Upgrade Strategy Notes

1. **Incremental Approach**: Update Node.js first, then Gatsby core, then source plugins
2. **WordPress Plugin**: gatsby-source-wordpress v6 has breaking schema changes requiring GraphQL query updates
3. **SASS Migration**: Replace node-sass with sass (Dart Sass)
4. **React Updates**: Check component compatibility with React 18
5. **Security**: Move hardcoded credentials to environment variables immediately