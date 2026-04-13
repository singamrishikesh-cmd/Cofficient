import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-gray-200 bg-white/70 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/coefficient-mark.svg" alt="Coefficient logo" width={32} height={32} />
              <div>
                <p className="text-sm font-semibold text-gray-900">Coefficient</p>
                <p className="text-xs text-gray-600">Modern vocabulary practice</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-gray-600">
              Daily loops for recognition, recall, and real usage. Build vocabulary that feels natural.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Product</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link className="block text-gray-700 hover:text-gray-900" href="/home">
                Home
              </Link>
              <Link className="block text-gray-700 hover:text-gray-900" href="/activities">
                Activities
              </Link>
              <Link className="block text-gray-700 hover:text-gray-900" href="/library">
                Library
              </Link>
              <Link className="block text-gray-700 hover:text-gray-900" href="/about">
                About
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Practice</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link className="block text-gray-700 hover:text-gray-900" href="/learn">
                Swipe Deck
              </Link>
              <Link className="block text-gray-700 hover:text-gray-900" href="/matrix">
                Lekto Matrix
              </Link>
              <Link className="block text-gray-700 hover:text-gray-900" href="/forge">
                Sentence Forge
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Portfolio</p>
            <div className="mt-3 space-y-2 text-sm">
              <a className="block text-gray-700 hover:text-gray-900" href="https://github.com/N9601" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Coefficient. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link className="text-gray-600 hover:text-gray-900" href="/">
              Landing
            </Link>
            <Link className="text-gray-600 hover:text-gray-900" href="/about">
              About
            </Link>
            <Link className="text-gray-600 hover:text-gray-900" href="/library">
              Library
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
