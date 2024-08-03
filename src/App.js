import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlockPage from './pages/BlockPage';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import FullNewsPage from './pages/FullNewsPage';
import { ThemeProvider, useTheme } from './ThemeContext'; // Ensure ThemeContext is correctly imported

function AppContent() {
  const [news, setNews] = useState(() => {
    const savedNews = localStorage.getItem('news');
    return savedNews ? JSON.parse(savedNews) : [];
  });

  const [ads, setAds] = useState(() => {
    const savedAds = localStorage.getItem('ads');
    return savedAds ? JSON.parse(savedAds) : [];
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('ads', JSON.stringify(ads));
  }, [ads]);

  const addNews = (newNews) => {
    setNews([newNews, ...news]);
  };

  const editNews = (id, updatedNews) => {
    setNews(news.map(item => item.id === id ? { ...item, ...updatedNews } : item));
  };

  const deleteNews = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  const addAd = (newAd) => {
    setAds([newAd, ...ads]);
  };

  const editAd = (id, updatedAd) => {
    setAds(ads.map(item => item.id === id ? { ...item, ...updatedAd } : item));
  };

  const deleteAd = (id) => {
    setAds(ads.filter(item => item.id !== id));
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="flex-grow mx-4 sm:mx-6 md:mx-8 lg:mx-12 px-4 py-8">
        <Routes>
          <Route path="/" element={<Home news={news} ads={ads} />} />
          <Route path="/:blockName" element={<BlockPage news={news} ads={ads} />} />
          <Route path="/admin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
          <Route 
            path="/catalog" 
            element={
              isAdmin ? (
                <CatalogPage 
                  addNews={addNews} 
                  news={news} 
                  deleteNews={deleteNews} 
                  editNews={editNews} 
                  ads={ads}
                  addAd={addAd}
                  editAd={editAd}
                  deleteAd={deleteAd}
                />
              ) : (
                <Navigate to="/admin" />
              )
            } 
          />
          <Route path="/news/:id" element={<FullNewsPage news={news} ads={ads} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
