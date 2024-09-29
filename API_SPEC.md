# API Specification

## Authentication
- **Login**: `/auth/login` (POST)
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "user": { ... }, "error": "string" }`
  
- **Register**: `/auth/register` (POST)
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "user": { ... }, "error": "string" }`

## Users
- **Get Current User**: `/users/me` (GET)
  - Response: `{ "user": { ... }, "error": "string" }`

## Teams
- **Get All Teams**: `/teams` (GET)
  - Response: `[ { "id": "string", "name": "string", ... }, ... ]`
  
- **Create Team**: `/teams` (POST)
  - Request Body: `{ "name": "string", "description": "string" }`
  - Response: `{ "team": { ... }, "error": "string" }`
  
- **Get Team by ID**: `/teams/{TeamId}` (GET)
  - Response: `{ "team": { ... }, "error": "string" }`
  
- **Update Team**: `/teams/{TeamId}` (PUT)
  - Request Body: `{ "name": "string", "description": "string" }`
  - Response: `{ "team": { ... }, "error": "string" }`
  
- **Delete Team**: `/teams/{TeamId}` (DELETE)
  - Response: `{ "message": "string", "error": "string" }`

## Projects
- **Get All Projects for a Team**: `/teams/{TeamId}/projects` (GET)
  - Response: `[ { "id": "string", "name": "string", ... }, ... ]`
  
- **Create Project**: `/teams/{TeamId}/projects` (POST)
  - Request Body: `{ "name": "string", "description": "string" }`
  - Response: `{ "project": { ... }, "error": "string" }`
  
- **Get Project by ID**: `/teams/{TeamId}/projects/{ProjectId}` (GET)
  - Response: `{ "project": { ... }, "error": "string" }`
  
- **Update Project**: `/teams/{TeamId}/projects/{ProjectId}` (PUT)
  - Request Body: `{ "name": "string", "description": "string" }`
  - Response: `{ "project": { ... }, "error": "string" }`
  
- **Delete Project**: `/teams/{TeamId}/projects/{ProjectId}` (DELETE)
  - Response: `{ "message": "string", "error": "string" }`

## Boards
- **Get All Boards for a Project**: `/teams/{TeamId}/projects/{ProjectId}/boards` (GET)
  - Response: `[ { "id": "string", "name": "string", ... }, ... ]`
  
- **Create Board**: `/teams/{TeamId}/projects/{ProjectId}/boards` (POST)
  - Request Body: `{ "name": "string", "description": "string" }`
  - Response: `{ "board": { ... }, "error": "string" }`
  
- **Get Board by ID**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}` (GET)
  - Response: `{ "board": { ... }, "error": "string" }`
  
- **Update Board**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}` (PUT)
  - Request Body: `{ "name": "string", "description": "string" }`
  - Response: `{ "board": { ... }, "error": "string" }`
  
- **Delete Board**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}` (DELETE)
  - Response: `{ "message": "string", "error": "string" }`

## Lists
- **Get All Lists for a Board**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists` (GET)
  - Response: `[ { "id": "string", "name": "string", ... }, ... ]`
  
- **Create List**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists` (POST)
  - Request Body: `{ "name": "string" }`
  - Response: `{ "list": { ... }, "error": "string" }`
  
- **Get List by ID**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}` (GET)
  - Response: `{ "list": { ... }, "error": "string" }`
  
- **Update List**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}` (PUT)
  - Request Body: `{ "name": "string" }`
  - Response: `{ "list": { ... }, "error": "string" }`
  
- **Delete List**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}` (DELETE)
  - Response: `{ "message": "string", "error": "string" }`

## Tasks
- **Get All Tasks for a List**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks` (GET)
  - Response: `[ { "id": "string", "title": "string", ... }, ... ]`
  
- **Create Task**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks` (POST)
  - Request Body: `{ "title": "string", "description": "string", "status": "string" }`
  - Response: `{ "task": { ... }, "error": "string" }`
  
- **Get Task by ID**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks/{TaskId}` (GET)
  - Response: `{ "task": { ... }, "error": "string" }`
  
- **Update Task**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks/{TaskId}` (PUT)
  - Request Body: `{ "title": "string", "description": "string", "status": "string" }`
  - Response: `{ "task": { ... }, "error": "string" }`
  
- **Delete Task**: `/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks/{TaskId}` (DELETE)
  - Response: `{ "message": "string", "error": "string" }`

## Status Codes
- **200 OK**: The request was successful.
- **201 Created**: The resource was successfully created.
- **400 Bad Request**: The request was invalid or cannot be served.
- **401 Unauthorized**: Authentication is required and has failed or has not yet been provided.
- **403 Forbidden**: The request was valid, but the server is refusing action.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.

## Notes
- Ensure all endpoints are protected and require authentication except for login and registration.
- Use appropriate HTTP methods for each action (GET, POST, PUT, DELETE).
- Validate all inputs and return meaningful error messages.