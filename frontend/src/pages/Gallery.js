import React, { useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { galleryAPI } from '../services/api';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const galleryData = await galleryAPI.getGallery();
        setGalleryImages(galleryData);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setGalleryImages({});
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = [
    { key: 'all', label: 'All Photos' },
    { key: 'beaches', label: 'Beaches' },
    { key: 'culture', label: 'Culture' },
    { key: 'nature', label: 'Nature' },
    { key: 'wildlife', label: 'Wildlife' }
  ];

  const getAllImages = () => {
    return Object.entries(galleryImages).flatMap(([category, images]) =>
      images.map(image => ({ image, category }))
    );
  };

  const getFilteredImages = () => {
    if (selectedCategory === 'all') {
      return getAllImages();
    }
    return galleryImages[selectedCategory]?.map(image => ({ image, category: selectedCategory })) || [];
  };

  const filteredImages = getFilteredImages();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Camera className="h-16 w-16 mx-auto mb-6 text-teal-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl md:text-2xl text-teal-100">
            Explore the stunning beauty of Zanzibar through our lens
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                variant={selectedCategory === category.key ? "default" : "outline"}
                className={selectedCategory === category.key 
                  ? "bg-teal-600 hover:bg-teal-700" 
                  : "border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="animate-pulse aspect-square bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer aspect-square"
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.image}
                    alt={`${item.category} photo`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium capitalize">{item.category}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-teal-400 transition-colors"
              aria-label="Close image"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage.image}
              alt={`${selectedImage.category} photo`}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg">
              <p className="font-medium capitalize">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Own Memories?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Join one of our tours and capture your own amazing moments in Zanzibar
          </p>
          <Button 
            size="lg"
            className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-3 text-lg"
            onClick={() => window.location.href = '/tours'}
          >
            Book a Tour
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;