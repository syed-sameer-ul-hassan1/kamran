import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StorefrontDataProvider } from './context/StorefrontDataContext';
import { BotehSymbol } from './components/Icons';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import SplashScreen from './components/SplashScreen';

import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CraftPage from './pages/CraftPage';
import ContactPage from './pages/ContactPage';
import GuidesPage from './pages/GuidesPage';
import GuideDetailPage from './pages/GuideDetailPage';
import SubmitReviewPage from './pages/SubmitReviewPage';

export default function App() {
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('splashShown') === 'true'
  );

  function handleSplashDone() {
    sessionStorage.setItem('splashShown', 'true');
    setSplashDone(true);
  }

  return (
    <StorefrontDataProvider>
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}

      <BrowserRouter>
        <SEO />
        <BotehSymbol />
        <ScrollToTop />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/collection/:id" element={<ProductDetailPage />} />
            <Route path="/review/:id" element={<SubmitReviewPage />} />
            <Route path="/reviews/:id" element={<SubmitReviewPage />} />
            <Route path="/review" element={<SubmitReviewPage />} />
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
