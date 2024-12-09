import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

// Define the type for our link items
type LinkItem = {
  name: string;
  link: string;
}

// Define the type for our footer data
type FooterData = {
  main: LinkItem[];
  quick_links: LinkItem[];
  categories: LinkItem[];
  resources: LinkItem[];
}

// Sample footer data
const footerData: FooterData = {
  main: [
    { name: 'Overview', link: '/overview' },
    { name: 'Features', link: '/features' },
    { name: 'Solutions', link: '/solutions' },
    { name: 'Tutorials', link: '/tutorials' },
  ],
  quick_links: [
    { name: 'About us', link: '/about' },
    { name: 'Contact us', link: '/contact' },
    { name: 'Privacy Policy', link: '/privacy' },
    { name: 'Terms of Service', link: '/terms' },
  ],
  categories: [
    { name: 'Apartments', link: '/apartments' },
    { name: 'Houses', link: '/houses' },
    { name: 'Rooms', link: '/rooms' },
    { name: 'Studios', link: '/studios' },
  ],
  resources: [
    { name: 'Setup Guide', link: '/setup' },
    { name: 'Documentation', link: '/docs' },
    { name: 'Help Center', link: '/help' },
    { name: 'FAQ', link: '/faq' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image
              src="/logo-placeholder.svg"
              alt="Rent Mate Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-gray-600 text-base">
              Making renting simple and accessible for everyone.
            </p>
            <div className="flex space-x-6">
              {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((social) => (
                <Link key={social} href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{social}</span>
                  {social === 'Facebook' && <Facebook className="h-6 w-6" />}
                  {social === 'Twitter' && <Twitter className="h-6 w-6" />}
                  {social === 'Instagram' && <Instagram className="h-6 w-6" />}
                  {social === 'Linkedin' && <Linkedin className="h-6 w-6" />}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Rent Mate</h3>
                <ul className="mt-4 space-y-4">
                  {footerData.main.map((item) => (
                    <li key={item.name}>
                      <Link href={item.link} className="text-base text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
                <ul className="mt-4 space-y-4">
                  {footerData.quick_links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.link} className="text-base text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Categories</h3>
                <ul className="mt-4 space-y-4">
                  {footerData.categories.map((item) => (
                    <li key={item.name}>
                      <Link href={item.link} className="text-base text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
                <ul className="mt-4 space-y-4">
                  {footerData.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.link} className="text-base text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 Rent Mate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

