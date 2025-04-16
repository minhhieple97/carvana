import { SiInstagram, SiMeta, SiX } from '@icons-pack/react-simple-icons';
import Image from 'next/image';
import Link from 'next/link';

import { navLinks } from '@/config/constants';
import { routes } from '@/config/routes';

import { NewsletterForm } from '../news-letter-form';
const socialLinks = [
  {
    id: 1,
    href: 'https://facebook.com',
    icon: <SiMeta className="w-5 h-5 text-gray-600 hover:text-primary transition-colors" />,
  },
  {
    id: 2,
    href: 'https://twitter.com',
    icon: <SiX className="w-5 h-5 text-gray-600 hover:text-primary transition-colors" />,
  },
  {
    id: 3,
    href: 'https://instagram.com',
    icon: <SiInstagram className="w-5 h-5 text-gray-600 hover:text-primary transition-colors" />,
  },
];
export const PublicFooter = () => (
  <footer className="bg-gray-100 dark:bg-gray-900 px-4 py-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col space-x-2 gap-y-2">
        <Link className="flex items-center" href={routes.home}>
          <Image width={300} height={100} alt="logo" className="h-8 relative" src="/logo.svg" />
        </Link>
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <Link href={link.href} key={link.id}>
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      <ul className="space-y-1">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={routes.signIn}
            className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
          >
            Admin
          </Link>
        </li>
      </ul>
      <NewsletterForm />
    </div>
    <div className="container mx-auto mt-8 text-center">
      <h4 className="text-lg font-bold text-primary mb-2">Company Info</h4>
      <p className="text-gray-700 dark:text-gray-300 mb-1">
        Company No. 123456789 | VAT No. GB123456789
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Majestic Motors is not authorised and not regulated by the Financial Conduct Authority
      </p>
    </div>
  </footer>
);
