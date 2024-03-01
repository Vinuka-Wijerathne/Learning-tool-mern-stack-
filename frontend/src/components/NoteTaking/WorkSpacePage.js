import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './workspace.css';
import Navigationbar from '../Navigationbar';
//import mammoth from 'mammoth';

const WorkspacePage = () => {
  const [text, setText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code', 'code-block'],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code', 'code-block',
    'align',
    'link', 'image', 'video',
    'script', 'indent', 'direction', 'size',
    'color', 'background',
    'font',
  ];

  const handleSave = () => {
    // Implement save functionality (e.g., save to database)
    console.log('Saving content:', text);
  };

  const handleExport = (format) => {
    // Implement export functionality based on the selected format
    console.log(`Exporting content as ${format}:`, text);
    // You can use libraries like html-to-pdf or mammoth.js for exporting to PDF or DOCX
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="workspace-container">
        <Navigationbar />
      <div className="menu-icon" onClick={toggleMenu}>
        <span>...</span>
      </div>
      <h1 className="workspace-heading">Workspace</h1>
      {menuVisible && (
        <div className="options-menu">
          <div className="option" onClick={handleSave}>
            <i className="fas fa-save save-icon"></i> Save
          </div>
          <div className="option" onClick={() => handleExport('pdf')}>
            <i className="fas fa-file-pdf export-icon"></i> Export as PDF
          </div>
          <div className="option" onClick={() => handleExport('docx')}>
            <i className="fas fa-file-word export-icon"></i> Export as DOCX
          </div>
        </div>
      )}
      <ReactQuill
        className="workspace-textarea"
        value={text}
        onChange={setText}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
      />
    </div>
  );
};
export default WorkspacePage;