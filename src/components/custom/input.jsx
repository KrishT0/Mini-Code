import { useState, useRef, forwardRef, useImperativeHandle } from "react";

// Shadcn UI components
import { Textarea } from "@/components/ui/textarea";

const InputComponent = forwardRef((_, ref) => {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    getValue: () => inputRef.current.value,
  }));

  return (
    <div className="p-3 border-2 h-full rounded-tr-md">
      <h1>Input</h1>
      <Textarea
        ref={inputRef}
        className="w-full py-1 scrollbar h-[90%] text-sm resize-none"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </div>
  );
});

export default InputComponent;
