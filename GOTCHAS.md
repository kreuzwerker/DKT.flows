**Component stylesUrls** referencing newly created sass style sheet
-> webpack won’t find it and throw “Expected ‘styles’ array"
Fix: generate css file via `npm run sass`
https://github.com/qdouble/angular-webpack2-starter/issues/2
https://github.com/webpack/style-loader/issues/123

**Template parse error** with "Can't bind to 'X' since it isn't a known property".
Fix: check if `CommonModule` got imported.

**Template parse error** with "'X' is not a known element".
Fix: check if `MaterialModule` got imported.

Why modules need to take care of loading their dependencies (self-encapsulation): [Stack Overflow](http://stackoverflow.com/questions/39159792/angular2-app-module-with-root-level-imports/39186107#39186107)