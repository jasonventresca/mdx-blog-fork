Jason Ventresca's fork of Mdx blog based on Supabase Auth Template

## How to use create a new project from this repo
1. `git clone <this-repo> new-repo-name>`
2. `cd new-repo-name`
3. `git remote remove origin`
4. `# Go to github.com and create the corresponding new repo there.`
5. `git remote add origin <new-github-repo-origin`
6. `git push -u origin main`

## Key Changes introduced by Jason Ventresca

- The `main` branch is pretty much the same; but I've upgraded the version of Next.js to remediate a critical vulnerability (1 Apr 2025). Note that you'll have to set up Supabase to get it working, which I haven't tried yet. See branch below.

- The `removing-contact-form-and-supabase-etc` branch actually works without setting up a Supabase account, creating the necessary tables, etc. The additional changes introduced in this branch were basically gutting the Auth (login), Contact form and the LikeButton from the app, so that there's no functionality that tries to query Supabase.

### Notes from learning the hard way

- Run `npm run prebuild` to regenerate the posts cache. This should be done after blog posts are added/removed.


## Original README from forked repo below
npx create-next-app -e with-supabase

MDXBlog has been updated to incorporate the latest features of **Next.js 15**. The new release focuses on performance, security, and modern development capabilities.

**Key Updates in Next.js 15:**

- **Async Request APIs**: Breaking change to caching—fetch requests and GET routes are no longer cached by default. Improves control over rendering and caching.
- **React 19 Support**: Next.js 15 supports React 19, introducing improved hydration error handling and experimental React Compiler integration. However, we have opted to downgrade to React 18.3.1 to ensure compatibility with a wider range of dependencies.
- **Turbopack Dev**: Faster builds and stable development performance improvements.
- **unstable_after API**: Experimental API to execute code after response streaming.
- **Caching Semantics**: Updated caching for fetch, GET handlers, and client navigation.
- **instrumentation.js API**: Server lifecycle observability for debugging and monitoring.
- **next.config.ts**: Full TypeScript support for configuration files.
- **Server Actions Security**: Secure endpoints and automatic cleanup of unused actions.

The updated code is currently in beta and available for testing.

**GitHub Repo:** [N15-Site-Template](https://github.com/owolfdev/N15-Site-Template)

fix
