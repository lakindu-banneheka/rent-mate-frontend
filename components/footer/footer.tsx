import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import logo from '../../images/logo.png';

type LinkItem = {
    name: string;
    link: string;
}

type FooterData = {
    main: LinkItem[];
    quick_links: LinkItem[];
    categories: LinkItem[];
    resources: LinkItem[];
}

const footerData: FooterData = {
  main: [
    { name: 'Overview', link: '/' },
    { name: 'Features', link: '/' },
    { name: 'Solutions', link: '/' },
    { name: 'Tutorials', link: '/' },
  ],
  quick_links: [
    { name: 'About us', link: '/' },
    { name: 'Contact us', link: '/' },
    { name: 'Privacy Policy', link: '/' },
    { name: 'Terms of Service', link: '/' },
  ],
  categories: [
    { name: 'Drones', link: '/' },
    { name: 'Cameras', link: '/' },
    { name: 'Rooms', link: '/' },
    { name: 'Speaker Systems', link: '/' },
  ],
  resources: [
    { name: 'Setup Guide', link: '/' },
    { name: 'Documentation', link: '/' },
    { name: 'Help Center', link: '/' },
    { name: 'FAQ', link: '/' },
  ],
}

export default function Footer() {
    return (
        <footer className="bg-background border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <div>
                            <Link href="/" className="flex items-center justify-center space-x-2">
                                <span className="sr-only">Rent Mate</span>
                                <Image
                                    src={logo}
                                    alt="Rent Mate Logo"
                                    // width={150}
                                    // height={40}
                                    className="w-28 rounded-lg"
                                />
                            </Link>
                            {/* <p className="text-gray-600 text-base">
                                Making renting simple and accessible for everyone.
                            </p> */}
                        </div>
                        {/* <Image
                            src={logo}
                            alt="Rent Mate Logo"
                            // width={150}
                            // height={40}
                            className="w-28 rounded-lg"
                        /> */}
                        <p className="text-gray-600 text-base ">
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
                                <NavigationLinks 
                                    quickLinks={footerData.main}
                                    title='Rent Mate'
                                />
                            </div>
                            <div className="mt-12 md:mt-0">
                                <NavigationLinks 
                                    quickLinks={footerData.quick_links}
                                    title='Quick Links'
                                />
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <NavigationLinks 
                                    quickLinks={footerData.categories}
                                    title='Categories'
                                />
                            </div>
                            <div className="mt-12 md:mt-0">
                                <NavigationLinks 
                                    quickLinks={footerData.resources}
                                    title='Resources'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; 2025 Rent Mate. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};


interface NavigationLinksProps {
    quickLinks: { name: string; link: string }[];
    title: string;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ quickLinks, title }) => {
    return (
    <div>
        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{title}</h3>
        <ul className="mt-4 space-y-4">
        {quickLinks.map((item) => (
            <li key={item.name}>
            <Link href={item.link} className="text-base text-gray-600 hover:text-gray-900">
                {item.name}
            </Link>
            </li>
        ))}
        </ul>
    </div>
    );
};