# Basic testing script
<!-- You can erase any parts of this template you deem not applicable. -->
This testing script serves as a basic manual testing procedure to follow when testing new features or conducting regression tests. 
Only end-to-end scenarios along a 'happy path' are being tested.

Preconditions are fulfilled:
- [ ] Browser: latest Chrome
- [ ] Environment: testing
- [ ] Test user exists but is initially signed out
- [ ] Browser data has been cleared prior to testing

## Testing scenarios
### Create flow

- [ ] I can create a flow with name 'basic test' and description 'desc'.
- [ ] I am redirected to a new flow with respective name and description, am in the context of the first trigger step setup and can see service catalog for selecting a trigger
- [ ] I can't deploy the flow.
- [ ] I can select and save the trigger RSS -> URL Config and am redirected to the 'Configure Trigger' screen.
- [ ] I can enter a URL and continue to the 'Test Trigger' screen. 
- [ ] I can 'Skip Test and Finish' and am prompted to 'Add Action'
- [ ] I can still not deploy the flow.


### Retested issues
<!-- 
Please copy previously reported issues as task list here and reset them. Tick off, if retest was done. 
If issue is not fixed, copy to 'Discovered issues' section below. 
Default: '[x] none' 
-->
- [x] none

### Discovered issues
<!-- 
Please add any discovered issues as task list here and link bug report type issues here as you create them (only required for larger issues). 
Can be subsequently ticked off as they're being fixed.
Default: '[x] none' 
-->
- [x] none

### Other comments
<!-- 
Please add any other comments or observations that could be helpful in solving any issues discovered. 
Default: none 
-->
None
