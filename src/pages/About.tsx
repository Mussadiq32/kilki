
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Check, Users, Building, Award } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-royal-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Royal Group</h1>
              <p className="text-xl text-royal-200 mb-8">
                A legacy of excellence in real estate since 2012
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-royal-800 mb-6">Our Story</h2>
                  <p className="text-gray-600 mb-4">
                    Founded in 2012, Royal Group of Real Estates has established itself as a premier real estate company in Kashmir. 
                    With over 15 years of experience, we have built a reputation for integrity, professionalism, and exceptional service.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our journey began with a simple mission: to help people find their perfect homes and make sound real estate investments. 
                    Today, we have expanded our services to include property management, real estate consulting, and development projects.
                  </p>
                  <p className="text-gray-600">
                    With a deep understanding of the local market and a commitment to excellence, 
                    we continue to set the standard for real estate services in the region.
                  </p>
                </div>
                <div className="bg-gray-200 h-[400px] rounded-lg overflow-hidden">
                  <div className="w-full h-full rounded-lg bg-gray-300 flex items-center justify-center">
                    <img src="https://iili.io/2mPx3rP.png" alt="Royal Group Company" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Our Core Values</h2>
              <p className="text-gray-600">
                These principles guide our business and define our commitment to our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Users,
                  title: "Client-Centered",
                  description: "We put our clients' needs first, ensuring personalized service and exceptional experiences."
                },
                {
                  icon: Check,
                  title: "Integrity",
                  description: "We operate with honesty and transparency in all our dealings, building trust with every interaction."
                },
                {
                  icon: Building,
                  title: "Excellence",
                  description: "We strive for excellence in everything we do, from customer service to property management."
                },
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                  <value.icon className="mx-auto mb-4 text-gold-500" size={40} />
                  <h3 className="text-xl font-semibold text-royal-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Our Leadership Team</h2>
              <p className="text-gray-600">
                Meet the experienced professionals who lead our company.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Basit Mashkoor wani",
                  position: "Chief Executive Officer",
                  description: "With over 20 years of experience in real estate, Basit wani leads our company with vision and expertise."
                },
                {                  
                  name: "",
                  position: "Chief Operating Officer",
                  description: " brings extensive operational expertise and strategic vision to our growing portfolio."
                },
                {
                  name: "",
                  position: "Head of Property Management",
                  description: " ensures excellence in property management and client satisfaction across our portfolio."
                }
              ].map((member, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-royal-800 mb-1">{member.name}</h3>
                  <p className="text-gold-500 mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-royal-800 mb-4">Our Achievements</h2>
              <p className="text-gray-600">
                A track record of success and recognition in the real estate industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { number: "500+", label: "Properties Sold" },
                { number: "300+", label: "Happy Clients" },
                { number: "15+", label: "Industry Awards" },
                { number: "15+", label: "Years of Experience" },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-3xl font-bold text-gold-500 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
