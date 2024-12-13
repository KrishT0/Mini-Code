import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

function InputComponent({ language }) {
  const [code, setCode] = useState("");
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  console.log(language);
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      language={language}
      defaultValue={code}
      theme="vs-dark"
      onMount={onMount}
      onChange={(value) => setCode(value)}
    />
  );
}

export default InputComponent;
