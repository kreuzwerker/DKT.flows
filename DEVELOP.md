Development guidelines
======================

Application structure
---------------------

The application consists of four main modules that are decoupled from each other:
- `flows`
- `tasks`
- `notifications`
- `dashboard`

This separation allows for lazy-loading of application code which results in 
a more scalable architecture as well as faster loading times.

Code that needs to be shared across multiple modules goes here:
- `core`
- `users`

Module structure
----------------

Avoid deep nested structures resulting from grouping things by their functions
in the application. Instead group by functions in the architecture:
(adapted from [rangle.io guidelines](https://github.com/rangle/angular2-guidelines#3-directory-structure))

```
module
|-- actions
|-- assets
|-- containers
|-- components
|-- models
|-- pipes
|-- reducers
|-- services
|-- utils
```

* **utils**: contains the majority of business logic, implemented as plain 
  JavaScript libraries, and is the initial source of application functionality.
* **actions**: contains Redux action helpers.
* **assets**: contains non-code assets to be bundled with the module.
* **containers**: contains stateful, and often routable, components that pass 
down data and behaviour-encapsulating callbacks to presentational components 
(and sometimes other containers).
* **components**: contains state-less view components that take data "from above" 
and present a UI.
* **reducers**: contains Redux reducers.
* **models**: contains TypeScript types for an entity/
* **services**: contains `/utils` libraries wrapped in Angular 2 services.
* **pipes**: contains `/utils` libraries wrapped in Angular 2 pipes.

Application state
-----------------

State is shared across all modules in a central application state store.

Each module takes care of managing its own state under `state.[module]`, e.g.
`state.flows`. It provides an API for getting and setting module-specific state 
in `[module]/[module]-state.service.ts`.
