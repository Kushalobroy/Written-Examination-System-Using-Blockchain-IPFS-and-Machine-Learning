import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor() {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);
  const inputRef = useRef(null);

  const insertFormula = () => {
    if (quillRef.current) {
      const formula = 'E=mc^2'; // Your LaTeX formula here
      const cursorPosition = quillRef.current.getSelection().index;
      quillRef.current.editor.insertText(cursorPosition, `{{${formula}}}`);
      quillRef.current.focus(); // Maintain focus on the editor
    }
    if (inputRef.current) {
      const formula = 'E=mc^2'; // Your LaTeX formula here
      inputRef.current.value += formula;
      inputRef.current.focus(); // Maintain focus on the input field
    }
  };

  const insertGraph = () => {
    if (quillRef.current) {
      // Generate sample data
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2],
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
          },
        ],
      };

      const graphData = JSON.stringify(data); // Store data as JSON string
      const cursorPosition = quillRef.current.getSelection().index;
      quillRef.current.editor.insertText(cursorPosition, `{{graph:${graphData}}}`);
      quillRef.current.focus(); // Maintain focus on the editor
    }
    if (inputRef.current) {
      // You can insert graph data into the input field here, if needed.
      inputRef.current.focus(); // Maintain focus on the input field
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        [{ color: [] }, { background: [] }],
        ['code-block'],
        [{ formula: 'E=mc^2' }, { formula: 'x=y^2' }], // Add available formula names here
        [{ graph: 'Insert Graph' }],
      ],
      handlers: {
        formula: insertFormula,
        graph: insertGraph,
      },
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'link',
    'code-block',
  ];

  return (
    <div className="App">
      <div className="editor">
        <ReactQuill
          ref={quillRef}
          value={editorHtml}
          onChange={setEditorHtml}
          modules={modules}
          formats={formats}
        />
      </div>
      <div className="input-field">
        <input type="text" ref={inputRef} />
      </div>
    </div>
  );
}

export default Editor;
