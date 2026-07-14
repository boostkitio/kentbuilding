import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Clock, Mail, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

type QuoteFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  'bot-field': string;
};

const ContactCTA: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitStatus(null);

    if (data['bot-field']) {
      setSubmitStatus('success');
      reset();
      return;
    }

    setIsSubmitting(true);

    try {
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
          ['bot-field', data['bot-field']],
        ]).toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="section-title">Ready to start your <span className="text-primary-600">project?</span></h2>
            <p className="section-subtitle">
              Contact us today for a free, no-obligation consultation and quote for your construction project.
            </p>
            
            <div className="mt-10 space-y-8">
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mr-5 flex-shrink-0">
                  <Phone className="text-primary-600" size={22} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h4>
                  <p className="text-gray-600 mb-2">For immediate assistance or to discuss your project</p>
                  <a 
                    href="tel:07766141811" 
                    className="text-primary-600 font-medium hover:text-primary-700 text-lg"
                  >
                    07766 141811
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mr-5 flex-shrink-0">
                  <Mail className="text-primary-600" size={22} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h4>
                  <p className="text-gray-600 mb-2">For detailed inquiries or to request a quote</p>
                  <a 
                    href="mailto:spencer@kentbuildingandconstruction.co.uk" 
                    className="text-primary-600 font-medium hover:text-primary-700 text-lg"
                  >
                    spencer@kentbuildingandconstruction.co.uk
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mr-5 flex-shrink-0">
                  <Clock className="text-primary-600" size={22} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Business Hours</h4>
                  <p className="text-gray-600 mb-2">We're available to assist you during these hours</p>
                  <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Saturday: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Link to="/contact" className="btn btn-primary px-7 py-3">
                Get In Touch
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-lg shadow-custom-lg p-10 border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-8">Request a Free Quote</h3>

            {submitStatus === 'success' && (
              <div className="mb-6 flex items-start rounded-md bg-success-50 p-4 text-success-700" role="status">
                <CheckCircle className="mr-3 mt-0.5 flex-shrink-0" size={20} />
                <p>Thank you. Your enquiry has been received and a member of the team will be in touch shortly.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 flex items-start rounded-md bg-error-50 p-4 text-error-700" role="alert">
                <AlertCircle className="mr-3 mt-0.5 flex-shrink-0" size={20} />
                <p>There was a problem sending your enquiry. Please try again or contact me by phone or email.</p>
              </div>
            )}

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Do not fill this in: <input {...register('bot-field')} tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className={`w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.firstName ? 'border-error-500' : 'border-gray-300'}`}
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-error-600">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className={`w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.lastName ? 'border-error-500' : 'border-gray-300'}`}
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-error-600">{errors.lastName.message}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.email ? 'border-error-500' : 'border-gray-300'}`}
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                  })}
                />
                {errors.email && <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={`w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.phone ? 'border-error-500' : 'border-gray-300'}`}
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && <p className="mt-1 text-sm text-error-600">{errors.phone.message}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="projectType" className="block text-gray-700 font-medium mb-2">
                  Project Type*
                </label>
                <select
                  id="projectType"
                  className={`w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.projectType ? 'border-error-500' : 'border-gray-300'}`}
                  {...register('projectType', { required: 'Select a project type' })}
                >
                  <option value="">Select Project Type</option>
                  <option value="new-build">New Build Construction</option>
                  <option value="renovation">Home Renovation</option>
                  <option value="restoration">Listed Building Restoration</option>
                  <option value="commercial">Commercial Fit-out</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="specialized">Specialized Trade Services</option>
                  <option value="other">Other</option>
                </select>
                {errors.projectType && <p className="mt-1 text-sm text-error-600">{errors.projectType.message}</p>}
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Please provide details about your project..."
                  {...register('message')}
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Send size={18} />
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </span>
              </button>
              
              <p className="text-gray-500 text-sm mt-5">
                By submitting this form, you agree to our privacy policy. We'll respond to your enquiry within 48 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
