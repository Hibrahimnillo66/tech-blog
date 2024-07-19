import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 bg-blue-600 text-white text-center fixed">
      <nav>
        <Link href="/" className="px-4">
          Home
        </Link>
        <Link href="/about" className="px-4">
          About
        </Link>
      </nav>
    </header>
  );
}
