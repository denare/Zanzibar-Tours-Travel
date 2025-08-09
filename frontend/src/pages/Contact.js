import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { contactAPI, handleAPIError } from '../services/api';

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    
    setLoading(true);
    
    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      };

      await contactAPI.createContact(contactData);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      const errorInfo = handleAPIError(error);
      toast({
        title: "Message Failed",
        description: errorInfo.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Stone Town, Zanzibar', 'Malindi Street, Building 15', 'Near Creek Road'],
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+255 678 049 280', '+255 678 049 280', 'Available 24/7'],
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@zanzibarexploretours.com', 'bookings@zanzibarexploretours.com', 'Response within 4 hours'],
      action: 'Send Email'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      details: ['+255 678 049 280', 'Quick responses', 'Share photos & questions'],
      action: 'WhatsApp Us'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Public Holidays', hours: '10:00 AM - 3:00 PM' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-teal-100">
            We're here to help plan your perfect Zanzibar adventure
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have questions about our tours? Need help planning your trip? We're here to assist you!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow text-center">
                <CardHeader>
                  <info.icon className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-slate-800">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className={`text-slate-600 ${idx === 0 ? 'font-semibold' : ''}`}>
                        {detail}
                      </p>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                    onClick={() => {
                      if (info.title === 'WhatsApp' || info.title === 'Call Us') {
                        window.open(`https://wa.me/255678049280`, '_blank');
                      } else if (info.title === 'Email Us') {
                        window.location.href = 'mailto:info@zanzibarexploretours.com';
                      } else if (info.title === 'Visit Us') {
                        window.open('https://maps.google.com/?q=Stone+Town+Zanzibar', '_blank');
                      }
                    }}
                  >
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Business Hours */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center">
                    <Send className="h-6 w-6 mr-2 text-teal-600" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-slate-600">
                    Fill out the form below and we'll get back to you as soon as possible
                  </p>
                </CardHeader>
                <CardContent>
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
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+255 xxx xxx xxx"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What can we help you with?"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your travel plans, questions, or special requests..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg"
                      disabled={loading}
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Business Hours & Map */}
            <div className="space-y-8">
              {/* Business Hours */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 flex items-center">
                    <Clock className="h-6 w-6 mr-2 text-teal-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                        <span className="font-medium text-slate-700">{schedule.day}</span>
                        <span className="text-slate-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                    <p className="text-sm text-teal-800">
                      <strong>Emergency Contact:</strong> Available 24/7 for urgent travel assistance
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-teal-600" />
                    Find Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15916.516658783!2d39.1761!3d-6.1659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cd4c5b5c5c5c5%3A0x5c5c5c5c5c5c5c5!2sStone%20Town%2C%20Zanzibar!5e0!3m2!1sen!2s!4v1609459200000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Zanzibar Explore Tours Location"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                      onClick={() => window.open('https://maps.google.com/?q=Stone+Town+Zanzibar', '_blank')}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Quick answers to common questions about our tours and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What's included in the tour price?</h3>
              <p className="text-slate-600 mb-4">
                All tours include transportation, professional guide, entrance fees, and refreshments. Lunch is included in full-day tours.
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-2">How do I book a tour?</h3>
              <p className="text-slate-600 mb-4">
                You can book online, call us, or WhatsApp us. We recommend booking at least 24 hours in advance.
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What should I bring?</h3>
              <p className="text-slate-600">
                Comfortable walking shoes, sun hat, sunscreen, camera, and swimwear for water activities.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Do you offer group discounts?</h3>
              <p className="text-slate-600 mb-4">
                Yes! Groups of 6+ people receive a 10% discount. Contact us for larger group rates.
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-2">What's your cancellation policy?</h3>
              <p className="text-slate-600 mb-4">
                Free cancellation up to 24 hours before the tour. Weather-related cancellations are fully refundable.
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Are tours suitable for children?</h3>
              <p className="text-slate-600">
                Most tours are family-friendly. We offer special rates for children under 12.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;