import React, { useState } from 'react';
import { X, Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { toursAPI, handleAPIError } from '../services/api';

const BookingModal = ({ isOpen, onClose, selectedTour }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTour || !selectedTour._id) {
      toast({
        title: "Error",
        description: "Please select a tour first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const bookingData = {
        tour_id: selectedTour._id,
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        booking_date: formData.date,
        guests: parseInt(formData.guests),
        special_requests: formData.message
      };

      const response = await toursAPI.createBooking(bookingData);
      
      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you within 24 hours to confirm your booking.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: '1',
        message: ''
      });
      
      onClose();
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

  if (!selectedTour) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Book Your Tour</DialogTitle>
          <DialogDescription>
            Complete your booking for: <span className="font-semibold text-teal-600">{selectedTour.title}</span>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </Label>
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
              <Label htmlFor="email" className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Label>
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
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>Phone</span>
              </Label>
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
              <Label htmlFor="date" className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Preferred Date</span>
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="guests">Number of Guests</Label>
            <Select value={formData.guests} onValueChange={(value) => setFormData({...formData, guests: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="message" className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>Special Requests (Optional)</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any special requests or dietary requirements..."
              rows={3}
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Booking Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;