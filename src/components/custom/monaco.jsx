import {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import Editor from "@monaco-editor/react";
import { useMediaQuery } from "@/hooks/use-media-query";

const MonacoEditorComponent = forwardRef(({ language, defaultCode }, ref) => {
  const [code, setCode] = useState(defaultCode);
  const editorRef = useRef();
  const isSmallScreen = useMediaQuery("(min-width: 500px)");

  useEffect(() => {
    setCode(defaultCode);
  }, [defaultCode]);

  const editorOptions = {
    fontFamily: "JetBrains Mono",
    fontSize: 13,
    fontWeight: 700,
    wordWrap: "on",
    wordWrapColumn: 80,
    wrappingIndent: "indent",
    minimap: {
      enabled: isSmallScreen ? true : false,
    },
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current.getValue(),
    getEditorRef: () => editorRef.current._domElement,
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
      options={editorOptions}
    />
  );
});

export default MonacoEditorComponent;
