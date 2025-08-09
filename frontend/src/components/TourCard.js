import React from 'react';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

const TourCard = ({ tour, onBookNow }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'water':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cultural':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'nature':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'safari':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price}`;
    }
    return price || '$0';
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge className={getCategoryColor(tour.category)}>
              {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
          {tour.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {tour.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold text-teal-600">{formatPrice(tour.price)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onBookNow(tour)}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourCard;