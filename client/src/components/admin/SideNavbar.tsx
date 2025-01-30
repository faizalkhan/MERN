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

const Sidebar = ({ onToggle }: { onToggle: (isExpanded: boolean) => void }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <ClipboardDocumentIcon className="h-6 w-6" /> },
    { name: "Product List", href: "/admin/productItemList", icon: <WrenchIcon className="h-6 w-6" /> },
  ];


  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggle(newState); // Notify parent about the toggle state
  };

  return (
    
      <div
        className={`transition-all duration-300 bg-white shadow-md h-full z-40 ${
        isExpanded ? "w-40" : "w-16"
      } fixed`}
      >

        <button
          onClick={toggleSidebar}
          className="p-3 focus:outline-none flex justify-center"
        >
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </button>

        {/* Navigation */}
        <nav className="mt-4 space-y-4">
          {navigation.map((item, index) => (
            <Link href={item.href} key={index}>
              <div className="flex items-center space-x-2 py-2 px-3 hover:bg-gray-200 transition-all duration-200 cursor-default">
                {item.icon}
                {isExpanded && <span className="text-gray-700">{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    
  );
};

export default Sidebar;

