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
- [ ] I can select and save the trigger RSS -> 'URL Config' and am redirected to the 'Configure Trigger' screen.
- [ ] I can enter a URL and continue to the 'Test Trigger' screen. 
- [ ] I can 'Skip Test and Finish' and am prompted to 'Add Action'
- [ ] I can't deploy the flow.
- [ ] I can select and save the action RSS -> 'Fetch Article' and am redirected to the 'Configure Action' screen.
- [ ] I can continue to the 'Test Action' screen.
- [ ] I can 'Skip Test and Finish' and am prompted to 'Deploy Flow'
- [ ] I can deploy the flow successfully.
- [ ] I can visit 'Flows' (list) and can see the 'basic test' flow

### Trigger flow manually
Precondition is the successful completion of the 'Create flow' scenario. 

- [ ] I can trigger the 'basic test' flow manually on the flow edit screen by clicking on 'Trigger manually', am prompted to enter a payload and get a success message when clicking the OK button.
- [ ] I can trigger the 'basic test' flow manually on the flow edit screen by clicking on the play-icon, am prompted to enter a payload and get a success message when clicking the OK button.

### View flow log
Precondition is the successful completion of the 'Trigger flow manually' scenario. 

- [ ] I can access the flow logs from the flow edit screen and see a list of previous flow runs.
- [ ] I can use the context menu of the 'basic test' flow on the 'Flows' (list) screen to access the flow logs.
- [ ] When I manually trigger the flow at least 6 times, I can only see the most recent 5 flow run log items and can access older ones by clicking on 'Older'. I can successfully navigate the paginated list back to newer items by clicking on 'Newer'.

### Filter flow log
Preconditions: 
- successful completion of the 'Trigger flow manually' scenario. 
- Invalid URL for the 'URL Config' step configuration.

- [ ] When I trigger the flow manually at least once, I can see at least one error run log item.
- [ ] I can filter for error run log items only.
- [ ] I can filter for successful run log items only.
- [ ] I can view all log items.

### Add and remove action step
Precondition is the successful completion of the 'Create flow' scenario. 

- [ ] I can add and configure an RSS -> 'Extract Article' action step as the last step of the 'basic test' flow.
- [ ] I can't deploy the flow until I 'Skip Test and Finish'.
- [ ] I can deploy the flow.
- [ ] I can trigger the removal of the 'Extract Article' action step by clicking on the 'Remove Action' link and am being prompted for confirmation.
- [ ] I can remove the step by confirming the removal and am prompted to deploy the flow.
- [ ] I can deploy the flow successfully.

### Delete flow
Precondition is the successful completion of the 'Create flow' scenario. 
Note down or copy the flow URL.

- [ ] I can use the context menu of the 'basic test' flow to trigger deletion of the flow.
- [ ] I am prompted for confirmation to delete the flow.
- [ ] I can delete the flow and the 'basic test' flow is not visible when I visit 'Flows' (list).
- [ ] I can't access the flow by calling the flow url directly (as previously copied).

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
