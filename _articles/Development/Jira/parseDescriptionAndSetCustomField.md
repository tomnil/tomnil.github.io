---
layout: article
title: Parse the description and update custom field
description:
date: 2021-02-16
tags: development jira
supertag: jira
---

## Incoming eMail

It's possible to configure Jira to automatically create (and update) issues from Email. Jira Cloud will render approximately this body:

```text
Text from email
/John Smith

[Created via e-mail received from: Tomas Nilsson <john@smith.com>]
```

### Parsing the description using ScriptRunner

```groovy
def inputIssueID = ""; 

// *********************************************************
// * Uncomment to run this in scriptrunners "Script Console" (while developing)
// * Comment if running under "Script listeners" (in production)
// *********************************************************

/*
inputIssueID = 'SUP-4'
def issueResp = get("/rest/api/2/issue/${inputIssueID}").asObject(Map)
def issue = issueResp.body as Map
*/

// *************************************************
// * Find the issue and try to extract the email
// *************************************************

def emailCustomFieldName="customfield_10048";       // Update this!

// Do we have an issue object?
if (binding.hasVariable("issue")) {
	inputIssueID = issue.key;
}

logger.info("Processing ${inputIssueID}...");

// Log the entire issue
logger.info(groovy.json.JsonOutput.toJson(issue));

// Get fields
def summary=issue.fields.summary
def description=issue.fields.description.toString();

// Find email created from description
def emailCreated=description.indexOf('[Created via e-mail received from');

if (emailCreated>0){
    def mailStart=description.indexOf('<', emailCreated);
    def mailEnd=description.indexOf('>', mailStart);
    
    // Found a valid email?
    if (mailStart>0 && mailEnd>mailStart) {

        // Yes, store into custom field
        def creatorMail=description.substring(mailStart+1, mailEnd)
        System.out.println("Found EMail: " + creatorMail + ". Storing in custom field.");
        
         def result = put("/rest/api/2/issue/${inputIssueID}")
                    .header('Content-Type', 'application/json')
                    .body([
                    fields: [
                        (emailCustomFieldName): creatorMail
                    ]
            ]).asString()
        
        logger.info(groovy.json.JsonOutput.toJson(result.status));
    }
}

logger.info("Done")
```

## Enjoy

:)
