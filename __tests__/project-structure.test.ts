import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

function getFilesInDirectory(dir: string, recursive = false): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = entries
      .filter(dirent => dirent.isFile())
      .map(dirent => path.join(dir, dirent.name));

    if (recursive) {
      const directories = entries.filter(dirent => dirent.isDirectory());
      for (const directory of directories) {
        files = files.concat(getFilesInDirectory(path.join(dir, directory.name), true));
      }
    }

    return files;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

const expectedStructure: Record<string, string[]> = {
  'app': ['layout.tsx', 'page.tsx', 'globals.css', 'favicon.ico', 'header.tsx', 'opengraph-image.png', 'taskboard.module.css', 'twitter-image.png'],
  'app/login': ['page.tsx'],
  'app/dashboard': ['page.tsx'],
  'utils': ['auth.ts', 'cn.ts', 'supabaseClient.ts', 'utils.ts','ai.ts'],
  'public': [], // Remove 'favicon.ico' from here
};

describe('Project File Structure', () => {
  test('should have the correct file structure', () => {
    const errors: string[] = [];

    Object.entries(expectedStructure).forEach(([dirPath, expectedFiles]) => {
      const fullPath = path.join(projectRoot, dirPath);
      const actualFiles = getFilesInDirectory(fullPath);

      const missingFiles = expectedFiles.filter(file => !actualFiles.includes(path.join(fullPath, file)));
      const unexpectedFiles = actualFiles.filter(file => !expectedFiles.includes(path.basename(file)));

      if (missingFiles.length > 0) {
        errors.push(`Missing files in ${dirPath}:\n${missingFiles.map(file => `  - ${file}`).join('\n')}`);
      }

      if (unexpectedFiles.length > 0) {
        errors.push(`Unexpected files in ${dirPath}:\n${unexpectedFiles.map(file => `  - ${path.basename(file)}`).join('\n')}`);
      }
    });

    if (errors.length > 0) {
      console.error('File structure errors:');
      errors.forEach(error => console.error(error));
    }

    expect(errors).toEqual([]);
  });
});
