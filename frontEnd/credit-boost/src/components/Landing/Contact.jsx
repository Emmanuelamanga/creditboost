import { useState } from 'react';
import { MessageCircle, Mail, MapPin, ArrowRight, Send } from 'lucide-react';
import Container from '../Common/Container';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '', type: 'general' });
    }, 1500);
  };

  return (
    <div id="contact" className="relative py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-sky-50 dark:from-sky-900 dark:to-sky-800" />
        <div className="h-full w-full bg-[radial-gradient(#094067_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <Container>
        <div className="relative">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions? We're here to help improve your business credit score
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Cards */}
            <div className="space-y-12">
              {[
                // {
                //   icon: <MessageCircle className="w-6 h-6" />,
                //   title: "Chat with Us",
                //   description: "Get instant support through our chat system",
                //   action: "Start Chat",
                //   color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                // },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email Support",
                  description: "support@creditboost.com",
                  action: "Send Email",
                  color: "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400"
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Visit Us",
                  description: "123 Business Avenue, Tech City",
                  action: "Get Directions",
                  color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color} mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  <button className="group flex items-center text-sky-500 hover:text-sky-600 font-medium">
                    {item.action}
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                           bg-sky-500 hover:bg-sky-600 text-white font-medium
                           transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}