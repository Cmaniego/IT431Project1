import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4 bg-black">
      <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">Manga Zone</h1>
            <nav className="flex gap-6">
              <Link href={`/`} className="text-white-500 hover:text-orange-200">
                Home
              </Link>
              <Link href={`/allmanga`} className="text-white-500 hover:text-orange-200">
                All Manga
              </Link>
            </nav>
          </div>
        </div>
    </header>
  );
} 