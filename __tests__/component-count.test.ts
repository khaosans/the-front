import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const testsDir = path.join(projectRoot, '__tests__');

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

describe('__tests__ Directory', () => {
  test('should only contain test files', () => {
    const files = getFilesInDirectory(testsDir);
    
    files.forEach(file => {
      const isTestFile = file.endsWith('.test.ts') || file.endsWith('.test.tsx');
      expect(isTestFile).toBe(true);
    });
  });

  test('should not be empty', () => {
    const files = getFilesInDirectory(testsDir);
    expect(files.length).toBeGreaterThan(0);
  });

  test('should not contain any non-test files', () => {
    const files = getFilesInDirectory(testsDir);
    const nonTestFiles = files.filter(file => !file.endsWith('.test.ts') && !file.endsWith('.test.tsx'));
    expect(nonTestFiles).toEqual([]);
  });
});