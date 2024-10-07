# API Specification

## Overview
This API allows for the management of users, tasks, and comments in a task management application. It provides endpoints for creating, reading, updating, and deleting (CRUD) resources, as well as additional functionalities for user authentication and task assignment.

## Base URL

## Authentication
- All endpoints require authentication via a Bearer token in the Authorization header.

## Endpoints

### Users

#### Create User
- **POST** `/users`
- **Request Body**:
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **201 Created**
    ```json
    {
        "id": "uuid",
        "username": "string",
        "email": "string",
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```

#### Get User
- **GET** `/users/{id}`
- **Response**:
    - **200 OK**
    ```json
    {
        "id": "uuid",
        "username": "string",
        "email": "string",
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```

#### Update User
- **PUT** `/users/{id}`
- **Request Body**:
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string" // Optional
    }
    ```
- **Response**:
    - **200 OK**
    ```json
    {
        "id": "uuid",
        "username": "string",
        "email": "string",
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```

#### Delete User
- **DELETE** `/users/{id}`
- **Response**:
    - **204 No Content**

#### User Login
- **POST** `/users/login`
- **Request Body**:
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **200 OK**
    ```json
    {
        "token": "string",
        "user": {
            "id": "uuid",
            "username": "string",
            "email": "string"
        }
    }
    ```

### Tasks

#### Create Task
- **POST** `/tasks`
- **Request Body**:
    ```json
    {
        "title": "string",
        "description": "string",
        "status": "pending | in_progress | completed",
        "user_id": "uuid" // Optional, for task assignment
    }
    ```
- **Response**:
    - **201 Created**
    ```json
    {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "status": "pending | in_progress | completed",
        "user_id": "uuid",
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```

#### Get Task
- **GET** `/tasks/{id}`
- **Response**:
    - **200 OK**
    ```json
    {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "status": "pending | in_progress | completed",
        "user_id": "uuid",
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```

#### Update Task
- **PUT** `/tasks/{id}`
- **Request Body**:
    ```json
    {
        "title": "string",
        "description": "string",
        "status": "pending | in_progress | completed",
        "user_id": "uuid" // Optional, for reassigning
    }
    ```
- **Response**:
    - **200 OK**
    ```json
    {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "status": "pending | in_progress | completed",
        "user_id": "uuid",
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```

#### Delete Task
- **DELETE** `/tasks/{id}`
- **Response**:
    - **204 No Content**

#### Get All Tasks
- **GET** `/tasks`
- **Response**:
    - **200 OK**
    ```json
    [
        {
            "id": "uuid",
            "title": "string",
            "description": "string",
            "status": "pending | in_progress | completed",
            "user_id": "uuid",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
    ]
    ```

### Comments

#### Create Comment
- **POST** `/comments`
- **Request Body**:
    ```json
    {
        "task_id": "uuid",
        "content": "string"
    }
    ```
- **Response**:
    - **201 Created**
    ```json
    {
        "id": "uuid",
        "task_id": "uuid",
        "user_id": "uuid",
        "content": "string",
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
    ```

#### Get Comments for Task
- **GET** `/tasks/{task_id}/comments`
- **Response**:
    - **200 OK**
    ```json
    [
        {
            "id": "uuid",
            "task_id": "uuid",
            "user_id": "uuid",
            "content": "string",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
    ]
    ```

#### Delete Comment
- **DELETE** `/comments/{id}`
- **Response**:
    - **204 No Content**

### Chat History

#### Add Chat Entry
- **POST** `/chat`
- **Request Body**:
    ```json
    {
        "userId": "uuid",
        "taskId": "uuid",
        "message": "string"
    }
    ```
- **Response**:
    - **201 Created**
    ```json
    {
        "id": "uuid",
        "userId": "uuid",
        "taskId": "uuid",
        "message": "string",
        "createdAt": "timestamp"
    }
    ```

#### Get Chat History
- **GET** `/chat/{taskId}`
- **Response**:
    - **200 OK**
    ```json
    [
        {
            "id": "uuid",
            "userId": "uuid",
            "taskId": "uuid",
            "message": "string",
            "createdAt": "timestamp"
        }
    ]
    ```

#### Delete Chat Entry
- **DELETE** `/chat/{id}`
- **Response**:
    - **204 No Content**

## Error Handling
- All responses will include an error object in the following format: