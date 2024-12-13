import axios from "axios";
import { languageList } from "@/constants/language-versions";

export const executeCode = async (language, sourceCode) => {
  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: language,
    version: languageList[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
