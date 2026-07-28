# Incremental migration with hardcoded interstitial, EmDash deferred

The migration proceeds in two milestones. Milestone 1 replaces Gatsby with Astro while keeping the WordPress backend — a drop-in SSG swap that provides an immediate upgrade. Content for representative page types is hardcoded first, then WordPress wiring replaces it page-by-page. Milestone 2 introduces EmDash CMS on Cloudflare, building on Astro's existing data layer.

**Decision**: defer EmDash until the Astro + WordPress build is complete and deployable.

**Why not go straight to EmDash**: debugging CMS schema, GraphQL queries, and Astro templates simultaneously with no visual feedback is high-risk. The hardcoded interstitial gives immediate visual feedback, and the WordPress wiring validates the data layer before swapping the backend.
