// src/pages/FullNewsPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Advertisements from '../components/Advertisements';
import ReactPlayer from 'react-player/lazy';
import './FullNewsPage.css'; // Ensure this import for CSS is correct

const FullNewsPage = ({ news, ads }) => {
  const { id } = useParams();
  const newsItem = news.find(item => item.id === parseInt(id));
  const { darkMode } = useTheme();
  const [playing, setPlaying] = useState(false);

  if (!newsItem) return <div className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} text-center text-xl mt-8`}>News not found</div>;

  return (
    <div className={`flex flex-col md:flex-row md:space-x-8 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      {/* News content column (2/3 width) */}
      <div className="w-full md:w-2/3 max-w-4xl mx-auto px-4 py-8">
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{newsItem.title}</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 text-sm`}>
          {new Date(newsItem.timestamp).toLocaleString()}
        </p>
        {newsItem.image && (
          <img 
            src={newsItem.image} 
            alt={newsItem.title} 
            className="w-full max-h-96 object-cover mb-6 rounded-lg shadow-md" 
          />
        )}
        {newsItem.video && (
          <div className={`video-wrapper mb-6 ${playing ? 'playing' : ''}`}>
            <ReactPlayer
              url={newsItem.video}
              playing={playing}
              controls
              width="100%"
              height="100%"
              className="rounded-lg shadow-md"
              light={newsItem.image || true} // Use image as a placeholder while video is loading
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          </div>
        )}
        <div className={`text-lg leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {newsItem.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        {newsItem.tags && newsItem.tags.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Tags:</h2>
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map(tag => (
                <span 
                  key={tag} 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advertisements column (1/3 width) */}
      <div className="w-full md:w-1/3 mt-8 md:mt-0">
        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Advertisements</h2>
        <Advertisements ads={ads} />
      </div>
    </div>
  );
};

export default FullNewsPage;
