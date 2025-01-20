
import { useState } from 'react';
import Layout from '../src/components/layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthenticateProvider } from '../src/components/contexts/AuthenticateContext';
import "../src/styles/App.css";
import "../src/styles/AddEditProduct.css";
import "../src/styles/ProductFilter.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/styles/SingleProductPage.css";
import "../src/styles/ProductCard.css";
import "../src/styles/ShareBtn.css";
import './styles/globals.css';
import AdminLayout from './admin/layout';




function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  if (Component.noLayout) {
    return (
      <AdminLayout>
    <AuthenticateProvider>
     
    <Component {...pageProps} />
   
    </AuthenticateProvider>
    </AdminLayout>
    )
  }


  console.log('Rendering MyApp');
  return (
    <Layout>
     <QueryClientProvider client={queryClient}>
     <Component {...pageProps} /> 
     </QueryClientProvider>
     </Layout>
     );
  }

export default MyApp;