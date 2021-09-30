// *************************************************
// * For debugging
// *************************************************

def mySubTask = 'MYTASK-123'
def issueResp = get("/rest/api/2/issue/${mySubTask}").asObject(Map)
def issue = issueResp.body as Map
