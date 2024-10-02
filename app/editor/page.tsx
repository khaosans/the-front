'use client';

import React from 'react';

const CodeEditor: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Code Editor</h1>
            <p className="text-lg text-gray-600 mb-8">Write and edit your code here.</p>
            {/* You can integrate a code editor component here, like CodeMirror or Monaco Editor */}
            <textarea className="w-full h-96 border rounded p-4" placeholder="Start coding..."></textarea>
        </div>
    );
};

export default CodeEditor;