import {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import Editor from "@monaco-editor/react";

const InputComponent = forwardRef(({ language, defaultCode }, ref) => {
  const [code, setCode] = useState(defaultCode);
  const editorRef = useRef();

  useEffect(() => {
    setCode(defaultCode);
  }, [defaultCode]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current.getValue(),
  }));

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      language={language}
      theme="vs-dark"
      onMount={onMount}
      value={code}
      onChange={(value) => setCode(value)}
    />
  );
});

export default InputComponent;
