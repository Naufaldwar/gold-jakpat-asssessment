import Menu from "../../menu.svg";
export default function Header() {
  return (
    <div className="flex justify-between items-center px-10 py-4 border bg-red-50">
      <h1 className="text-xl">Characters</h1>
      <div className="hidden md:flex gap-8">
        <p>Character</p>
        <p>Locations</p>
        <p>Episodes</p>
      </div>
      <div className="group md:hidden">
        <button>
          <img src={Menu} alt="" className="w-4 h-4" />
        </button>
        <div className="absolute hidden group-hover:block right-5 top-10 bg-white p-2">
          <p>Character</p>
          <p>Locations</p>
          <p>Episodes</p>
        </div>
      </div>
    </div>
  );
}
