# 2020-04-03 Jira Cloud PUT/POST Examples

## Updating a custom field

```http
PUT https://SITENAME.atlassian.net/rest/api/3/issue/SAN-8 HTTP/1.1
Content-Type: application/json
Authorization: Basic <HIDDEN>

{
  "fields": {
    "customfield_10016": 111
  }
}
```

## Adding work to a worklog

```http
POST https://SITENAME.atlassian.net/rest/api/latest/issue/SAN-8/worklog HTTP/1.1
Content-Type: application/json
Authorization: Basic <HIDDEN>

{
"timeSpentSeconds": "5400",
"timespent": "-1h 30m",
"started": "2013-09-01T10:30:18.932+0530",
"comment": "logging via api"
}
```
