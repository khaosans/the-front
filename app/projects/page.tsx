import { projectService } from '@/services/project-service';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await projectService.getProjects();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="bg-white shadow rounded-lg p-4">
            <Link href={`/projects/${project.id}`} className="text-xl font-semibold hover:text-blue-600">
              {project.name}
            </Link>
            <p className="text-gray-600 mt-2">{project.description}</p>
          </li>
        ))}
      </ul>
      <Link href="/projects/new" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create New Project
      </Link>
    </div>
  );
}