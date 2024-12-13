import React from "react";
import { ModeToggle } from "./toggle-theme";

function HeaderComponent() {
  return (
    <div className="max-w-[1200px] h-[10%] mx-auto py-5 relative">
      <h1 className="text-center text-2xl font-semibold">Mini Code</h1>
      <div className="absolute right-1 top-3">
        <ModeToggle />
      </div>
    </div>
  );
}

export default HeaderComponent;
