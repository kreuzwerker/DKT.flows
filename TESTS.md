Unit Tests
==========

Containers
----------

FlowsAppComponent
- should load the flow data for the current flow ID in the route
- should select the requested step from the current step ID in the route
- should select the first flow step if there is no current step ID in the route
- should show FlowHome by default
- should list all flow steps

FlowsHomeComponent
- init:
  - should set step stage to null

SelectServiceComponent
- init:
  - should set step stage to "select"
- on select service OR flow step has a service selected:
  - should show current selected service in right sidebar
  - should show the flow step config navigation
- step has no service selected:
  - should hide right sidebar

ConfigureStepComponent
- init:
  - should set step stage to "configure"

TestServiceComponent
- init:
  - should set step stage to "test"

ProvidersComponent
- init:
  - should load all available providers
- on select provider:
  - set current selected provider
  - select service
  - open/close service detail

Components
----------

FlowHeaderComponent (no specs)

FlowStepConfigNav
- Cancel button click should unselect the current flow step
- Continue button click should redirect to 'configure' stage for current step

FlowStepItemComponent
- should list the available options for the given step
  => test option states: active, locked
- I can select a service step

FlowStepNavButtons
- back(): should call router with given backPath
- continue(): should call router with given backPath

ProviderDetailComponent
- should display the service icon, name and description
- step is the first flow step
  - the 'Trigger' tab should be preselected
  - selecting a 'Action' service step should not be possible and trow a warning
- step is not the first flow step
  - the 'Actions' tab should be preselected
  - selecting a 'Trigger' service step should not be possible and trow a warning
- step has no service step
  - the first service step from the list should be preselected
- step has a service step
  - the step's service step should be selected
- I can close the dialog

ProviderIcon (no specs)

ProviderItem
- select(): should emit event

ServiceItem (no specs)

LoadingIndicator (no specs)

Services
--------

FlowsAppService
FlowsStateService
FlowsApiService

Utility Helpers
---------------

Provider
Service
Step

State
-----

FlowAppActions
flowAppReducer
