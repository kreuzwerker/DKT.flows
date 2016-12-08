Unit Tests
==========

Containers
----------

The flows app
- should load the flow data for the current flow ID in the route
- should select the requested step from the current step ID in the route
- should select the first flow step if there is no current step ID in the route
- should by default show FlowHome
- should list all flow steps

Select service step view
- should load all available services
- on select service / step has a service selected:
  - should show current selected service in right sidebar
  - should show the flow step config navigation
- step has no service selected:
  - should hide right sidebar


Components
----------

A flow steps list item
- should list the available options for the given step
  => test option states: active, locked
- I can select a service step

Select service step dialog
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

Flow config navigation
- Cancel button click should unselect the current flow step
- Continue button click should redirect to 'configure' stage for current step


Services
--------

FlowsAppService

FlowsStateService

FlowsApiService

Actions / Reducers
------------------