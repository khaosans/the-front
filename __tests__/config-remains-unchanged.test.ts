import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

describe('Configuration files', () => {
  const configFiles = [
   // 'jest.config.js',
   //  'tsconfig.json',
   // 'jest.setup.ts',
      'next.config.js',
  ];

  configFiles.forEach(file => {
    test(`${file} should match the version in GitHub main branch`, () => {
      const filePath = path.join(process.cwd(), file);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      let currentContent: string;
      try {
        currentContent = fs.readFileSync(filePath, 'utf8');
      } catch (error) {
        throw new Error(`Error reading file ${filePath}: ${error.message}`);
      }

      // Fetch content from GitHub main branch
      let mainContent: string;
      try {
        mainContent = execSync(`git show origin/main:${file}`, { encoding: 'utf8' });
      } catch (error) {
        throw new Error(`Error fetching ${file} from GitHub main: ${error.message}`);
      }

      // Compare current content with main branch content
      expect(currentContent.trim()).toEqual(mainContent.trim());
    });
  });
});
