import Pagination from "../ui/Pagination";

function SideBar() {
  return (
    <div className="flex">
      <Pagination />
      {/* <ol className="items-left flex h-[max-content] w-[max-content] gap-4 md:gap-4 py-2 flex-col px-1  md:py-1">
        <li className="text-sm font-medium md:text-base">
          Business Structure
        </li>
        <div className=" flex flex-col gap-1 px-3 mb-3 md:mb-0">
          <span className="text-xs text-stone-400 md:text-sm">
            Business Representative
          </span>
          <span className="text-xs text-stone-400 md:text-sm">
            Business Details
          </span>
        </div>

        <li className="text-sm font-medium mb-1 md:mb-0 md:text-base">
          Bank Details
        </li>
        <li className="text-sm font-medium sm:mb-1 md:mb-0 md:text-base">
          2 Step Authentication
        </li>
        <li className="text-sm font-medium  md:text-base">Overview</li>
      </ol> */}
    </div>
  );
}

export default SideBar;
