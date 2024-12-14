import { LoaderCircle } from "lucide-react";

function SmallLoader() {
  return (
    <div className="animate-spin">
      <LoaderCircle size={20} />
    </div>
  );
}

export default SmallLoader;
