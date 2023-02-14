
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

GET - /users/ - information about a User by ID
UPDATE - /users/ - Updates information about the User

GET - /users/passwords - Returns the Users personal passwords
/users/ - 

/users/invites - GET - Returns an array of invites the User has
/users/invites - DELETE - Deletes an invite the user has received

GET - /share_password - form to add/share password

## Organization Routes (/organizations)



## Tag Routes (/)


## Invite Routes
