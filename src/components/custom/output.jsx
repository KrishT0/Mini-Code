import { useEffect, useState } from "react";

function OutputComponent({ output }) {
  const [response, setResponse] = useState([]);
  const [errorResponse, setErrorResponse] = useState(false);

  useEffect(() => {
    if (output && output.run && output.run.output) {
      output.run.stderr ? setErrorResponse(true) : setErrorResponse(false);
      const responseArray = output.run.output.split("\n");
      setResponse(responseArray);
    } else {
      setResponse([]);
    }
  }, [output]);

  console.log(output.run);

  return (
    <div className={`p-3 border-2 h-full rounded-r-md ${errorResponse ? "text-red-500" : "text-green-500"}`}>
      {response.map((element, index) => (
        <p key={`${index}-${element}`} className="text-sm">
          {element}
        </p>
      ))}
    </div>
  );
}

export default OutputComponent;
