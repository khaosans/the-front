import fs from 'fs';
import path from 'path';

describe('Directory Structure', () => {
  const appDir = path.join(__dirname, '..', 'app');

  // Addd one for all the pages

    // Add one for all the tests
  it('has the correct app directory structure', () => {
    expect(fs.existsSync(appDir)).toBe(true);
    expect(fs.existsSync(path.join(appDir, 'layout.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(appDir, 'page.tsx'))).toBe(true);
    // Add more checks for expected directories and files


  });

});
