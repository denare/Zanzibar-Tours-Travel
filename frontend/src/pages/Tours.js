import React, { useState, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import TourCard from '../components/TourCard';
import BookingModal from '../components/BookingModal';
import { toursAPI } from '../services/api';

const Tours = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const toursData = await toursAPI.getAllTours();
        setTours(toursData);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleBookNow = (tour) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  // Filter and sort tours
  const filteredTours = tours
    .filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || tour.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const categories = [...new Set(tours.map(tour => tour.category))];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            All Tour Packages
          </h1>
          <p className="text-xl md:text-2xl text-teal-100">
            Discover all 13 amazing experiences we offer in Zanzibar
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search tours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price">Sort by Price</SelectItem>
                  <SelectItem value="category">Sort by Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-slate-600">
              Showing {filteredTours.length} of {tours.length} tours
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-slate-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2 w-3/4"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600 mb-4">No tours found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <TourCard 
                  key={tour._id || tour.id} 
                  tour={tour} 
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Decide? Let Us Help!
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Contact our experts for personalized recommendations based on your interests
          </p>
          <Button 
            size="lg"
            className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-3 text-lg"
            onClick={() => window.location.href = '/contact'}
          >
            Get Recommendations
          </Button>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedTour={selectedTour}
      />
    </div>
  );
};

export default Tours;