import fs from 'fs';
import path from 'path';

describe('Project Directory Structure', () => {
  const rootDir = path.resolve(__dirname, '..');

  test('pages directory should not exist', () => {
    const pagesDir = path.join(rootDir, 'pages');
    expect(fs.existsSync(pagesDir)).toBe(false);
  });

  test('app directory should exist and contain necessary files', () => {
    const appDir = path.join(rootDir, 'app');
    expect(fs.existsSync(appDir)).toBe(true);
    expect(fs.existsSync(path.join(appDir, 'layout.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(appDir, 'page.tsx'))).toBe(true);
  });

  test('components directory should exist outside of app directory', () => {
    const componentsDir = path.join(rootDir, 'components');
    expect(fs.existsSync(componentsDir)).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'app', 'components'))).toBe(false);
  });

  test('utils directory should exist outside of app directory', () => {
    const utilsDir = path.join(rootDir, 'utils');
    expect(fs.existsSync(utilsDir)).toBe(true);
    expect(fs.existsSync(path.join(rootDir, 'app', 'utils'))).toBe(false);
  });

  test('component files should use kebab-case naming', () => {
    const componentsDir = path.join(rootDir, 'components');
    const componentFiles = fs.readdirSync(componentsDir);
    componentFiles.forEach(file => {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        expect(file).toMatch(/^[a-z0-9-]+\.(tsx|ts)$/);
      }
    });
  });

  test('dynamic route segments should use PascalCase or lowercase', () => {
    const checkDynamicRoutes = (dir: string) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          if (item.startsWith('[') && item.endsWith(']')) {
            expect(item).toMatch(/^\[[a-zA-Z][a-zA-Z0-9]*\]$/);
          }
          checkDynamicRoutes(itemPath);
        }
      });
    };
    checkDynamicRoutes(path.join(rootDir, 'app'));
  });

  test('components directory should not exist in app directory or its subdirectories', () => {
    const appDir = path.join(rootDir, 'app');
    
    const checkNoComponentsDir = (dir: string) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
          expect(item.toLowerCase()).not.toBe('components');
          checkNoComponentsDir(itemPath);
        }
      });
    };

    expect(fs.existsSync(path.join(appDir, 'components'))).toBe(false);
    checkNoComponentsDir(appDir);
  });
});