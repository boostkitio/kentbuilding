import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Navbar: React.FC = () => {
  const logoWhiteUrl = "https://ik.imagekit.io/boostkit/Kent%20Building/KBAC%20V2.webp?updatedAt=1752566844734";
const logoColorUrl = "https://ik.imagekit.io/boostkit/Kent%20Building/KBAC%20V2.webp?updatedAt=1752566844734";

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <nav className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center"
          >
            <img 
              src={scrolled ? logoColorUrl : logoWhiteUrl} 
              alt="Kent Building & Construction Logo" 
              className="h-14 sm:h-16 md:h-[88px] lg:h-[104px] transition-all duration-300" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                isActive(link.path)
                  ? scrolled 
                    ? 'font-semibold text-primary-600' 
                    : 'font-semibold text-white underline decoration-2 underline-offset-4'
                  : scrolled
                  ? 'text-gray-700 hover:text-primary-600'
                  : 'text-white hover:text-primary-100'
              } transition-colors text-base font-medium px-2`}
            >
              {link.name}
            </Link>
          ))}

          <a
            href="tel:07766141811"
            className="btn btn-primary flex items-center ml-3 text-sm px-5 py-2.5"
          >
            <Phone size={16} className="mr-2" />
            <span>07766 141 811</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center ml-4">
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`p-3 ${scrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-white transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
        style={{ top: '0', height: '100vh' }}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="p-2 text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col h-full px-10 pt-8 pb-16">
          <div className="mb-10">
            <img 
              src={logoColorUrl} 
              alt="Kent Building & Construction Logo" 
              className="h-16 sm:h-20" 
            />
          </div>
          <div className="flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-5 text-lg ${
                  isActive(link.path)
                    ? 'font-semibold text-primary-600'
                    : 'text-gray-800'
                } border-b border-gray-100`}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <a
              href="tel:07766141811"
              className="btn btn-primary w-full justify-center flex items-center py-3.5"
            >
              <Phone size={18} className="mr-2" />
              <span>07766 141 811</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;