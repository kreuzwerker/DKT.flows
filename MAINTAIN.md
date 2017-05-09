Dependencies Maintenance
========================

angular-webpack2-starter
------------------------

[See project wiki](https://github.com/qdouble/angular-webpack2-starter/wiki/Recommended-Steps-for-Merging-Starter-into-Existing-Project)

1. Create new branch `git checkout -b starter-updates`
2. Pull in changes `git pull starter no-universal-support`
3. Review changes, resolve merge conflicts.
   Remove `yarn.lock` as it usually contains too many merge conflicts.
4. Run `npm run clean` and `yarn install` (re-generates `yarn.lock`).

How to keep angular-webpack2-starter upgradable
- put any custom config into `src/constants.js`
- put global app imports, declarations, providers and routes into their respective
  `app.*.ts` file
