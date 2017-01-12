Dependencies Maintenance
========================

angular-webpack2-starter
------------------------

[See project wiki](https://github.com/qdouble/angular-webpack2-starter/wiki/Recommended-Steps-for-Merging-Starter-into-Existing-Project)

1. Create new branch `git checkout -b starter-updates`
2. Pull in changes `git pull starter no-universal-support`
3. Review changes, resolve merge conflicts
4. Run `npm run clean` and `yarn install`

How to keep angular-webpack2-starter upgradable
- put any custom config into `src/constants.js`
- put global app imports, declarations, providers and routes into their respective
  `app.*.ts` file

Material 2 shims
----------------

As of November 2016, Angular Material 2 does not yet implement layout directives.
Certain components such as "dialog" are still missing too. We therefore use 
ng2-material which provides us with shims for these missing features. As soon
as a component becomes available in the official Angular Material 2, it usually
gets removed from ng2-material. Eventually we can get rid of it completely.

Usage
See [docs](https://justindujardin.github.io/ng2-material/#/components/dialog).
Current unresolved issues:
- importing directives as described in the docs doesn't work:
  `import {MATERIAL_DIRECTIVES} from 'ng2-material';` 

Update
- `ng2-material.css` contains `screen\0` syntax which makes node-sass throw an
  exception. There's no fix for this yet in place and after updating the module,
  This syntax must be corrected manually to `screen`.