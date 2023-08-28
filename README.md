# Demonstrate WebPack build error after header-polyfill update

## Problem:

Last week MSW (and `header-polyfill`) were building fine under webpack

Today. The build was failing.

After some digging around, I found that the problem stems from a change made on the 27th of August in commit [feat: implements "getSetCookie" method on Headers](https://github.com/mswjs/headers-polyfill/commit/cff8faf4f92ba8cfc0e62d000ecde4eb78a0a491).

The change was very minor: [Line 73](https://github.com/mswjs/headers-polyfill/blame/main/src/Headers.ts#L73) was updated from
```ts
get(name: string): string | null {
  return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] || null
}
```
to
```ts
get(name: string): string | null {
  return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] ?? null
}
```

Unfortunately, this has had a significant, adverse effect on WebPack build process

## Steps to repoduce error;

1. Pull repo and navigate to repo root
2. run `npm install`;
3. run `npm run build`;

or run `./show-error.sh` This will:
* run npm install
* show the problem code,
* run the build to demonstrate the error
* update the problem code to fix the error
* re-run the build to show the problem has ben fix
* revert the change so the code is back to how it was.

The error now throw:
```text
ERROR  Failed to compile with 1 error10:30:39 pm

 error  in ./node_modules/headers-polyfill/lib/index.mjs

Module parse failed: Unexpected token (71:64)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|   }
|   get(name) {
>     return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] ?? null;
|   }
|   set(name, value) {

 @ ./node_modules/msw/lib/index.js 147:30-57 304:31-58 542:31-58 549:31-58 574:31-58 927:31-58 1002:31-58 1005:31-58 1610:31-58
 @ ./src/mocks/browser.js
 @ ./src/main.js
 @ multi ./src/main.js

 ERROR  Build failed with errors.
```
