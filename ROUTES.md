
## Frontend Routes (All GET requests)

/ - Index page
/login - Render login page
/passwords - Render Users personal passwords
/passwords/new_password - Generates a new password for the user

/orgs - Renders the users organizations
/orgs/{org_id}/passwords - Renders the organizations passwords
/orgs/{org_id}/passwords/new_password - Generates a new password for the org

## Auth Routes

GET - /auth/me - Returns information about the signed in User
POST - /auth/login - Posts a login request for the user to sign in
POST - /auth/logout - Logs the user out
POST - /auth/register - Register the user

## User Routes (/users/)

- GET - /users/passwords - Returns the Users personal passwords

- GET - /users/invites - Returns an array of invites the User has
- DELETE - /users/invites - DELETE - Deletes an invite the user has received

## Organization Routes (/organizations)

- GET    - / - Returns all the organizations in the database [Debug]
- POST   - / - Creates a new organization
- UPDATE - / - Updates (renames) an organization

### Passwords Routing (/organizations/{org_id}/passwords)

- GET - /organizations/{org_id}/passwords - Returns the organizations passwords
- POST - /organizations/{org_id}/passwords - Creates a new password for the organization
- DELETE - /organizations/{org_id}/passwords - Deletes a password from the organization
- UPDATE - /organizations/{org_id}/passwords - Updates an existing password for the organization

### Users Routing (/organizations/{org_id}/users)

- GET - /organizations/{org_id}/users - Returns the organizations users
- POST - /organizations/{org_id}/users - Adds a user to the organization
- DELETE - /organizations/{org_id}/users - Removes a user from the organization

### Users Routing (/organizations/{org_id}/tags)

- GET - /organizations/{org_id}/users - Returns the organizations tags
- POST - /organizations/{org_id}/users - Adds a tag to the organization
- DELETE - /organizations/{org_id}/users - Removes a tag from the organization


### Users Routing (/organizations/{org_id}/invites)

- GET - /organizations/{org_id}/invites - Returns the organizations pending invites
- POST - /organizations/{org_id}/invites - Invites a user to the organization
- DELETE - /organizations/{org_id}/invites - Deletes an outgoing pending invite

