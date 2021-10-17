# 2020-07-18 vCloud - Create a local user

The available ```Roles``` for an org is found in the call ```https://vdc.company.com/api/admin/org/ORGID```

```xml
POST https://vdc.company.com/api/admin/org/11111111-2222-3333-4444-555555555555/users
Accept: application/*+xml;version=31.0
Content-Type: application/vnd.vmware.admin.user+xml
x-vcloud-authorization: THE_TOKEN

<?xml version="1.0" encoding="UTF-8" ?>
<User xmlns="http://www.vmware.com/vcloud/v1.5" name="User" operationKey="operationKey">
	<IsEnabled>true</IsEnabled>
	<IsLocked>false</IsLocked>
	<IsExternal>false</IsExternal>
	<ProviderType>INTEGRATED</ProviderType>
	<StoredVmQuota>10</StoredVmQuota>
	<DeployedVmQuota>5</DeployedVmQuota>
	<Role
                href="https://vdc.company.com/api/admin/org/11111111-2222-3333-4444-555555555555/role/61616161-1212-1212-9999-0a0a0a0a0a0a"
                name="Organization Administrator"
                type="application/vnd.vmware.admin.role+xml"/>
	<Password>pass1234</Password>
</User>

```

## Create an AD User

This is not really creating, more of "connecting". A tip is to ignore this call and to create the just the AD Security Group instead. Any user logging on that has access through an AD Security Group will automatically:

a) be created in vCloud
b) inherit the rights set for the AD Group

```xml
POST https://vdc.company.com/api/admin/org/11111111-2222-3333-4444-555555555555/users
Accept: application/*+xml;version=31.0
Content-Type: application/vnd.vmware.admin.user+xml
x-vcloud-authorization: THE_TOKEN

<?xml version="1.0" encoding="UTF-8" ?>
<User xmlns="http://www.vmware.com/vcloud/v1.5" name="Username_or_email" operationKey="operationKey">
	<IsEnabled>true</IsEnabled>
	<IsLocked>false</IsLocked>
	<IsExternal>false</IsExternal>
	<StoredVmQuota>10</StoredVmQuota>
	<DeployedVmQuota>5</DeployedVmQuota>
	<Role
                href="https://vdc.company.com/api/admin/org/11111111-2222-3333-4444-555555555555/role/61616161-1212-1212-9999-0a0a0a0a0a0a"
                name="Organization Administrator"
                type="application/vnd.vmware.admin.role+xml"/>
</User>

```

## Programatically create AD Connection

Use this call to seup syncing between AD and the vCloud Org. There is as of time of writing, no way of doing LDAP Search filtering so all objects will be synced (and nothing outside of the target OU can be synced)

* TheADServerHostName = ad.company.com
* SearchBase = path to OU where this org has it's customers. Example "OU=test,OU=Customers,DC=company,DC=com"
* Username/Password = The service account which has access to read the AD and sync users

```xml
POST https://vdc.company.com/api/admin/org/ORGID/vdcsparams
Accept: application/*+xml;version=31.0
Content-Type: application/vnd.vmware.admin.createVdcParams+xml
x-vcloud-authorization: THE_TOKEN

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<OrgLdapSettings xmlns:vcloud="http://www.vmware.com/vcloud/v1.5">
<OrgLdapMode>CUSTOM</OrgLdapMode>
	<CustomOrgLdapSettings>
		<HostName>${TheADServerHostName}</HostName>
		<Port>389</Port>
		<SearchBase>${SearchBase}</SearchBase>
		<UserName>${iUsername}</UserName>
		<Password>${iPassword}</Password>
		<AuthenticationMechanism>SIMPLE</AuthenticationMechanism>
		<GroupSearchBase></GroupSearchBase>
		<IsGroupSearchBaseEnabled>false</IsGroupSearchBaseEnabled>
		<ConnectorType>ACTIVE_DIRECTORY</ConnectorType>
		<UserAttributes>
			<ObjectClass>user</ObjectClass>
			<ObjectIdentifier>objectGuid</ObjectIdentifier>
			<UserName>sAMAccountName</UserName>
			<Email>mail</Email>
			<FullName>displayName</FullName>
			<GivenName>givenName</GivenName>
			<Surname>sn</Surname>
			<Telephone>telephoneNumber</Telephone>
			<GroupMembershipIdentifier>dn</GroupMembershipIdentifier>
			<GroupBackLinkIdentifier>tokenGroups</GroupBackLinkIdentifier>
		</UserAttributes>
		<GroupAttributes>
			<ObjectClass>group</ObjectClass>
			<ObjectIdentifier>dn</ObjectIdentifier>
			<GroupName>cn</GroupName>
			<Membership>member</Membership>
			<MembershipIdentifier>objectGuid</MembershipIdentifier>
			<BackLinkIdentifier>objectSid</BackLinkIdentifier>
		</GroupAttributes>
		<UseExternalKerberos>false</UseExternalKerberos>
	</CustomOrgLdapSettings>
</OrgLdapSettings>
```

## Enjoy

:)
