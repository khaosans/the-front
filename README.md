<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This%20starter%20configures%20Supabase%20Auth%20to%20use%20cookies%2C%20making%20the%20user's%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app -e with-supabase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)


```markdown
# Simplified Trello-like ToDo Board App with Drag-and-Drop and Jira-like Fields (MVP)

## Overview
This app will be a streamlined task management board with drag-and-drop functionality and task cards that include essential fields similar to Jira but simplified. The goal is to create an MVP with core features that allow easy task management.

## User Stories and Specifications

---

### 1. Board Management

- **Story 1.1**: 
  - **Title**: Create a ToDo Board
  - **Description**: As a user, I want to create a new ToDo board so that I can organize my tasks.
  - **Acceptance Criteria**:
    - The user can create a single board with predefined lists (To Do, In Progress, Done).
    - The board is automatically saved to Supabase.
  - **Design**:
    - A simple interface where the user starts with a default ToDo board.
    - The board includes three columns (To Do, In Progress, Done) to organize tasks.

---

### 2. List Management

- **Story 2.1**: 
  - **Title**: Manage Task Lists
  - **Description**: As a user, I want to create, rename, or delete task lists within my board to organize my tasks into different categories.
  - **Acceptance Criteria**:
    - The user can create additional lists.
    - Lists are displayed horizontally on the board.
    - Lists can be renamed or deleted, and changes are saved to Supabase.
  - **Design**:
    - “Add New List” button on the board.
    - Inline editing for list names and a delete option in the list menu.

---

### 3. Task (Card) Management

- **Story 3.1**: 
  - **Title**: Add a New Task with Essential Fields
  - **Description**: As a user, I want to add tasks to my ToDo board, including key details similar to Jira, but simplified.
  - **Acceptance Criteria**:
    - The user can add tasks (cards) to any list.
    - Each task has the following fields:
      - **Title**: The name of the task.
      - **Description**: A brief summary of the task.
      - **Priority**: A dropdown to set the priority (Low, Medium, High).
      - **Status**: The current status of the task (linked to the list it’s in).
      - **Assignee**: The person responsible for the task (single user for MVP).
      - **Due Date**: Optional due date for the task.
    - The task is saved to Supabase and appears in the selected list.
  - **Design**:
    - An "Add Task" button at the bottom of each list.
    - A task creation modal with input fields for the title, description, priority, and due date.

- **Story 3.2**: 
  - **Title**: Drag and Drop Tasks Between Lists
  - **Description**: As a user, I want to drag and drop tasks between lists to update their status easily.
  - **Acceptance Criteria**:
    - The user can drag and drop tasks between lists (e.g., from To Do to In Progress).
    - The task’s new status (based on the list) is saved in Supabase.
  - **Design**:
    - Smooth drag-and-drop functionality with visual feedback.
    - The task’s position and list are updated upon drop.

- **Story 3.3**: 
  - **Title**: Edit or Delete a Task
  - **Description**: As a user, I want to edit or delete tasks to keep my board up to date.
  - **Acceptance Criteria**:
    - The user can edit task details like title, description, priority, and due date.
    - The user can delete a task, and it is removed from Supabase.
  - **Design**:
    - Inline editing for quick changes.
    - Delete option available via a button on the task or within the task detail view.

---

### 4. Basic Interface

- **Story 4.1**: 
  - **Title**: Simple and Intuitive User Interface
  - **Description**: As a user, I want a simple and intuitive interface so that I can easily manage my tasks.
  - **Acceptance Criteria**:
    - The interface should be clean and easy to navigate.
    - Tasks and lists should be clearly displayed and easily accessible.
  - **Design**:
    - Minimalistic design with a focus on usability.
    - Responsive layout that adapts to different screen sizes (desktop, tablet, mobile).

## Design Specifications

- **Layout**: The app will have a single-page layout with a board that spans the width of the screen. The board will have a header with the board title and options for adding new lists or tasks.
- **Lists**: Lists will be displayed horizontally across the board. Each list will have a title and an area where tasks can be added.
- **Tasks**: Tasks (cards) will be displayed vertically within each list. Each task will show its title, and clicking on it will expand the card to show additional details like description, priority, and due date.

## Next Steps

- **Back-End Setup**: Configure Supabase to store boards, lists, and tasks with the necessary fields.
- **Front-End Development**: Begin with the basic UI layout and integrate drag-and-drop functionality.
- **Integration**: Connect the front-end with the Supabase back-end to ensure seamless data flow.

This MVP should provide a solid foundation for your task management app with essential features and a clean, intuitive interface.
```
