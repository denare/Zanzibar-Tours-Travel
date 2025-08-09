import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, Award, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import TourCard from '../components/TourCard';
import BookingModal from '../components/BookingModal';
import { toursAPI } from '../services/api';

const Home = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
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
        // Fallback to empty array if API fails
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

  const featuredTours = tours.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1634646350433-fe03ad698448?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxaYW56aWJhciUyMGJlYWNofGVufDB8fHx8MTc1NDEyOTI5NXww&ixlib=rb-4.1.0&q=85')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-teal-900/70" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Zanzibar Explore Tours
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-slate-200">
            Karibu Zanzibar – Let's explore together
          </p>
          <p className="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
            Discover the magic of Zanzibar with our personalized and authentic Swahili tours
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              onClick={() => handleBookNow(tours[0] || {})}
            >
              Book a Tour
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('tours').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Tours
            </Button>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-slate-300">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">13</div>
            <div className="text-sm text-slate-300">Tour Packages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">5★</div>
            <div className="text-sm text-slate-300">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            Welcome to Paradise
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Discover the magic of Zanzibar with our personalized and authentic Swahili tours. 
            From pristine beaches and vibrant coral reefs to aromatic spice farms and ancient Stone Town, 
            we offer unforgettable experiences that showcase the true essence of this tropical paradise. 
            Let our local guides take you on a journey through centuries of culture, history, and natural beauty.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Local Expertise</h3>
                <p className="text-slate-600">Expert local guides with deep knowledge of Zanzibar's culture and history</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Quality Service</h3>
                <p className="text-slate-600">Personalized tours with attention to detail and customer satisfaction</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Authentic Experiences</h3>
                <p className="text-slate-600">Genuine local experiences that connect you with Zanzibar's soul</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section id="tours" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Featured Tour Packages
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of tours designed to showcase the best of Zanzibar
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-slate-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2 w-3/4"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <TourCard 
                  key={tour._id || tour.id} 
                  tour={tour} 
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-3 text-lg transition-all duration-300"
              onClick={() => window.location.href = '/tours'}
            >
              View All Tours
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl mb-8 text-teal-100">
            Contact us today to start planning your perfect Zanzibar experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 text-lg transition-all duration-300"
              onClick={() => window.open('https://wa.me/255678049280', '_blank')}
            >
              <Phone className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
            <Button 
              size="lg"
              className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-3 text-lg transition-all duration-300"
              onClick={() => window.location.href = '/contact'}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Get in Touch
            </Button>
          </div>
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

export default Home;