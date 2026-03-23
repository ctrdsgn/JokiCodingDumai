'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { createOrder } from '../actions';

const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'landing-page', label: 'Web Landing Page (From Rp 1.5jt)' },
  { value: 'ecommerce', label: 'E-Commerce (From Rp 5jt)' },
  { value: 'custom-web', label: 'Custom Web App (From Rp 8jt)' },
];

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  service: string;
  description: string;
  budget: string;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  email?: string;
  service?: string;
  description?: string;
}

export default function OrderPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    email: '',
    service: '',
    description: '',
    budget: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // WhatsApp validation (Indonesian format)
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else {
      const waRegex = /^(^62|62|^08|\+62|08)(\d{8,12})$/;
      if (!waRegex.test(formData.whatsapp.replace(/\s/g, ''))) {
        newErrors.whatsapp = 'Enter a valid Indonesian WhatsApp number';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Enter a valid email address';
      }
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Please provide more details (at least 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    // Save to database
    const result = await createOrder({
      clientName: formData.name,
      whatsapp: formData.whatsapp,
      email: formData.email,
      service: formData.service,
      description: formData.description,
      budget: formData.budget || undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      alert('Failed to submit order. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-deep-blue to-purple-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Order Submitted!</h2>
            <p className="text-gray-400 mb-6">
              Thank you, {formData.name}! We&apos;ve received your order request. 
              We&apos;ll contact you via WhatsApp ({formData.whatsapp}) within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  whatsapp: '',
                  email: '',
                  service: '',
                  description: '',
                  budget: '',
                });
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
            >
              Submit Another Order
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-deep-blue to-purple-950 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Start Your{' '}
              <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                Project
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Fill out the form below and we&apos;ll get back to you within 24 hours 
              with a customized quote for your project.
            </p>
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn direction="up" delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8">
              {/* Name & WhatsApp Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    data-error={!!errors.name}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800 border ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    } text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
                    WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    data-error={!!errors.whatsapp}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800 border ${
                      errors.whatsapp ? 'border-red-500' : 'border-gray-700'
                    } text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors`}
                    placeholder="0812 3456 7890"
                  />
                  {errors.whatsapp && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.whatsapp}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  data-error={!!errors.email}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Service Selection */}
              <div className="mb-6">
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                  Service Category <span className="text-red-400">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  data-error={!!errors.service}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800 border ${
                    errors.service ? 'border-red-500' : 'border-gray-700'
                  } text-white focus:outline-none focus:border-teal-500 transition-colors`}
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  data-error={!!errors.description}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800 border ${
                    errors.description ? 'border-red-500' : 'border-gray-700'
                  } text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors resize-none`}
                  placeholder="Tell us about your project. What features do you need? What is the goal of this website? Any specific requirements?"
                />
                <div className="flex justify-between mt-2">
                  {errors.description ? (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-sm text-gray-500">
                    {formData.description.length} characters
                  </span>
                </div>
              </div>

              {/* Budget (Optional) */}
              <div className="mb-8">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                  Estimated Budget <span className="text-gray-500">(Optional)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                >
                  <option value="">Select budget range</option>
                  <option value="1-3jt">Rp 1.000.000 - Rp 3.000.000</option>
                  <option value="3-5jt">Rp 3.000.000 - Rp 5.000.000</option>
                  <option value="5-10jt">Rp 5.000.000 - Rp 10.000.000</option>
                  <option value="10jt+">Rp 10.000.000+</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Order Request
                  </>
                )}
              </button>
            </div>
          </form>
        </FadeIn>

        {/* Info Cards */}
        <FadeIn direction="up" delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              {
                title: 'Quick Response',
                description: 'We reply within 24 hours',
                icon: '⚡',
              },
              {
                title: 'Free Consultation',
                description: 'Discuss your project needs',
                icon: '💬',
              },
              {
                title: 'Transparent Pricing',
                description: 'No hidden fees',
                icon: '💰',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center"
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
