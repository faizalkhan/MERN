import React, { useState } from "react";
import {
  ClipboardDocumentIcon,
  WrenchIcon,
  CubeIcon,
  CogIcon,
  PencilSquareIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Link from 'next/link';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <ClipboardDocumentIcon className="h-6 w-6" /> },
    { name: "Product List", href: "/admin/productItemList", icon: <WrenchIcon className="h-6 w-6" /> },
  ];

  return (
    
      <div
        className={`transition-all duration-300 bg-white shadow-md h-full ${
          isExpanded ? "w-64" : "w-16"
        } md:relative fixed`}
      >

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 focus:outline-none flex justify-center"
        >
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </button>

        {/* Navigation */}
        <nav className="mt-4 space-y-4">
          {navigation.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-200 transition-all duration-200"
            >
              {item.icon}

              <Link href={item.href}>
           {isExpanded && <span className="text-gray-700">{item.name}</span>}
            </Link>
          
            </div>
          ))}
        </nav>
      </div>
    
  );
};

export default Sidebar;

