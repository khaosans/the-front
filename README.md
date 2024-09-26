# Task Management Application

## Overview
This application is a streamlined task management board that allows users to create, manage, and organize tasks efficiently. It features drag-and-drop functionality and task cards that include essential fields, making it easy to track progress and collaborate.

## Features

- **Task Management**: Create, edit, and delete tasks with essential fields like title, description, priority, and due date.
- **Drag-and-Drop Functionality**: Easily move tasks between lists (To Do, In Progress, Done) to update their status.
- **User Authentication**: Secure login and signup using Supabase Auth.
- **Real-time Updates**: Changes are reflected in real-time across the application.
- **Responsive Design**: Built with Tailwind CSS for a clean and intuitive user interface that works on all devices.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Supabase**:
   - Create a Supabase project at [Supabase Dashboard](https://app.supabase.com).
   - Obtain your Supabase URL and Anon Key from the API settings.

4. **Configure environment variables**:
   - Rename `.env.local.example` to `.env.local` and update the following:
     ```
     NEXT_PUBLIC_SUPABASE_URL=[YOUR_SUPABASE_URL]
     NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
     ```

## Usage

1. **Run the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

3. **Create an account** or **log in** to start managing your tasks.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
