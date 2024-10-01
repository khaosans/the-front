export interface Task {
  id: string
  title: string
  status: 'todo' | 'in_progress' | 'done'
  project_id: string
}

export interface Project {
  id: string
  name: string
  description: string
}

export interface TeamMember {
  id: string
  full_name: string
  role: string
  avatar_url: string
}