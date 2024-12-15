import React from "react";
import { ModeToggle } from "./toggle-theme";

function HeaderComponent() {
  return (
    <div className="max-w-[1200px] h-[7%] sm:h-[10%] mx-auto py-2 sm:py-5 relative">
      <h1 className="text-center text-lg sm:text-2xl font-semibold">
        Mini Code
      </h1>
      <p className="text-center text-sm sm:text-base text-muted-foreground">
        A minimal code editor
      </p>
      <div className="absolute right-1 top-3">
        <ModeToggle />
      </div>
    </div>
  );
}

export default HeaderComponent;
