# Project Name: Task-Flow

## Description

Task-Flow is a comprehensive task management application designed to streamline project workflows and enhance productivity. It leverages modern web technologies to provide a seamless user experience, allowing users to manage tasks efficiently with features like real-time updates, drag-and-drop task organization, and integration with popular tools.

## Current Application Structure

The application currently consists of the following main pages and components:

1. **Home Page** (`app/page.tsx`):
   - Serves as the landing page for authenticated users
   - Displays a welcome message and an overview of available features
   - Provides quick access links to key sections of the application

2. **Dashboard** (`app/dashboard/page.tsx`):
   - Offers a comprehensive overview of tasks, projects, and team activities
   - Includes data visualizations for task completion rates and project progress

3. **AI Agents** (`app/ai-agents/page.tsx`):
   - Lists AI agents with their current status, tasks completed, efficiency, and seniority
   - Allows users to view and manage AI agents assisting with task automation

4. **Tasks** (`app/tasks/page.tsx`):
   - Displays a list of tasks with their titles, statuses, due dates, and assignees
   - Provides functionality to add new tasks, search, filter, and sort tasks
   - Includes a table view with pagination for easy task management
   - Allows users to view task details and perform actions on individual tasks

5. **Teams** (link available, page to be implemented):
   - Intended for team management and collaboration features

6. **Projects** (link available, page to be implemented):
   - Planned to provide project creation, viewing, and management capabilities

7. **Schedule** (accessible via TabBar, page to be implemented):
   - Planned to offer calendar and scheduling functionalities

8. **Quick Actions** (accessible via TabBar, page to be implemented):
   - Will provide rapid access to frequently used functions

9. **Settings** (accessible via TopBar, page to be implemented):
   - Will allow users to configure application preferences and account settings

10. **Notifications** (accessible via TopBar, page to be implemented):
    - Intended to display user notifications and alerts

## Navigation Components

- **TopBar** (`components/TopBar.tsx`):
  - Provides main navigation links (Dashboard, Teams, Projects)
  - Includes a hamburger menu for additional options (Settings, Help & Support, Logout)
  - Displays notification and settings icons

- **TabBar** (`components/TabBar.tsx`):
  - Offers quick access to Home, AI Agents, Task Board, and Analytics
  - The Task Board links to '/taskboard'

- **FloatingActionButton** (`components/FloatingActionButton.tsx`):
  - Allows quick creation of new tasks, projects, and agents
  - Includes an option to open the chat bot (functionality to be implemented)

## Context and Technology Stack

Task-Flow is built using the latest Next.js framework (version 14.2.14) with App Routing, ensuring a robust and scalable architecture. The project utilizes TypeScript for type safety and Playwright for end-to-end testing, ensuring high-quality code and reliable performance. The application is styled using Vercel's Geist UI components and Tailwind CSS, maintaining a consistent and modern design language.

Key technologies and tools used in Task-Flow include:
- Next.js for server-side rendering and static site generation
- TypeScript for type safety
- Playwright for end-to-end testing
- Vercel's Geist UI and Tailwind CSS for styling
- Supabase for backend services and authentication
- Redux for state management (to be implemented)
- React Hooks (useState) for local state management in components

The project is configured to run tests using npm, with separate workflows for unit tests and Playwright tests to ensure comprehensive test coverage. The application is designed to be deployed on Vercel, taking advantage of its seamless integration with Next.js for optimal performance and scalability.

Task-Flow aims to provide a user-friendly interface for managing tasks, making it an ideal solution for teams and individuals looking to improve their productivity and project management capabilities. The application is currently in active development, with core features implemented and others planned for future iterations.

## Recent Updates

- Added a new Tasks page with functionality to view, add, search, filter, and sort tasks
- Implemented a table view for tasks with status indicators and action buttons
- Added pagination to the Tasks page for improved navigation through large task lists
- Integrated new UI components such as Badges for task status visualization

The Task-Flow application continues to evolve, with ongoing improvements and new features being added to enhance its task management capabilities and user experience.