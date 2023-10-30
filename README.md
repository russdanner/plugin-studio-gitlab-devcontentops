# Gitlab - CrafterCMS DevContentOps support
This plugin supports integrations with Gitlab based workflows

## Widgets

### Top Navigation Toolbar
- Toolbar Create/Approve/Merge toolbar button 
# Installation

Install the plugin via Studio's Plugin Management UI under `Site Tools` > `Plugin Management`.

## Install based on this repository

You can also install this plugin by cloning this repository and using the Studio API.

1. Create a Studio JWT Token.
2. Execute the following CURL command a terminal

```bash
curl --location --request POST 'http://SERVER_AND_PORT/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer THE_JWT_TOKEN_FOR_STUDIO' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "YOUR-SITE-ID",
  "path": "THE_ABSOLUTEL_FILE_SYSTEM_PATH_TO_THIS_REPO",
  "parameters": { }"apiKey": "your-key-here", "baseUrl":"https://gitlab.com"
}
```

# Widget Configuration Guide

## Toolbar Edit button

```xml
<widget id="org.rd.plugin.gitlab.CreateMergeRequest">
    <plugin id="org.rd.plugin.gitlab" site="{site}" type="apps" name="gitlab" file="index.js"/>
    <configuration>
        <useIcon>false</useIcon>
    
        <projectId>5781415</projectId>
        <sourceBranch>a-branch</sourceBranch>
        <targetBranch>master</targetBranch>
        <mrTitle>Approve Content Promotion via Studio</mrTitle>
        <createAndApproveMergeRequestLabel>Promote Content</createAndApproveMergeRequestLabel>
    </configuration>
</widget>
```
