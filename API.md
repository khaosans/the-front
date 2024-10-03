# Taskboard API Specification

## Overview

This document provides the API specification for the Taskboard API, which is built using FastAPI and SQLModel. The API supports CRUD operations, authentication, and integrates with PostgreSQL for database management.

## Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Teams](#teams)
4. [Projects](#projects)
5. [Boards](#boards)
6. [Lists](#lists)
7. [Tasks](#tasks)
8. [WebSocket Chat](#websocket-chat)
9. [Environment Variables](#environment-variables)
10. [Database Setup](#database-setup)

## Authentication

### JWT Authentication

The API uses JWT (JSON Web Tokens) for authentication. Each request to a protected endpoint must include a valid JWT token in the `Authorization` header.

#### Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

#### Register

**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

## Users

### Get User

**Endpoint:** `GET /api/v1/users/{UserId}`

**Parameters:**
- `UserId` (UUID): The ID of the user to retrieve.

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

### Create User

**Endpoint:** `POST /api/v1/users`

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

### Update User

**Endpoint:** `PUT /api/v1/users/{UserId}`

**Parameters:**
- `UserId` (UUID): The ID of the user to update.

**Request Body:**
```json
{
  "username": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

### Delete User

**Endpoint:** `DELETE /api/v1/users/{UserId}`

**Parameters:**
- `UserId` (UUID): The ID of the user to delete.

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

## Teams

### Get All Teams

**Endpoint:** `GET /api/v1/teams`

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string"
  }
]
```

### Create Team

**Endpoint:** `POST /api/v1/teams`

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string"
}
```

### Get Team by ID

**Endpoint:** `GET /api/v1/teams/{TeamId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team to retrieve.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string"
}
```

### Update Team

**Endpoint:** `PUT /api/v1/teams/{TeamId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team to update.

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string"
}
```

### Delete Team

**Endpoint:** `DELETE /api/v1/teams/{TeamId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team to delete.

**Response:**
```json
{
  "message": "Team deleted successfully"
}
```

## Projects

### Get All Projects for a Team

**Endpoint:** `GET /api/v1/teams/{TeamId}/projects`

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "team_id": "string"
  }
]
```

### Create Project

**Endpoint:** `POST /api/v1/teams/{TeamId}/projects`

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "team_id": "string"
}
```

### Get Project by ID

**Endpoint:** `GET /api/v1/teams/{TeamId}/projects/{ProjectId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project to retrieve.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "team_id": "string"
}
```

### Update Project

**Endpoint:** `PUT /api/v1/teams/{TeamId}/projects/{ProjectId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project to update.

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "team_id": "string"
}
```

### Delete Project

**Endpoint:** `DELETE /api/v1/teams/{TeamId}/projects/{ProjectId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project to delete.

**Response:**
```json
{
  "message": "Project deleted successfully"
}
```

## Boards

### Get All Boards for a Project

**Endpoint:** `GET /api/v1/teams/{TeamId}/projects/{ProjectId}/boards`

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "project_id": "string"
  }
]
```

### Create Board

**Endpoint:** `POST /api/v1/teams/{TeamId}/projects/{ProjectId}/boards`

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "project_id": "string"
}
```

### Get Board by ID

**Endpoint:** `GET /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board to retrieve.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "project_id": "string"
}
```

### Update Board

**Endpoint:** `PUT /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board to update.

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "project_id": "string"
}
```

### Delete Board

**Endpoint:** `DELETE /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board to delete.

**Response:**
```json
{
  "message": "Board deleted successfully"
}
```

## Lists

### Get All Lists for a Board

**Endpoint:** `GET /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists`

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "board_id": "string"
  }
]
```

### Create List

**Endpoint:** `POST /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists`

**Request Body:**
```json
{
  "name": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "board_id": "string"
}
```

### Get List by ID

**Endpoint:** `GET /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board.
- `ListId` (UUID): The ID of the list to retrieve.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "board_id": "string"
}
```

### Update List

**Endpoint:** `PUT /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board.
- `ListId` (UUID): The ID of the list to update.

**Request Body:**
```json
{
  "name": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "board_id": "string"
}
```

### Delete List

**Endpoint:** `DELETE /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board.
- `ListId` (UUID): The ID of the list to delete.

**Response:**
```json
{
  "message": "List deleted successfully"
}
```

## Tasks

### Get All Tasks for a List

**Endpoint:** `GET /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks`

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "list_id": "string"
  }
]
```

### Create Task

**Endpoint:** `POST /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks`

**Request Body:**
```json
{
  "title": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "list_id": "string"
}
```

### Get Task by ID

**Endpoint:** `GET /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks/{TaskId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board.
- `ListId` (UUID): The ID of the list.
- `TaskId` (UUID): The ID of the task to retrieve.

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "list_id": "string"
}
```

### Update Task

**Endpoint:** `PUT /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks/{TaskId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board.
- `ListId` (UUID): The ID of the list.
- `TaskId` (UUID): The ID of the task to update.

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "completed": "boolean"
}
```

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "list_id": "string"
}
```

### Delete Task

**Endpoint:** `DELETE /api/v1/teams/{TeamId}/projects/{ProjectId}/boards/{BoardId}/lists/{ListId}/tasks/{TaskId}`

**Parameters:**
- `TeamId` (UUID): The ID of the team.
- `ProjectId` (UUID): The ID of the project.
- `BoardId` (UUID): The ID of the board.
- `ListId` (UUID): The ID of the list.
- `TaskId` (UUID): The ID of the task to delete.

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## WebSocket Chat

### Chat with Bot

**Endpoint:** `ws://localhost:8000/chat/{UserId}`

**Parameters:**
- `UserId` (UUID): The ID of the user initiating the chat.

**Message Structure:**
```json
{
  "message": "string"
}
```

**Response:**
```json
{
  "sender": "string",
  "message": "string",
  "type": "string",
  "message_id": "string",
  "id": "string"
}
```

## Environment Variables

The following environment variables are required to run the Taskboard API:

- `DATABASE_URL`: The URL of the PostgreSQL database.
- `SECRET_KEY`: The secret key used for JWT token generation.
- `OPENAI_API_KEY`: The API key for OpenAI's language model.

## Database Setup

The Taskboard API uses SQLModel for database management. To set up the database, run the following command:

```bash
python initial_data.py
```

This will create the necessary tables in the PostgreSQL database and insert an initial user with the username "Admin" and email "admin@admin.com".