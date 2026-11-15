import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const ContactBanner: React.FC = () => {
  return (
    <section className="bg-primary-600 text-white pt-48 pb-28 relative">
              <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/boostkit/Kent%20Building/New%20Builds/New-Build-7.jpg?updatedAt=1751969642061')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/60"></div>
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-white">
          Contact <span className="text-primary-300">Us</span>
        </h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto break-words">
              Get in touch with our team to discuss your construction project or request a free quote. Call 07766 141811 or email spencer@kentbuildingandconstruction.co.uk
            </p>
      </div>
    </section>
  );
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Prepare form data for Netlify
      const formData = new FormData();
      formData.append('form-name', 'contact');
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('projectType', data.projectType);
      formData.append('message', data.message);

      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams([
          ['form-name', 'contact'],
          ['firstName', data.firstName],
          ['lastName', data.lastName],
          ['email', data.email],
          ['phone', data.phone],
          ['projectType', data.projectType],
          ['message', data.message],
        ]).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Update document title
    document.title = 'Contact Us | Kent Building & Construction';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Kent Building & Construction for all your building needs. Request a free quote for period property restoration, home renovations, extensions, and more. Serving Kent and Sussex. FMB member since 2012. Call 07766 141811.');
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Reset status after 5 seconds
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <>
      <ContactBanner />

      <nav className="bg-gray-100 py-3" aria-label="Breadcrumb">
        <div className="container-custom">
          <ol className="flex flex-wrap items-center text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
            <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" className="text-gray-500 hover:text-primary-600" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-700 font-medium" itemProp="name">Contact</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to answer any questions you may have about our construction services. Complete the form and a member of our team will be in touch with you shortly.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                    <a
                      href="tel:07766141811"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      07766 141811
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <a
                      href="mailto:spencer@kentbuildingandconstruction.co.uk"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      spencer@kentbuildingandconstruction.co.uk
                    </a>
                  </div>
                </div>



                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Service Areas</h4>
                <p className="text-gray-600 mb-4">
                  We provide construction services throughout the South East, centered around Wadhurst with a 30-mile service radius including the following towns and surrounding areas:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    'Wadhurst',
                    'Tunbridge Wells',
                    'Tonbridge',
                    'Sevenoaks',
                    'Goudhurst',
                    'Crowborough',
                    'Paddock Wood',
                    'Uckfield',
                    'Tenterden',
                    'Cranbrook',
                    'Hawkhurst',
                    'Heathfield',
                    'East Grinstead',
                    'Haywards Heath',
                    'Westerham',
                  ].map((area) => (
                    <div key={area} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-600 mr-2"></div>
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-white rounded-lg shadow-custom-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6">Request a Free Quote</h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-success-50 text-success-700 rounded-md flex items-start">
                    <CheckCircle className="mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <p>
                      Thank you for your message! We've received your inquiry and a member of our team will be in touch with you shortly.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-md flex items-start">
                    <AlertCircle className="mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <p>
                      There was an error submitting your form. Please try again or contact us directly via phone or email.
                    </p>
                  </div>
                )}

                <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit(onSubmit)}>
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          errors.firstName ? 'border-error-500' : 'border-gray-300'
                        }`}
                        {...register('firstName', { required: 'First name is required' })}
                      />
                      {errors.firstName && (
                        <p className="text-error-600 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          errors.lastName ? 'border-error-500' : 'border-gray-300'
                        }`}
                        {...register('lastName', { required: 'Last name is required' })}
                      />
                      {errors.lastName && (
                        <p className="text-error-600 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.email ? 'border-error-500' : 'border-gray-300'
                      }`}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="text-error-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.phone ? 'border-error-500' : 'border-gray-300'
                      }`}
                      {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && (
                      <p className="text-error-600 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="projectType" className="block text-gray-700 font-medium mb-1">
                      Project Type*
                    </label>
                    <select
                      id="projectType"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.projectType ? 'border-error-500' : 'border-gray-300'
                      }`}
                      {...register('projectType', { required: 'Please select a project type' })}
                    >
                      <option value="">Select Project Type</option>
                      <option value="period-listed">Period and Listed Building Restoration</option>
                      <option value="renovation">Home Renovation & Refurbishment</option>
                      <option value="extensions">Extensions</option>
                      <option value="commercial">Office and Shop Refurbishment</option>
                      <option value="landscaping">Landscaping and Ground Works</option>
                      <option value="oast-house">Oast House Restoration</option>
                      <option value="oak-framed">Oak Framed Buildings</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.projectType && (
                      <p className="text-error-600 text-sm mt-1">{errors.projectType.message}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.message ? 'border-error-500' : 'border-gray-300'
                      }`}
                      placeholder="Please provide details about your project..."
                      {...register('message', { required: 'Please provide some details' })}
                    ></textarea>
                    {errors.message && (
                      <p className="text-error-600 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-primary flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Submit Request
                      </>
                    )}
                  </button>

                  <p className="text-gray-500 text-sm mt-4">
                    By submitting this form, you agree to our privacy policy. We'll respond to your enquiry within 48 hours.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">Our <span className="text-primary-600">Location</span></h2>
            <p className="section-subtitle">
              We work directly from our clients' sites across the South East.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-custom-lg overflow-hidden">
            <div className="h-96 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1990.1234567890123!2d0.12345678901234567!3d51.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df1234567890123%3A0x1234567890123456!2sTN5%206HL!5e0!3m2!1sen!2suk!4v1751879648801!5m2!1sen!2suk" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Kent Building & Construction Location"
              ></iframe>
            </div>

            <div className="p-6 bg-white">
              <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Kent Building & Construction</h3>

                </div>

                <div className="flex space-x-4">
                  <a
                    href="tel:07766141811"
                    className="btn btn-secondary flex items-center"
                  >
                    <Phone size={18} className="mr-2" />
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;