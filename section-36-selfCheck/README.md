# Section 36 — Self Check

Practice answers for the React self-check questions. Each question lives in `src/` as its own subfolder — same pattern as [section-30-react-testing](../section-30-react-testing).

## How to run an example

1. Open `src/App.jsx`
2. Uncomment the `export` for the example you want
3. Comment out all other exports
4. Run `npm run dev`

| # | Folder | Question |
|---|--------|----------|
| 01 | [src/01-lifecycle-hooks](./src/01-lifecycle-hooks) | Can you explain the React component lifecycle using hooks? |
| 02 | [src/02-controlled-form](./src/02-controlled-form) | Can you build a form with controlled inputs? |
| 03 | [src/03-usememo-vs-usecallback](./src/03-usememo-vs-usecallback) | When would you use `useMemo` vs `useCallback`? |
| 04 | [src/04-custom-hook](./src/04-custom-hook) | Can you extract shared logic into a custom hook? |
| 05 | [src/05-nested-routes](./src/05-nested-routes) | Can you set up React Router with nested routes? |
| 06 | [src/06-integrator-ui](./src/06-integrator-ui) | Can you read and understand a React component in integrator-ui? |
| 07 | [src/07-redux-data-flow](./src/07-redux-data-flow) | Can you explain the Redux data flow? |
| 08 | [src/08-create-slice-rtk](./src/08-create-slice-rtk) | Can you write a `createSlice` with RTK? |
| 09 | [src/09-saga-api-call](./src/09-saga-api-call) | Can you trace how a saga handles an API call? |
| 10 | [src/10-memoized-selector](./src/10-memoized-selector) | Can you write a memoized selector with `createSelector`? |
| 11 | [src/11-tailwind-responsive-layout](./src/11-tailwind-responsive-layout) | Can you build a responsive layout with Tailwind utility classes? |
| 12 | [src/12-mui-sx-prop](./src/12-mui-sx-prop) | Can you customize an MUI component using the `sx` prop? |
| 13 | [src/13-storybook-fuse-ui](./src/13-storybook-fuse-ui) | Can you run Storybook for fuse-ui and browse the components? |
| 14 | [src/14-render-and-assert](./src/14-render-and-assert) | Can you write a test that renders a component and asserts on its output? |
| 15 | [src/15-getby-findby-queryby](./src/15-getby-findby-queryby) | Do you know the difference between `getBy`, `findBy`, and `queryBy`? |
| 16 | [src/16-msw-api-mock](./src/16-msw-api-mock) | Can you mock an API call using MSW? |
| 17 | [src/17-redux-saga-test-plan](./src/17-redux-saga-test-plan) | Can you test a Redux saga with `redux-saga-test-plan` when needed? |
| 18 | [src/18-test-coverage](./src/18-test-coverage) | Can you run `yarn test --coverage` and read the coverage report? |
| 19 | [src/19-trace-ticket-flow](./src/19-trace-ticket-flow) | Can you trace a ticket from route to component to store to API call? |
| 20 | [src/20-explain-file-changes](./src/20-explain-file-changes) | Can you explain the main files you changed and why? |
| 21 | [src/21-clean-pr-review](./src/21-clean-pr-review) | Can you open a clean PR and address review comments? |
| 22 | [src/22-mentored-ticket-readiness](./src/22-mentored-ticket-readiness) | Are you ready to take a second small mentored ticket with less guidance? |
| 23 | [src/23-webpack-loader-vs-plugin](./src/23-webpack-loader-vs-plugin) | Can you explain what a Webpack loader does vs a plugin? |
| 24 | [src/24-webpack-entry-output](./src/24-webpack-entry-output) | Can you read `webpack.config.js` and identify the entry point and output? |
| 25 | [src/25-eslint-rule](./src/25-eslint-rule) | Can you add an ESLint rule and run `yarn lint` to verify it? |
| 26 | [src/26-i18next-translation-keys](./src/26-i18next-translation-keys) | Can you explain how i18next translation keys map to displayed text? |
| 27 | [src/27-husky-pre-commit](./src/27-husky-pre-commit) | Do you understand how Husky pre-commit hooks work? |
| 28 | [src/28-compound-component-pattern](./src/28-compound-component-pattern) | Can you explain the compound component pattern? |
| 29 | [src/29-storybook-csf3](./src/29-storybook-csf3) | Can you write a Storybook story in CSF3 format? |
| 30 | [src/30-react-devtools-performance](./src/30-react-devtools-performance) | Can you identify a performance bottleneck using React DevTools? |
| 31 | [src/31-github-actions-workflow](./src/31-github-actions-workflow) | Can you read a GitHub Actions workflow file and understand the steps? |
| 32 | [src/32-jira-ticket-minimal-support](./src/32-jira-ticket-minimal-support) | Are you ready to pick up a small JIRA ticket with minimal support? |
| 33 | [src/33-css-box-model-flexbox-grid](./src/33-css-box-model-flexbox-grid) | Can you explain the CSS box model and build a responsive layout using flexbox or grid? |
| 34 | [src/34-async-api-fetch](./src/34-async-api-fetch) | Can you write an async function that fetches data from an API? |
| 35 | [src/35-map-filter-reduce](./src/35-map-filter-reduce) | Can you use map, filter, and reduce on an array? |
| 36 | [src/36-typed-interface-api-response](./src/36-typed-interface-api-response) | Can you define a typed interface for an API response? |
| 37 | [src/37-interface-vs-type](./src/37-interface-vs-type) | Do you understand the difference between interface and type? |

Each subfolder contains `App.jsx`, `App.css`, and `README.md`. Add your practice code inside the relevant `App.jsx`.

## Tailwind CSS

Tailwind v4 is configured project-wide. Use utility classes in any example:

- `tailwind.config.js` — content paths for all `src/**/*.{js,jsx}` files
- `vite.config.js` — `@tailwindcss/vite` plugin
- `src/index.css` — `@import "tailwindcss"` + `@config`
