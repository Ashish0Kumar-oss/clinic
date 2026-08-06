import React, { useState, useEffect, useRef } from 'react';
import { BRANCHES } from '../data/clinicData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  PhoneCall,
  Navigation,
  Building2,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Medical Inquiry',
    message: '',
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render a custom luxury styled map canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw dark/light canvas map background
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines representing city streets
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw river curves
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(width * 0.1, 0);
    ctx.bezierCurveTo(width * 0.3, height * 0.5, width * 0.2, height * 0.8, width * 0.4, height);
    ctx.stroke();

    // Draw Branch Locations Pins
    BRANCHES.forEach((b) => {
      const isSelected = b.id === selectedBranch.id;
      // Map pseudo lat/lng to canvas coords
      const x = ((b.mapLng + 74.02) / 0.06) * width;
      const y = ((40.78 - b.mapLat) / 0.08) * height;

      // Glow pulse for selected branch
      if (isSelected) {
        ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(20, 184, 166, 0.4)';
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pin circle
      ctx.fillStyle = isSelected ? '#0EA5E9' : '#64748B';
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Label text
      ctx.fillStyle = isSelected ? '#FFFFFF' : '#94A3B8';
      ctx.font = isSelected ? 'bold 11px sans-serif' : '10px sans-serif';
      ctx.fillText(b.name.split(' ')[1] || b.name, x + 12, y + 4);
    });
  }, [selectedBranch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Contact LuminaCare Concierge
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Our medical reception desk and patient liaisons are available to assist you with inquiries, international travel logistics, and second opinions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Branch Locator & Canvas Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Branch Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    selectedBranch.id === branch.id
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{branch.name.split(' ')[1]} Branch</span>
                </button>
              ))}
            </div>

            {/* Interactive Custom Canvas Map Container */}
            <div className="relative rounded-[32px] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl bg-slate-950 p-2">
              <canvas
                ref={canvasRef}
                width={500}
                height={260}
                className="w-full h-64 object-cover rounded-[24px]"
              />
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-slate-900/90 text-sky-400 text-[10px] font-bold border border-sky-500/30 flex items-center space-x-1.5 backdrop-blur-md">
                <Navigation className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Interactive Location Map</span>
              </div>
            </div>

            {/* Selected Branch Details Card */}
            <div className="p-6 sm:p-8 glass-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  {selectedBranch.name}
                </h3>
                {selectedBranch.isFlagship && (
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-full border border-sky-200/50">
                    Flagship Center
                  </span>
                )}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>{selectedBranch.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>{selectedBranch.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{selectedBranch.email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{selectedBranch.hours}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-red-500 font-bold">
                  <PhoneCall className="w-4 h-4 animate-pulse" />
                  <span>24/7 Hotline: {selectedBranch.emergencyPhone}</span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-sky-500 hover:underline flex items-center"
                >
                  Get Directions <Navigation className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 p-8 sm:p-10 glass-card space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Send a Message to Our Medical Liaisons
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                We respond to all concierge inquiries within 2 hours during business hours.
              </p>
            </div>

            {formSent ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 animate-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold">Message Received!</h4>
                <p className="text-xs">
                  Thank you, {formData.name}. Our patient liaison officer will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 012-3456"
                      className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject / Department Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="General Medical Inquiry">General Medical Inquiry</option>
                    <option value="Executive Physical Package">Executive Physical Package</option>
                    <option value="International Patient Concierge">International Patient Concierge</option>
                    <option value="Second Opinion Request">Second Opinion Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our medical team assist you?"
                    className="w-full p-3.5 rounded-2xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center space-x-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
