import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StorefrontDataProvider } from './context/StorefrontDataContext';
import { BotehSymbol } from './components/Icons';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';

import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import CraftPage from './pages/CraftPage';
import ContactPage from './pages/ContactPage';
import GuidesPage from './pages/GuidesPage';
import GuideDetailPage from './pages/GuideDetailPage';

export default function App() {
  return (
    <StorefrontDataProvider>
      <BrowserRouter>
        <SEO />
        <BotehSymbol />
        <WhatsAppFloat />
        <ScrollToTop />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/craft" element={<CraftPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/:slug" element={<GuideDetailPage />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </StorefrontDataProvider>
  );
}
