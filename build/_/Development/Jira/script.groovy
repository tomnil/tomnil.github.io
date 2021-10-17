// *************************************************
// * Main script
// *************************************************

def issuetype = issue.fields.issuetype.name;

logger.info("${issue.key} (${issuetype}) is processed...")

// *************************************************
// * Do we have a subtask? If so, update the parent
// *************************************************

if (issuetype=="Subtask")
{
    // *************************************************
    // * Find subtasks with my parent
    // *************************************************

    def parentKey = issue.fields.parent.key

    logger.info("Found subtask; parent = ${parentKey}");

    def subTasks = get("/rest/api/2/search")
            .queryString("jql", "parent=${parentKey}")
            .queryString("fields", "timetracking")
            .asObject(Map)
            .body
            .issues as List<Map>

    logger.info("Total subtasks for ${parentKey}: ${subTasks.size()}")

    // *************************************************
    // * Calculate the number of hours left in the subtasks
    // *************************************************

    def hours=0;
    for(subTask in subTasks){
        if (subTask.fields.timetracking){
            def hoursForThisSubTask = subTask.fields.timetracking.remainingEstimateSeconds.div(60).div(60);
            logger.info("{$subTask.key} : ${hoursForThisSubTask} hours.");   
            hours+=(hoursForThisSubTask); 
        }
    }

    def asStoryPoints = Math.round(hours+0.5);  // Round up :)
    logger.info("Calculated story points: ${asStoryPoints}");

    // *************************************************
    // * Determinate field name for "Story Points" (it's a custom field)
    // *************************************************

    def allFields = get('/rest/api/2/field')
            .asObject(List)
            .body as List<Map>

    def storyPointField = allFields.find { it.name == "Story point estimate" };

    if (storyPointField){
    
        def storyPointFieldName = storyPointField.id;
        logger.info("Story Point field found: ${storyPointFieldName}")
        
        // *************************************************
        // * Update the parent task
        // *************************************************

        logger.info("");
        logger.info("Storing ${asStoryPoints} Story Points into ${parentKey}...");    
        logger.info("");
        
        def result = put("/rest/api/2/issue/${parentKey}")
                .header('Content-Type', 'application/json')
                .body([
                fields: [
                    (storyPointFieldName): asStoryPoints
                ]
        ]).asString()
    
        assert result.status >= 200 && result.status < 300

        // *************************************************
        // * All done
        // *************************************************

        logger.info("All done.");    

    } else {
        throw new Exception("Aborting: Cannot find custom fields; update source code to match the name of the Story Point field.")
    }
  
} else {

    logger.info("- Skipped (not a subtask)");

}
