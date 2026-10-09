import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [missingConfig, setMissingConfig] = useState<boolean>(false);
  const [showConfigHelp, setShowConfigHelp] = useState<boolean>(false);

  // Retrieve Vite environment variables for EmailJS
  const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  const isConfigured = Boolean(
    emailjsServiceId && emailjsTemplateId && emailjsPublicKey
  );

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Your email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@example.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length < 2) {
      newErrors.subject = 'Subject must be at least 2 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    // Check if EmailJS credentials are configured in Vite env vars
    if (!isConfigured) {
      setSubmissionStatus('error');
      setMissingConfig(true);
      setStatusMessage(
        'EmailJS service credentials are not configured yet. Please configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your environment variables to enable direct inbox delivery.'
      );
      setShowConfigHelp(true);
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setStatusMessage('');
    setMissingConfig(false);

    try {
      // Build EmailJS template parameters with fixed recipient and visitor reply-to
      const templateParams = {
        to_email: PERSONAL_INFO.email,
        to_name: PERSONAL_INFO.name,
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        reply_to: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const response = await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        templateParams,
        emailjsPublicKey
      );

      // Verify confirmed success from EmailJS
      if (response.status === 200 || response.text === 'OK') {
        setSubmissionStatus('success');
        setStatusMessage(
          "Thank you! Your message has been sent successfully. I'll get back to you soon."
        );
        // Clear form fields on confirmed delivery
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setErrors({});
      } else {
        throw new Error(`EmailJS responded with status: ${response.status}`);
      }
    } catch (err: any) {
      console.error('EmailJS transmission failed:', err);
      setSubmissionStatus('error');
      setStatusMessage(
        `Sorry, your message could not be sent. Please try again or email ${PERSONAL_INFO.email} directly.`
      );
      // Notice: Do NOT clear the form when sending fails so user does not lose input
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#090b0e]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            <span className="text-blue-500 font-normal mr-1">#</span>
            Let's Connect
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Have an opportunity or a project in mind? Feel free to reach out.
          </p>
        </motion.div>

        {/* Contact Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Email Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#11151e] border border-white/[0.08] hover:border-blue-500/30 rounded-2xl p-7 shadow-xl flex flex-col justify-between group transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Email Address
              </h3>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors break-all block mb-4"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600/90 hover:bg-blue-600 active:scale-[0.98] transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Compose Mail</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="p-1.5 text-xs text-slate-400 hover:text-white rounded-md bg-white/[0.03] hover:bg-white/[0.08] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email address to clipboard"
              >
                {copiedType === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Phone Number Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#11151e] border border-white/[0.08] hover:border-blue-500/30 rounded-2xl p-7 shadow-xl flex flex-col justify-between group transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Phone Number
              </h3>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors block mb-4"
              >
                {PERSONAL_INFO.formattedPhone}
              </a>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600/90 hover:bg-blue-600 active:scale-[0.98] transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Direct Call</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="p-1.5 text-xs text-slate-400 hover:text-white rounded-md bg-white/[0.03] hover:bg-white/[0.08] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                title="Copy phone number to clipboard"
                aria-label="Copy phone number to clipboard"
              >
                {copiedType === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#11151e] border border-white/[0.08] rounded-2xl p-7 shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Location
              </h3>
              <p className="text-base sm:text-lg font-bold text-white mb-4">
                {PERSONAL_INFO.location}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-400">
              <span>Standard Time Zone: IST (UTC+5:30)</span>
            </div>
          </motion.div>
        </div>

        {/* Send a Direct Message Form Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-[#11151e] border border-white/[0.08] rounded-2xl p-8 sm:p-10 shadow-2xl relative"
        >
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
              Fill in your details to send an email inquiry directly to {PERSONAL_INFO.email}.
            </p>
          </div>

          {/* Success Message Banner */}
          {submissionStatus === 'success' && (
            <div
              role="alert"
              className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm flex items-start gap-3 shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">
                {statusMessage}
              </div>
            </div>
          )}

          {/* Error Message Banner */}
          {submissionStatus === 'error' && (
            <div
              role="alert"
              className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-sm flex flex-col gap-3 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed font-medium">
                  {statusMessage}
                </div>
              </div>

              {/* Show toggle for step-by-step EmailJS setup if missing config */}
              {missingConfig && (
                <div className="pt-2 border-t border-rose-500/20">
                  <button
                    type="button"
                    onClick={() => setShowConfigHelp(!showConfigHelp)}
                    className="text-xs font-semibold text-rose-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{showConfigHelp ? 'Hide EmailJS Setup Guide' : 'View Quick EmailJS Setup Guide'}</span>
                    {showConfigHelp ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Expandable EmailJS Setup Guide */}
          <AnimatePresence>
            {showConfigHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="p-4 rounded-xl bg-[#0c0f16] border border-blue-500/30 text-xs text-slate-300 space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                    <Info className="w-4 h-4" />
                    <span>How to set up your free EmailJS account</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed pl-1">
                    <li>
                      Create a free account at{' '}
                      <a
                        href="https://www.emailjs.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                      >
                        emailjs.com
                      </a>.
                    </li>
                    <li>
                      In <strong>Email Services</strong>, add a service (e.g. Gmail) and copy your <code className="text-blue-300 font-mono">Service ID</code>.
                    </li>
                    <li>
                      In <strong>Email Templates</strong>, create a template:
                      <ul className="list-disc list-inside pl-4 text-slate-400 mt-1 space-y-0.5">
                        <li>To Email: <code className="text-slate-200">vamshiramavarapu@gmail.com</code></li>
                        <li>Subject: <code className="text-slate-200">{"{{subject}}"}</code></li>
                        <li>Body: <code className="text-slate-200">{"From: {{from_name}} ({{from_email}})\n\n{{message}}"}</code></li>
                        <li>Reply-To: <code className="text-slate-200">{"{{reply_to}}"}</code></li>
                      </ul>
                      Copy your <code className="text-blue-300 font-mono">Template ID</code>.
                    </li>
                    <li>
                      In <strong>Account Settings</strong> &gt; <strong>API Keys</strong>, copy your <code className="text-blue-300 font-mono">Public Key</code>.
                    </li>
                    <li>
                      Add them to your <code className="text-blue-300 font-mono">.env</code> or environment variables:
                      <pre className="mt-1 p-2 rounded bg-black/40 text-[11px] font-mono text-slate-200 overflow-x-auto">
{`VITE_EMAILJS_SERVICE_ID="your_service_id"
VITE_EMAILJS_TEMPLATE_ID="your_template_id"
VITE_EMAILJS_PUBLIC_KEY="your_public_key"`}
                      </pre>
                    </li>
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                >
                  Your Name <span className="text-blue-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className={`w-full px-4 py-3 rounded-xl bg-[#0c0f15] border text-sm text-white placeholder-slate-500 outline-none transition-all ${
                    errors.name
                      ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                      : 'border-white/[0.08] focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  }`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-rose-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                >
                  Your Email <span className="text-blue-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. john@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-[#0c0f15] border text-sm text-white placeholder-slate-500 outline-none transition-all ${
                    errors.email
                      ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                      : 'border-white/[0.08] focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  }`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-rose-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Subject <span className="text-blue-400">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                disabled={isSubmitting}
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g. Data Management Opportunity / Collaboration"
                className={`w-full px-4 py-3 rounded-xl bg-[#0c0f15] border text-sm text-white placeholder-slate-500 outline-none transition-all ${
                  errors.subject
                    ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/[0.08] focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1.5 text-xs text-rose-400">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Message <span className="text-blue-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                disabled={isSubmitting}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                className={`w-full px-4 py-3 rounded-xl bg-[#0c0f15] border text-sm text-white placeholder-slate-500 outline-none transition-all resize-none ${
                  errors.message
                    ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/[0.08] focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-rose-400">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Fixed Recipient Assurance Badge */}
            <div className="text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>
                  Delivers to:{' '}
                  <strong className="text-slate-300 font-mono">
                    {PERSONAL_INFO.email}
                  </strong>
                </span>
              </div>
              <span className="text-slate-400 text-[10px]">
                Powered by EmailJS
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto min-w-[170px] px-8 py-3.5 text-sm font-semibold text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer ${
                isSubmitting
                  ? 'bg-blue-700/70 cursor-not-allowed opacity-90'
                  : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-blue-600/30'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
