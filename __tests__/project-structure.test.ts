import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

function getFilesInDirectory(dir: string): string[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(dirent => dirent.isFile())
      .map(dirent => dirent.name);
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

const expectedStructure: Record<string, string[]> = {
  'app': ['layout.tsx', 'page.tsx', 'globals.css', 'favicon.ico', 'header.tsx', 'opengraph-image.png', 'taskboard.module.css', 'twitter-image.png'],
  'app/login': ['page.tsx'],
  'app/dashboard': ['page.tsx'],
  'utils': ['auth.ts', 'cn.ts', 'supabaseClient.ts', 'utils.ts'],
  'public': [], // Remove 'favicon.ico' from here
  '__tests__': [
    'about-page.test.tsx',
    'button.test.tsx',
    'component-count.test.ts',
    'edit-task-modal.test.tsx',
    'input.test.tsx',
    'login-page.test.tsx',
    'profile-page.test.tsx',
    'settings-page.test.tsx',
    'signup-page.test.tsx',
    'taskboard-page.test.tsx',
    'project-structure.test.ts'
  ]
};

describe('Project File Structure', () => {
  test('should have the correct file structure', () => {
    const errors: string[] = [];
    const details: string[] = [];

    Object.entries(expectedStructure).forEach(([dirPath, expectedFiles]) => {
      const fullPath = path.join(projectRoot, dirPath);
      const actualFiles = getFilesInDirectory(fullPath);

      const missingFiles = expectedFiles.filter(file => !actualFiles.includes(file));
      const unexpectedFiles = actualFiles.filter(file => !expectedFiles.includes(file));

      if (missingFiles.length > 0) {
        errors.push(`Missing files in ${dirPath}: ${missingFiles.join(', ')}`);
        details.push(`Expected files in ${dirPath}: ${expectedFiles.join(', ')}`);
        details.push(`Actual files in ${dirPath}: ${actualFiles.join(', ')}`);
      }

      if (unexpectedFiles.length > 0) {
        errors.push(`Unexpected files in ${dirPath}: ${unexpectedFiles.join(', ')}`);
        details.push(`Expected files in ${dirPath}: ${expectedFiles.join(', ')}`);
        details.push(`Actual files in ${dirPath}: ${actualFiles.join(', ')}`);
      }
    });

    if (errors.length > 0) {
      console.error('File structure errors:');
      errors.forEach(error => console.error(error));
      console.error('Details:');
      details.forEach(detail => console.error(detail));
    }

    expect(errors).toEqual([]);
  });
});
