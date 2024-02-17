import Mainpromt from "./mainpromt";
import Sidepanel from "./sidepanel";
import FixedInputField from "./fixedinputfield";

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="rounded-lg col-span-3 bg-gray-200">
        <Sidepanel />
      </div>
      <div className="rounded-lg col-span-9 relative">
        <Mainpromt />
        <FixedInputField />
      </div>
    </div>
  );
}
