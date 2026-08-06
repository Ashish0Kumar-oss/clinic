import React, { useState } from 'react';
import {
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Send,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs relative pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white font-display tracking-tight">
                Lumina<span className="text-sky-400">Care</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              LuminaCare is a Joint Commission International (JCI) accredited medical institution offering specialized clinical care, robotic micro-surgery, and longevity medicine.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">
                Subscribe to Longevity & Medical Science Quarterly
              </span>
              {subscribed ? (
                <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center space-x-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox for updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full px-3.5 py-2.5 rounded-l-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-r-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display tracking-wider uppercase">
              Medical Departments
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Cardiology & Vascular</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Neurology & Brain Sciences</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Orthopedics & Spine</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Pediatric Excellence</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Dermatology & Lasers</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Women's Health & IVF</a></li>
            </ul>
          </div>

          {/* Col 3: Patients & Visitors */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display tracking-wider uppercase">
              Patient Services
            </h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenBooking} className="hover:text-sky-400 transition-colors">Book Online Appointment</button></li>
              <li><a href="#doctors" className="hover:text-sky-400 transition-colors">Find a Physician</a></li>
              <li><a href="#treatments" className="hover:text-sky-400 transition-colors">Advanced Treatments</a></li>
              <li><a href="#testimonials" className="hover:text-sky-400 transition-colors">Patient Testimonials</a></li>
              <li><a href="#gallery" className="hover:text-sky-400 transition-colors">Campus Virtual Tour</a></li>
              <li><a href="#contact" className="hover:text-sky-400 transition-colors">Insurance Superbills</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display tracking-wider uppercase">
              24/7 Hotline
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Emergency & Dispatch</div>
              <a href="tel:+18005864621" className="text-sm font-extrabold text-sky-400 block hover:underline">
                +1 (800) 586-4621
              </a>
              <div className="text-[10px] text-teal-400 flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> JCI Certified Staff
              </div>
            </div>
            <p className="text-slate-500 text-[11px]">
              Flagship Campus: 742 Park Avenue, Suite 1200, New York, NY 10021
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} LuminaCare Medical Group LLC. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">HIPAA Compliance</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-900 hover:bg-sky-500 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center justify-center"
            title="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
