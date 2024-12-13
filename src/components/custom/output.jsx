import { useEffect, useState } from "react";

function OutputComponent({ output }) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (output && output.run && output.run.output) {
      setResponse(output.run.output);
    }
  }, [output]);

  return <div>{response}</div>;
}

export default OutputComponent;
