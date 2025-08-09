import React from 'react';
import { Users, Award, MapPin, Heart, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Zanzibar",
      description: "We are deeply passionate about our island home and love sharing its beauty with visitors from around the world."
    },
    {
      icon: Users,
      title: "Local Expertise",
      description: "Our team consists of local guides who have lived in Zanzibar their entire lives, offering authentic insights."
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "We maintain the highest standards of service, ensuring every tour exceeds your expectations."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety is our priority. All our tours are conducted with proper safety measures and insurance."
    },
    {
      icon: Clock,
      title: "Punctuality",
      description: "We respect your time and ensure all tours start and end as scheduled, maximizing your experience."
    },
    {
      icon: MapPin,
      title: "Sustainable Tourism",
      description: "We promote responsible tourism that benefits local communities and preserves our natural environment."
    }
  ];

  const team = [
    {
      name: "Ahmed Mwalimu",
      role: "Founder & Lead Guide",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Born and raised in Stone Town, Ahmed has 15+ years of experience in tourism."
    },
    {
      name: "Fatma Salim",
      role: "Cultural Tours Specialist",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=300&h=300&fit=crop&crop=face",
      description: "Expert in Swahili culture and traditions, specializing in heritage tours."
    },
    {
      name: "Rashid Hassan",
      role: "Marine Tours Expert",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Professional divemaster with deep knowledge of Zanzibar's marine life."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Zanzibar Explore Tours
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 leading-relaxed">
            Your trusted local partner for authentic Zanzibar experiences since 2010
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Founded in 2010 by local entrepreneur Ahmed Mwalimu, Zanzibar Explore Tours 
                  began as a small family business with a simple mission: to share the authentic 
                  beauty and rich culture of Zanzibar with visitors from around the world.
                </p>
                <p>
                  What started as guided walks through Stone Town has grown into a comprehensive 
                  tour company offering 13 unique experiences across the island. Our success is 
                  built on genuine relationships with local communities, sustainable tourism 
                  practices, and an unwavering commitment to quality.
                </p>
                <p>
                  Today, we proudly serve hundreds of satisfied guests annually while supporting 
                  local artisans, farmers, and boat builders through our tours. Every experience 
                  we offer is designed to create lasting memories while contributing positively 
                  to our island community.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1502452302126-a987e1f3fea4"
                alt="Stone Town aerial view"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1621583628955-42fbc37bf424"
                alt="Local beach scene"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do and make us your ideal travel partner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <value.icon className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-slate-800">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600">
              The passionate locals who make your Zanzibar experience unforgettable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">13</div>
              <div className="text-teal-100">Tour Packages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-teal-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-teal-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5★</div>
              <div className="text-teal-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;