export type syncAForkBranchWithTheUpstreamRepository = {
  "branch": ""
} 

export type createAnIssue = {
  "title": "",
  "body": "",
  "assignees": "",
  "milestone": "",
  "labels": ""
} 

export type updateAnIssue = {
  "title": "",
  "body": "",
  "assignees": "",
  "milestone": "",
  "state": "",
  "labels": ""
} 

export type lockAnIssue = {
  "lock_reason": ""
} 

export type addAssigneesToAnIssue = {
  "assignees": ""
} 

export type removeAssigneesFromAnIssue = {
  "assignees": ""
} 

export type createARepositoryWebhook = {
  "name": "",
  "active": "",
  "events": "",
  "config": ""
} 

export type updateARepositoryWebhook = {
  "active": "",
  "add_events": ""
} 

export type updateAWebhookConfigurationForARepository = {
  "content_type": "",
  "url": ""
} 