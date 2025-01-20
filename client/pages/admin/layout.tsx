// components/Layout.tsx
import React from 'react';
import Header from '../../src/components/admin/Header';
import Sidebar from '../../src/components/admin/SideNavbar';
import Footer from '../../src/components/admin/Footer';
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-full">
      <Header />
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 h-screen  p-7 md:pl-7">{children}</div>
      </div>
      <Footer />
    </div>
  );
};


AdminLayout.noLayout = true;

export default AdminLayout;