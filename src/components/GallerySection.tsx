import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/clinicData';
import { GalleryItem } from '../types';
import { Maximize2, X, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Campus Facilities' },
    { id: 'facilities', label: 'VIP Lounges & Suites' },
    { id: 'operating', label: 'Robotic Surgical Suites' },
    { id: 'diagnostics', label: 'Diagnostic Labs & MRI' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 lg:py-28 relative bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <span>Virtual Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Explore Our World-Class Campus
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Designed for acoustic peace, absolute sterility, and luxurious patient comfort.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-80 rounded-[28px] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 bg-slate-200 dark:bg-slate-800"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {item.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-4 sm:p-6 text-white space-y-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-20 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-[60vh] rounded-2xl overflow-hidden bg-black">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-2 space-y-1">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
                LuminaCare {selectedImage.category}
              </span>
              <h3 className="text-2xl font-bold font-display">{selectedImage.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
