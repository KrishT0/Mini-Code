import { useState } from "react";
import InputComponent from "@/components/custom/input";
import OutputComponent from "@/components/custom/output";

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

const languageList = ["javascript", "python", "typescript", "java", "c++"];

function EditorComponent() {
  const [language, setLanguage] = useState("javascript");

  return (
    <div className=" p-3 h-[90%]">
      <div className="py-5 h-[10%]">
        <Select defaultValue={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {languageList.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="hover:bg-gray-100"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[90%]">
        <ResizablePanelGroup
          direction="horizontal"
          className=" rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <InputComponent language={language} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <OutputComponent />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default EditorComponent;
