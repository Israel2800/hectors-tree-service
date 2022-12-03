import React from 'react';
import HLogo from '../../assets/HLogo.png';
import { BiChevronDown } from "react-icons/bi"; 

export default function Navbar({ handlePageChange }) {
    return (
        <header className="bg-gray-800 md:sticky top-0 z-10">
            <div className="container mx-auto flex flex-wrap p-5 pt-12 m- md:flex-row items-center justify-center">
                <a className="title-font font-medium text-white mb-4 md:mb-0">
                    <a 
                        href="#about" className="ml-3 text-xl"
                        onClick={() => handlePageChange('About')}>
                        
                    </a>
                </a>
                <nav className=" md:py-1  md:border-gray-700	flex flex-wrap items-center text-base justify-center">
                </nav>

                <a 
                    href="#services" className=" hover:text-white inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
                    onClick={() => handlePageChange('Services')}>
                    Services
                    <BiChevronDown size ={20}/>
                </a>

                {/* Services */}
                <a 
                    href="#TreeRemoval" className=" hover:text-white inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
                    
                    onClick={() => handlePageChange('TreeRemoval')}>
                    Tree Removal
                </a>
                <a 
                    href="#StumpRemoval" className=" hover:text-white inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
                    
                    onClick={() => handlePageChange('StumpRemoval')}>
                    Stump Removal
                </a>
                <a 
                    href="#TreeTrimming" className=" hover:text-white inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
                    
                    onClick={() => handlePageChange('TreeTrimming')}>
                    Tree Trimming
                </a>
                <a 
                    href="#TreeCare" className=" hover:text-white inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
                    
                    onClick={() => handlePageChange('TreeCare')}>
                    Tree Care
                </a>
                <a
                    href="#contact"
                    className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
                    onClick={() => handlePageChange('Contact')}>
                    Contact Us!
                    {/* <ArrowRightIcon className="w-4 h-4 ml-1" /> */}
                </a>
            </div>
        </header>
    );
}