import { useEffect, useState } from "react";

function OutputComponent({ output }) {
  const [response, setResponse] = useState([]);
  const [errorResponse, setErrorResponse] = useState(false);

  useEffect(() => {
    if (output && output.run && output.run.output) {
      output.run.stderr ? setErrorResponse(true) : setErrorResponse(false);
      const responseArray = output.run.output.split("\n");
      setResponse(responseArray);
    } else if (output && output.run && output.run.signal) {
      setErrorResponse(true);
      setResponse([
        "💀 Execution Error: Your code was terminated due to exceeding resource limits (e.g., memory or execution time). Please optimize your code or reduce its output size(limit 1024kb) and try again.",
      ]);
    } else {
      setResponse([]);
    }
  }, [output]);

  return (
    <div className="text-wrap p-3 scrollbar overflow-scroll border-2 h-full rounded-br-md">
      <h1 className="">Output</h1>
      {response.map((element, index) => (
        <p
          key={`${index}-${element}`}
          className={`text-sm break-words w-full ${
            errorResponse ? "text-red-500" : "text-green-500"
          }`}
        >
          {element}
        </p>
      ))}
    </div>
  );
}

export default OutputComponent;
