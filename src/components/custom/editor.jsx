import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { executeCode } from "@/api";
import InputComponent from "@/components/custom/input";
import OutputComponent from "@/components/custom/output";
import SmallLoader from "@/components/custom/loader";
import { codeSnippets } from "@/constants/code-snippets";
import { languageList } from "@/constants/language-versions";

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
  const [language, setLanguage] = useState(
    `${Object.keys(languageList)[0]} ${languageList.cpp}`
  );
  const [code, setCode] = useState(codeSnippets.cpp);
  const [output, setOutput] = useState("");
  const editorRef = useRef();

  const mutation = useMutation({
    mutationFn: ({ selectedLang, code }) => executeCode(selectedLang, code),
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
    console.log("Running code");
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const selectedLang = language.split(" ")[0];
      mutation.mutate({ selectedLang, code });
    } else {
      console.log("Editor is not yet mounted");
    }
  }

  function clearOutput() {
    setOutput("");
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
              {Object.entries(languageList).map(([lang, version]) => {
                let displayLang = lang;
                if (lang === "csharp") {
                  displayLang = "C#";
                } else if (lang === "cpp") {
                  displayLang = "C++";
                } else if (lang === "php") {
                  displayLang = "PHP";
                } else {
                  displayLang = lang.charAt(0).toUpperCase() + lang.slice(1);
                }
                return (
                  <SelectItem
                    key={lang}
                    value={`${lang} ${version}`}
                    className="hover:bg-gray-100"
                  >
                    <p>
                      {displayLang}{" "}
                      <span className="text-gray-500 ml-2">{version}</span>
                    </p>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="ml-3"
          variant="secondary"
          onClick={runCode}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <SmallLoader /> : "Run"}
        </Button>
        <Button className="ml-3" variant="secondary" onClick={clearOutput}>
          Clear Output
        </Button>
      </div>
      <div className="h-[90%]">
        <ResizablePanelGroup
          direction="horizontal"
          className=" rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <InputComponent
              language={language.split(" ")[0]}
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
