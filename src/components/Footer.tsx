import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">Peyaraful</h3>
            <p className="text-gray-400 text-sm">
              Find your perfect cat companion. Adopt, share stories, and join our community.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Important Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/cats" className="hover:text-emerald-400 transition-colors">Browse Cats</Link></li>
              <li><Link href="/stories" className="hover:text-emerald-400 transition-colors">Cat Stories</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About & Contact</Link></li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Developer</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Akash Mia</li>
              <li>
                <a href="mailto:arakash022@gmail.com" className="hover:text-emerald-400 transition-colors">
                  arakash022@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/PeyaraFul" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  GitHub: @PeyaraFul
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/md-akash-mia-bd" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  LinkedIn: md-akash-mia-bd
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Peyaraful Cat Adoption. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
