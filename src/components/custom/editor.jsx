import { useState, useRef } from "react";
import InputComponent from "@/components/custom/input";
import OutputComponent from "@/components/custom/output";
import { codeSnippets } from "@/constants/code-snippets";
import { languageList } from "@/constants/language-versions";
import { useMutation } from "@tanstack/react-query";
import { executeCode } from "@/api";

// shadcn UI components
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

function EditorComponent() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(codeSnippets.javascript);
  const [output, setOutput] = useState("");
  const editorRef = useRef();

  const mutation = useMutation({
    mutationFn: ({ language, code }) => executeCode(language, code),
    onSuccess: (data) => {
      setOutput(data);
    },
  });

  function selectLanguage(value) {
    const lang = value.split(" ")[0];
    setLanguage(lang);
    setCode(codeSnippets[lang]);
  }

  console.log(editorRef.current);

  function runCode() {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      mutation.mutate({ language, code });
    } else {
      console.log("Editor is not yet mounted");
    }
  }
  return (
    <div className="p-3 h-[90%]">
      <div className="py-5 h-[10%] flex gap-5">
        <Select defaultValue={language} onValueChange={selectLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(languageList).map(([lang, version]) => (
                <SelectItem
                  key={lang}
                  value={`${lang} ${version}`}
                  className="hover:bg-gray-100"
                >
                  <p>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}{" "}
                    <span className="text-gray-500 ml-2">{version}</span>
                  </p>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="ml-3" variant="secondary" onClick={runCode}>
          Run
        </Button>
      </div>
      <div className="h-[90%]">
        <ResizablePanelGroup
          direction="horizontal"
          className=" rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <InputComponent
              language={language}
              defaultCode={code}
              ref={editorRef}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <OutputComponent output={output} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default EditorComponent;
