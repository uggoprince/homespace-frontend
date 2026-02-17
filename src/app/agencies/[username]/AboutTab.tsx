import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Agency } from '@/types/property';

export default function AboutTab({ agency }: { agency: Agency }) {
  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800/50 p-5 sm:p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">About {agency.name}</h2>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">{agency.about}</p>

      {/* Social Links */}
      {(agency.facebook || agency.instagram || agency.twitter) && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
          <div className="flex items-center gap-3">
            {agency.facebook && (
              <a
                href={agency.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            )}
            {agency.instagram && (
              <a
                href={agency.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            )}
            {agency.twitter && (
              <a
                href={agency.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
