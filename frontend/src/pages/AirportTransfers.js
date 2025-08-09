import React, { useState, useEffect } from 'react';
import { Car, Users, Luggage, Clock, CheckCircle, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { transfersAPI, handleAPIError } from '../services/api';

const AirportTransfers = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    flightNumber: '',
    arrivalDate: '',
    arrivalTime: '',
    passengers: '1',
    vehicleType: '',
    destination: '',
    specialRequests: ''
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setVehiclesLoading(true);
        const vehiclesData = await transfersAPI.getVehicles();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setVehicles([]);
      } finally {
        setVehiclesLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      const bookingData = {
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        flight_number: formData.flightNumber,
        arrival_date: formData.arrivalDate,
        arrival_time: formData.arrivalTime,
        passengers: parseInt(formData.passengers),
        vehicle_type: formData.vehicleType,
        destination: formData.destination,
        special_requests: formData.specialRequests
      };

      await transfersAPI.createTransferBooking(bookingData);
      
      toast({
        title: "Transfer Booking Sent!",
        description: "We'll confirm your airport transfer within 2 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        flightNumber: '',
        arrivalDate: '',
        arrivalTime: '',
        passengers: '1',
        vehicleType: '',
        destination: '',
        specialRequests: ''
      });
    } catch (error) {
      const errorInfo = handleAPIError(error);
      toast({
        title: "Booking Failed",
        description: errorInfo.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Available round the clock for all flight schedules"
    },
    {
      icon: Users,
      title: "Professional Drivers",
      description: "Experienced, licensed, and English-speaking drivers"
    },
    {
      icon: CheckCircle,
      title: "Flight Monitoring",
      description: "We track your flight for delays and adjust pickup times"
    },
    {
      icon: MapPin,
      title: "Meet & Greet",
      description: "Driver will meet you at arrivals with a name sign"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Airport Transfer Services
          </h1>
          <p className="text-xl md:text-2xl text-teal-100">
            Comfortable, reliable transportation from Zanzibar Airport to your destination
          </p>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Stress-Free Airport Transfers
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Start your Zanzibar adventure the right way with our professional airport transfer 
                service. No need to worry about finding transportation or negotiating prices – 
                we'll be waiting for you when you arrive.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Our fleet includes comfortable sedans, spacious SUVs, and group-friendly minivans, 
                all air-conditioned and maintained to the highest standards. Every transfer includes 
                meet and greet service, flight monitoring, and professional drivers who know 
                Zanzibar inside out.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <feature.icon className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1634646350436-e1448c1d4f63"
                alt="Comfortable transfer vehicle"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Options */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Choose Your Vehicle
            </h2>
            <p className="text-lg text-slate-600">
              Select the perfect vehicle for your group size and luggage needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehiclesLoading ? (
              [...Array(3)].map((_, index) => (
                <Card key={index} className="border-0 shadow-md animate-pulse">
                  <CardHeader className="text-center">
                    <div className="h-12 w-12 bg-slate-200 rounded mx-auto mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="h-8 bg-slate-200 rounded mb-4"></div>
                    <div className="space-y-2 mb-6">
                      {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="h-4 bg-slate-200 rounded"></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              vehicles.map((vehicle) => (
                <Card key={vehicle._id || vehicle.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Car className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                    <CardTitle className="text-xl text-slate-800">{vehicle.type}</CardTitle>
                    <p className="text-slate-600">{vehicle.description}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-4">${vehicle.price}</div>
                    <ul className="space-y-2 mb-6">
                      {vehicle.features.map((feature, index) => (
                        <li key={index} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Book Your Transfer
            </h2>
            <p className="text-lg text-slate-600">
              Fill out the form below and we'll confirm your booking within 2 hours
            </p>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+255 xxx xxx xxx"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="flightNumber">Flight Number *</Label>
                    <Input
                      id="flightNumber"
                      name="flightNumber"
                      value={formData.flightNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., ET 815"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="arrivalDate">Arrival Date *</Label>
                    <Input
                      id="arrivalDate"
                      name="arrivalDate"
                      type="date"
                      value={formData.arrivalDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="arrivalTime">Arrival Time *</Label>
                    <Input
                      id="arrivalTime"
                      name="arrivalTime"
                      type="time"
                      value={formData.arrivalTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="passengers">Passengers *</Label>
                    <Select value={formData.passengers} onValueChange={(value) => setFormData({...formData, passengers: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="vehicleType">Vehicle Type *</Label>
                    <Select value={formData.vehicleType} onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle._id || vehicle.id} value={vehicle.type}>
                            {vehicle.type} - ${vehicle.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="Hotel name or area"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requirements, child seats, wheelchair access, etc."
                    rows={3}
                  />
                </div>
                
                <div className="flex space-x-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg"
                    disabled={loading}
                  >
                    {loading ? 'Booking...' : 'Book Transfer'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white py-3 px-8"
                    onClick={() => window.open('https://wa.me/255678049280', '_blank')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AirportTransfers;