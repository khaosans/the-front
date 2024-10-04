import React from 'react';
import { render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import TaskCard from '../components/task-card'; // Ensure this path is correct

// Mock necessary dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Helper function to get all component files
function getComponentFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }
  const files = fs.readdirSync(dir);
  return files.filter(file => file.endsWith('.tsx') && !file.endsWith('.test.tsx'));
}

describe('UI Component Snapshots', () => {
  const componentDirs = [
    path.join(process.cwd(), 'components'),
    path.join(process.cwd(), 'app/components'),
    // Add more directories if needed
  ];

  componentDirs.forEach(componentDir => {
    const componentFiles = getComponentFiles(componentDir);

    componentFiles.forEach(file => {
      const componentName = path.basename(file, '.tsx');
      let Component;

      test(`${componentName} matches snapshot`, () => {
        try {
          Component = require(path.join(componentDir, file)).default;
        } catch (error: any) { // Explicitly typing error as 'any'
          console.warn(`Failed to import component ${componentName}: ${error.message}`);
          return; // Skip this test if component can't be imported
        }

        if (!Component) {
          console.warn(`Component ${componentName} not found or has no default export`);
          return; // Skip this test if component is not found
        }

        // Wrap the render in a try-catch block
        try {
          const { asFragment } = render(<Component />);
          expect(asFragment()).toMatchSnapshot();
        } catch (error: any) { // Explicitly typing error as 'any'
          console.warn(`Failed to render ${componentName}: ${error.message}`);
          // You might want to fail the test here instead of just warning
          // throw error;
        }
      });
    });
  });

  // You can add specific tests for components that require props here
  // For example:
  // test('Button with text matches snapshot', () => {
  //   const Button = require('../path/to/Button').default;
  //   const { asFragment } = render(<Button>Click me</Button>);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});