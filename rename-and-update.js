const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const componentsDir = path.join(rootDir, 'components');

// Function to convert PascalCase or camelCase to kebab-case
function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Rename files
const renamedFiles = {};
fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const oldPath = path.join(componentsDir, file);
    const newFileName = toKebabCase(file);
    const newPath = path.join(componentsDir, newFileName);
    fs.renameSync(oldPath, newPath);
    renamedFiles[file] = newFileName;
    console.log(`Renamed: ${file} -> ${newFileName}`);
  }
});

// Update imports
function updateImports(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const filePath = path.join(dir, dirent.name);
    if (dirent.isDirectory() && !dirent.name.startsWith('.') && dirent.name !== 'node_modules') {
      updateImports(filePath);
    } else if (dirent.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js'))) {
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;
      
      Object.entries(renamedFiles).forEach(([oldFile, newFile]) => {
        const oldName = oldFile.replace(/\.tsx?$/, '');
        const newName = newFile.replace(/\.tsx?$/, '');
        const regex = new RegExp(`from\\s+['"](.*/components/)?${oldName}['"]`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, `from '$1${newName}'`);
          updated = true;
        }
      });
      
      if (updated) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated imports in: ${filePath}`);
      }
    }
  });
}

// Update imports in all directories
updateImports(rootDir);

console.log('Renaming and updating imports completed.');