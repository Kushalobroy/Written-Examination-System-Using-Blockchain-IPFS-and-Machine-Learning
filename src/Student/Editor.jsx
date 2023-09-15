import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Line } from 'react-chartjs-2'
function Editor() {

 const[editorHtml, setEditorHtml] = useState('');

  const insertFormula = () => {
    const cursorPosition = editorHtml.length;
    const formula = 'E=mc^2'; // Your LaTeX formula here
    const newHtml =
      editorHtml.slice(0, cursorPosition) +
      `{{${formula}}}` +
      editorHtml.slice(cursorPosition);
    setEditorHtml(newHtml);
  };

  const insertGraph = () => {
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

    const cursorPosition = editorHtml.length;
    const graphData = JSON.stringify(data); // Store data as JSON string
    const newHtml =
      editorHtml.slice(0, cursorPosition) +
      `{{graph:${graphData}}}` +
      editorHtml.slice(cursorPosition);
    setEditorHtml(newHtml);
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link'],
        [{ 'color': [] }, { 'background': [] }],
        ['code-block'],
        ['formula', 'graph'],
      ],
      handlers: {
        formula: insertFormula,
        graph: insertGraph,
      }
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link', 'code-block',
  ];

  return (
    <div className="App">

      <div className="editor">
        <ReactQuill
          value={editorHtml}
          onChange={setEditorHtml}
          modules={modules}
          formats={formats}
        />
      </div>
      <div className="preview">
        <h2>Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: katex.renderToString(editorHtml) }} />
        {editorHtml.includes('graph:') && (
          <Line data={JSON.parse(editorHtml.match(/{{graph:(.*?)}}/)[1])} />
        )}
      </div>
    </div>  
 )
}

export default Editor
