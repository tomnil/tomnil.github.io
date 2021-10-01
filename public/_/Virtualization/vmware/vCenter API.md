# 2019-09-09 vCenter API using curl - tips & tricks

## Swagger

The swagger should be found at:

```HTTP
https://vcenter.company.com/apiexplorer/#
```

## Login

```bash
curl -k -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "vmware-use-header-authn: VCENTER_TOKEN" --header "vmware-api-session-id: null" "https://vcenter.company.com/rest/com/vmware/cis/session" -u "username@thecompany.com:thepassword"
```

returns a token:

```json
{"value":"9ec2407a933e3f744ad2f21111222222"}
```

Keep track of this value, you will need to pass it to all other functions.

## Get info about VM

Pass the moref of the machine you want info (in this case "vm-1212")

```bash
curl -X GET --header 'Accept: application/json' --header 'vmware-api-session-id: THE_TOKEN' 'https://vcenter.company.com/rest/vcenter/vm/vm-1212'
```

## VM tags

A tag typically looks like: "urn:vmomi:InventoryServiceTag:11111111-2222-3333-4444-555555555555:GLOBAL"

### Get list of available tags

```bash
curl -k -X GET --header "Accept: application/json" --header "vmware-api-session-id: THE_TOKEN" "https://vcenter.company.com/rest/com/vmware/cis/tagging/tag"
```

### Get Detailed info about a tag

```bash
curl -k -X GET --header "Accept: application/json" --header "vmware-api-session-id: THE_TOKEN" "https://vcenter.company.com/rest/com/vmware/cis/tagging/tag/id:urn%3Avmomi%3AInventoryServiceTag%3Ac25ff3f4-e0a4-4a15-ba50-7e5f4dbf21f8%3AGLOBAL"
```

### List all machines with a specific tag

```bash
curl -k -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "vmware-api-session-id: bb82b3df37d625f56cc76af316fc98af" "https://vcenter.company.com/rest/com/vmware/cis/tagging/tag-association/id:urn%3Avmomi%3AInventoryServiceTag%3A11111111-2222-3333-4444-555555555555%3AGLOBAL?~action=list-attached-objects"
```

Returns:

```json
{
  "value": [
    {
      "id": "vm-1111",
      "type": "VirtualMachine"
    },
    {
      "id": "vm-1212",
      "type": "VirtualMachine"
    }
  ]
}
```

### List tags for a specific machine

```bash
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'vmware-api-session-id: 002659d3331319147c4fa5cb627f6036' -d '{ \
   "object_id": { \
     "type": "VirtualMachine", \
     "id": "vm-1212" \
   } \
 }' 'https://vcenter.company.com/rest/com/vmware/cis/tagging/tag-association?~action=list-attached-tags'
 ```

 Returns:

 ```json
 {
   "value": [
     "urn:vmomi:InventoryServiceTag:11111111-2222-3333-4444-555555555555:GLOBAL"
   ]
 }
 ```

## List tags for a list of machines

```http
https://vcenter.company.com/rest/com/vmware/cis/tagging/tag-association?~action=list-attached-tags-on-objects
```

payload:

```json
{
  "object_ids": [
    {
      "type": "VirtualMachine",
      "id": "vm-1212"
    }
  ]
}
```

returns:

```json
 {
  "value": [
    {
      "tag_ids": [
        "urn:vmomi:InventoryServiceTag:11111111-2222-3333-4444-555555555555:GLOBAL"
      ],
      "object_id": {
        "id": "vm-1212",
        "type": "VirtualMachine"
      }
    }
  ]
}
```
