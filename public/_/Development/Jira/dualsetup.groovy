
def inputIssueID; //  = "SAN-9";

// *************************************************
// * Find the updated issueID
// *************************************************

// Do we have an issue object?
if (binding.hasVariable("issue")) {
	inputIssueID = issue.key;
} else {
	
	// No issue object, but maybe a worklog object?
	if (binding.hasVariable("worklog")) {
		inputIssueID=worklog.issueId;
	}
	else
	    throw new Exception("Aborting: Cannot find the issue.");
}
logger.info("Processing ${inputIssueID}...");

// *************************************************
// * Determinate field name for "Story Points" (it's a custom field)
// *************************************************

def storyPointFieldName = GetStoryPointFieldName();
if (!storyPointFieldName) {
    throw new Exception("Aborting: Cannot find custom fields; update source code to match the name of the Story Point field.")
    return;
}

// *************************************************
// * Get the issue with all it's details
// *************************************************

def issueToProcess=GetIssueDetails(inputIssueID);
def issuetype = issueToProcess.fields.issuetype.name;
logger.info("-----------------------------------------");
logger.info("${issueToProcess.key} (${issuetype}) is processed...")
logger.info("-----------------------------------------");

// *************************************************
// * If it's a subtask, then do more work
// *************************************************

switch (issuetype) {
    
    case "Subtask":

        // Update the storypoints for the subtask
        def hoursForSubtask = GetRemainingEstimateHours(issueToProcess);
        SaveStorypointsToIssue(issueToProcess.key, hoursForSubtask, storyPointFieldName);

        // Update the parent story points
        def parentKey = issueToProcess.fields.parent.key
        def subTasksOfParent = GetSubTasks(parentKey);
        def hours = SumRemainingEstimateHours(subTasksOfParent);
        def asStoryPoints = Math.round(hours+0.5);  // Round up :)
        logger.info("Calculated story points: ${asStoryPoints}");
        SaveStorypointsToIssue(parentKey, asStoryPoints, storyPointFieldName);
        break;    
    
    case "Story":

        def subTasks = GetSubTasks(issueToProcess.key);
        if (subTasks.size()==0){
            // No subtasks! Then the StoryPoints field is owned by the Story itself
            logger.info("No subtasks - updating story points field...");
            def hoursForStory = GetRemainingEstimateHours(issueToProcess);
            SaveStorypointsToIssue(issueToProcess.key, hoursForStory, storyPointFieldName);
            
        }
        else
            logger.info("Story points field owned by subtasks; no update done.");

        break;
}


logger.info("Done.");
return;

// -------------------------------------------------------------------------------



def GetIssueDetails(issueID){

    def issueResp = get("/rest/api/2/issue/${issueID}?expand=timetracking").asObject(Map)
    def issue = issueResp.body as Map
    if (issue.errorMessages)
        throw new Exception("${issue.errorMessages}");

    return issue;

}

def SumRemainingEstimateHours(subTasks){

    def hours=0;
    for(subTask in subTasks){
        hours+=(GetRemainingEstimateHours(subTask));
    }
    return hours;
}


def GetRemainingEstimateHours(forIssue) {

    def result=0;
    if (forIssue.fields.timetracking){
        result = forIssue.fields.timetracking.remainingEstimateSeconds.div(60).div(60);
    }

    logger.info("${forIssue.key} : ${result} hours.");   

    return result;
     
}


def GetSubTasks(parentKey){
    
    logger.info("Found subtask; parent = ${parentKey}");

    def subTasks = get("/rest/api/2/search")
            .queryString("jql", "parent=${parentKey}")
            .queryString("fields", "timetracking")
            .asObject(Map)
            .body
            .issues as List<Map>

    logger.info("Total subtasks for ${parentKey}: ${subTasks.size()}")
    
    return subTasks;

}

def GetStoryPointFieldName(){
    
    def allFields = get('/rest/api/2/field')
        .asObject(List)
        .body as List<Map>

    def storyPointField = allFields.find { it.name == "Story point estimate" };

    if (storyPointField){
    
        def storyPointFieldName = storyPointField.id;
        logger.info("Story Point field found: ${storyPointFieldName}")
        return storyPointFieldName;

    }
}


def SaveStorypointsToIssue(issueID, storypoints, storyPointFieldName) {

    logger.info("");
    logger.info("Storing ${storypoints} Story Points into ${issueID}...");    
    logger.info("");
    
    def result = put("/rest/api/2/issue/${issueID}")
            .header('Content-Type', 'application/json')
            .body([
            fields: [
                (storyPointFieldName): storypoints
            ]
    ]).asString()

    assert result.status >= 200 && result.status < 300

    return true;
}


def SaveEstimatedTimeLeftToIssue(issueID, iHours) {

    logger.info("");
    logger.info("Storing ${iHours} hours into EstimatedTimeLeft for ${issueID}...");    
    logger.info("");
    
  
    assert result.status >= 200 && result.status < 300

    return true;
}

