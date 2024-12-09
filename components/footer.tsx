import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


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
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Rent Mate</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Tutorials
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Categories</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Apartments
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Houses
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Rooms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Studios
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Setup Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-600 hover:text-gray-900">
                      FAQ
                    </Link>
                  </li>
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

