export default function ListItem() {
  const items = ["samir", "fazal", "manam"];

  const countItems = () => {
    return items.length
  }

  return (
    <div className="mt-0">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <h1 className="text-center text-slate-50 font-semibold text-lg mt-3">List Group</h1>
        <p className="mt-2 text-slate-200 text-center text-xs mb-4">
          {countItems()} list items found
        </p>
        <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
          {items.map((item) => (
            <li key={item} className="px-4 py-2 bg-white hover:bg-purple-100 hover:text-orange-800 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
