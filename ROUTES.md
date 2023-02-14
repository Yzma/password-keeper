# Frontend Routes (All GET requests)

- / - Index page
- /login - Render login page
- /passwords - Render Users personal passwords
- /passwords/new_password - Renders the page to generate a new password for the user

- /orgs - Renders the users organizations
- /orgs/{org_id}/passwords - Renders the organizations passwords
- /orgs/{org_id}/passwords/new_password - Renders the page to generate a new password for the org

# Auth Routes

- GET  - /auth/me - Returns information about the signed in User
- POST - /auth/login - Posts a login request for the user to sign in
- POST - /auth/logout - Logs the user out
- POST - /auth/register - Register the user

# User Routes (/users/)

- GET - /          - Returns all the users in the database [Debug]
- GET - /{user_id} - Returns all information about a user by Id [Debug]

### Users Passwords Routing (/users/passwords)

- GET    - /users/passwords - Returns the organizations passwords
- POST   - /users/passwords - Creates a new password for the organization
- DELETE - /users/passwords - Deletes a password from the organization
- UPDATE - /users/passwords - Updates an existing password for the organization

### User Tags Routing (/users/tags)

- GET    - /users/tags - Returns the organizations tags
- POST   - /users/tags - Adds a tag to the organization
- DELETE - /users/tags - Removes a tag from the organization
- PATCH  - /users/tags - Updates a tag for the organization

### User Invites Routing (/users/invites)

- GET    - /users/invites - Returns the organizations pending invites
- POST   - /users/invites - Invites a user to the organization
- DELETE - /users/invites - Deletes an outgoing pending invite




# Organization Routes (/organizations)

- GET    - /organizations - Returns all the organizations in the database [Debug]
- POST   - /organizations - Creates a new organization
- UPDATE - /organizations - Updates (renames) an organization

### Passwords Routing (/organizations/{org_id}/passwords)

- GET    - /organizations/{org_id}/passwords - Returns the organizations passwords
- POST   - /organizations/{org_id}/passwords - Creates a new password for the organization
- DELETE - /organizations/{org_id}/passwords - Deletes a password from the organization
- UPDATE - /organizations/{org_id}/passwords - Updates an existing password for the organization

### Organization Users Routing (/organizations/{org_id}/users)

- GET    - /organizations/{org_id}/users - Returns the organizations users
- POST   - /organizations/{org_id}/users - Adds a user to the organization
- DELETE - /organizations/{org_id}/users - Removes a user from the organization

### Organization Tags Routing (/organizations/{org_id}/tags)

- GET    - /organizations/{org_id}/tags - Returns the organizations tags
- POST   - /organizations/{org_id}/tags - Adds a tag to the organization
- DELETE - /organizations/{org_id}/tags - Removes a tag from the organization
- PATCH  - /organizations/{org_id}/tags - Updates a tag for the organization

### Organization Invites Routing (/organizations/{org_id}/invites)

- GET    - /organizations/{org_id}/invites - Returns the organizations pending invites
- POST   - /organizations/{org_id}/invites - Invites a user to the organization
- DELETE - /organizations/{org_id}/invites - Deletes an outgoing pending invite

