import axios from "axios";
import { languageList } from "@/constants/language-versions";

export const executeCode = async (selectedLang, sourceCode, input) => {
  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: selectedLang,
    version: languageList[selectedLang],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: input,
  });
  return response.data;
};
