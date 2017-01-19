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
|-- assets
|-- containers
|-- components
|-- models
|-- pipes
|-- services
|-- states
|-- utils
```

* **utils**: contains the majority of business logic, implemented as plain 
  JavaScript libraries, and is the initial source of application functionality.
* **assets**: contains non-code assets to be bundled with the module.
* **containers**: contains stateful, and often routable, components that pass 
down data and behaviour-encapsulating callbacks to presentational components 
(and sometimes other containers).
* **components**: contains state-less view components that take data "from above" 
and present a UI.
* **models**: contains TypeScript types for an entity/
* **services**: contains `/utils` libraries wrapped in Angular 2 services.
* **states**: contains Redux actions, reducers and effects for UI component states.
This can be one single state container for the entire module UI state, or multiple
state containers for each component UI state.
* **pipes**: contains `/utils` libraries wrapped in Angular 2 pipes.

Application UI state
--------------------

UI state is not persisted in a database. UI state can be local or shared. Local 
state is handled in Components using simple variables. Shared UI state however must
be managed in a central UI state (ngrx) store in combination with observables.

Typical UI states are: current selected list item, dialog open/closed, current
editing item before persisting it.

Application data state
----------------------

Application data state is generally persisted. We use the Apollo client for 
managing app data state in the client and automatically synchronising it to the
server.

Typical data states are all data models, i.e. flows, steps etc. as well as user-
specific settings that need to be persisted beyond the current session.

Working with application state
------------------------------

Each module should provide a central Service to retrieve and mutate both the 
application data and UI state in `services/[module]-state.service`, .e.g 
`services/flows-state.service`.
