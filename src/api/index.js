import axios from "axios";
import { languageList } from "@/constants/language-versions";

export const executeCode = async (selectedLang, sourceCode) => {
  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: selectedLang,
    version: languageList[selectedLang],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
