# How to Upgrade React Version

## Check Current Version

### package.json

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### Terminal

```bash
# Check installed version
npm list react

# Check latest available
npm view react version
```

### Browser Console

```javascript
React.version  // "18.2.0"
```

## Upgrade Steps

### 1. Prepare

```bash
# Create backup branch
git checkout -b upgrade-react
git commit -am "Before React upgrade"
```

### 2. Update React

```bash
# npm - latest version
npm install react@latest react-dom@latest

# npm - specific version
npm install react@19.0.0 react-dom@19.0.0

# yarn
yarn add react@latest react-dom@latest
```

### 3. Update Related Packages

```bash
# TypeScript types
npm install @types/react@latest @types/react-dom@latest

# Common packages to update
npm install react-router-dom@latest
npm install @testing-library/react@latest
```

### 4. Clean Install

```bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Fresh install
npm install
```

### 5. Test

```bash
npm test
npm run dev
```

## React 19 Upgrade

### Installation

```bash
npm install react@19 react-dom@19
npm install @types/react@19 @types/react-dom@19
```

### Key Changes

1. **ref as prop** - No forwardRef needed
2. **use() hook** - Read Promises/Context in render
3. **useActionState** - Replaces useFormState
4. **useOptimistic** - Optimistic updates
5. **Context as Provider** - `<Context>` instead of `<Context.Provider>`

### Codemods

```bash
npx codemod@latest react/19/migration-recipe
```

## Troubleshooting

### Peer Dependency Errors

```bash
npm install --legacy-peer-deps
```

### Version Mismatch

```bash
# Check versions match
npm list react react-dom

# Install matching versions
npm install react@19 react-dom@19
```

### Cache Issues

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Version Compatibility

| React Version | Node.js | Key Features |
|--------------|---------|--------------|
| 19.x | 18+ | use(), Actions, ref prop |
| 18.x | 14+ | Concurrent, useTransition |
| 17.x | 10+ | Gradual upgrades |
| 16.8+ | 10+ | Hooks |

## Best Practices

1. **Read release notes** before upgrading
2. **Test thoroughly** after upgrade
3. **Use git branches** for upgrades
4. **Commit lock files** (package-lock.json)
5. **Update incrementally** for major versions
