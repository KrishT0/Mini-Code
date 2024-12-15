import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { executeCode } from "@/api";
import MonacoEditorComponent from "@/components/custom/monaco";
import OutputComponent from "@/components/custom/output";
import InputComponent from "@/components/custom/input";
import SmallLoader from "@/components/custom/loader";
import { codeSnippets } from "@/constants/code-snippets";
import { languageList } from "@/constants/language-versions";
import { useMediaQuery } from "@/hooks/use-media-query";

// shadcn UI components
import { Button } from "../ui/button";
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

function EditorComponent() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(codeSnippets.cpp);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const editorRef = useRef();
  const inputRef = useRef();
  const isDesktop = useMediaQuery("(min-width: 750px)");

  const mutation = useMutation({
    mutationFn: ({ selectedLang, code, input }) =>
      executeCode(selectedLang, code, input),
    onSuccess: (data) => {
      setOutput(data);
    },
  });

  function selectLanguage(lang) {
    setLanguage(lang);
    setCode(codeSnippets[lang]);
  }

  function runCode() {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const selectedLang = language.split(" ")[0];
      const input = inputRef.current.getValue();
      mutation.mutate({ selectedLang, code, input });
    } else {
      console.log("Editor is not yet mounted");
    }
  }

  function clearOutput() {
    setOutput("");
  }

  const displayLang = (lang) => {
    if (lang === "csharp") {
      return "C#";
    } else if (lang === "cpp") {
      return "C++";
    } else if (lang === "php") {
      return "PHP";
    } else {
      return lang.charAt(0).toUpperCase() + lang.slice(1);
    }
  };

  return (
    <div className="p-1 sm:p-3 h-[93%] sm:h-[90%]">
      <div className="py-2 pt-3 sm:py-5 h-[10%] flex gap-2 sm:gap-5">
        <Select defaultValue={language} onValueChange={selectLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>{displayLang(language)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(languageList).map(([lang, version]) => (
                <SelectItem
                  key={lang}
                  value={lang}
                  className="hover:bg-gray-100"
                >
                  <p>
                    {displayLang(lang)}{" "}
                    <span className="text-gray-500 ml-2">{version}</span>
                  </p>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="ml-3 font-bold"
          variant="secondary"
          onClick={runCode}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <SmallLoader /> : "Run"}
        </Button>
        <Button
          className="ml-3 font-bold"
          variant="secondary"
          onClick={clearOutput}
        >
          Clear Output
        </Button>
      </div>
      <div className="h-[90%]">
        <ResizablePanelGroup
          direction={isDesktop ? "horizontal" : "vertical"}
          className=" rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={40}>
            <MonacoEditorComponent
              language={language.split(" ")[0]}
              defaultCode={code}
              ref={editorRef}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <ResizablePanelGroup
              direction={isDesktop ? "vertical" : "horizontal"}
            >
              <ResizablePanel defaultSize={50} minSize={35}>
                <InputComponent ref={inputRef} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={35}>
                <OutputComponent output={output} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default EditorComponent;
