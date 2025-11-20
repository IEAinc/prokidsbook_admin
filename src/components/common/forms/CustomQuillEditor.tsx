// src/components/Editor/CustomQuillEditor.tsx
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CustomQuillEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export const CustomQuillEditor = ({ initialValue = '', onChange }: CustomQuillEditorProps) => {
  const [value, setValue] = useState(initialValue);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleChange = (content: string) => {
    setValue(content);
    onChange?.(content);
  };

  return (
    <div className="h-[200px]">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        className="h-[150px] custom-quill"
      />
    </div>
  );
};