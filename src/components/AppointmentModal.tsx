import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Stethoscope,
  X,
  CheckCircle2,
  AlertCircle,
  Printer,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DOCTORS, SERVICES } from '../data/clinicData';
import { AppointmentFormData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDepartment?: string;
  preselectedDoctorId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDepartment = '',
  preselectedDoctorId = '',
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    department: preselectedDepartment || 'cardiology',
    doctorId: preselectedDoctorId || '',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '10:00 AM',
    symptomsOrMessage: '',
    urgencyLevel: 'routine',
    isFirstVisit: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (preselectedDepartment) {
      setFormData((prev) => ({ ...prev, department: preselectedDepartment }));
    }
    if (preselectedDoctorId) {
      setFormData((prev) => ({ ...prev, doctorId: preselectedDoctorId }));
    }
  }, [preselectedDepartment, preselectedDoctorId]);

  if (!isOpen) return null;

  const availableDoctors = DOCTORS.filter(
    (d) => !formData.department || d.departmentId === formData.department
  );

  const selectedDocObj = DOCTORS.find((d) => d.id === formData.doctorId);
  const timeSlots = selectedDocObj
    ? selectedDocObj.timeSlots
    : ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(code);
      setIsSubmitting(false);
      setIsConfirmed(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0EA5E9', '#14B8A6', '#6366F1', '#F59E0B'],
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-modal p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div>
            {/* Modal Title */}
            <div className="mb-6 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-sky-500 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Concierge Healthcare Booking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                Reserve Your Appointment
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Select your preferred department, doctor, and time. No upfront charge required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Victoria Vance"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="victoria@example.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Department & Doctor Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Department / Specialty *
                  </label>
                  <div className="relative">
                    <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          department: e.target.value,
                          doctorId: '',
                        })
                      }
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Doctor (Optional)
                  </label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="">Any Available Senior Specialist</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - {doc.specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Available Time Slot *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setFormData({ ...formData, preferredTime: time })}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          formData.preferredTime === time
                            ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Brief Medical Concern or Special Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.symptomsOrMessage}
                  onChange={(e) =>
                    setFormData({ ...formData, symptomsOrMessage: e.target.value })
                  }
                  placeholder="Describe any symptoms, medical history, or specific requests for your physician..."
                  className="w-full p-3 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              {/* Options */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFirstVisit}
                    onChange={(e) => setFormData({ ...formData, isFirstVisit: e.target.checked })}
                    className="rounded text-sky-500 focus:ring-sky-500"
                  />
                  <span>This is my first visit to LuminaCare</span>
                </label>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-500">Urgency:</span>
                  <select
                    value={formData.urgencyLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        urgencyLevel: e.target.value as any,
                      })
                    }
                    className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    <option value="routine">Routine Consultation</option>
                    <option value="priority">Priority Assessment</option>
                    <option value="urgent">Urgent Same-Day Care</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition-all"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Book Appointment</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Receipt View */
          <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Appointment Confirmed!
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
                We Look Forward To Welcome You
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                A confirmation email & SMS has been dispatched to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left max-w-lg mx-auto space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="text-xs font-semibold text-slate-500">Confirmation Code</span>
                <span className="text-sm font-extrabold font-mono text-sky-500 bg-sky-50 dark:bg-sky-950 px-3 py-1 rounded-lg">
                  {confirmationCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Patient:</span>
                  <div className="font-bold text-slate-800 dark:text-slate-100">{formData.fullName}</div>
                </div>
                <div>
                  <span className="text-slate-400">Department:</span>
                  <div className="font-bold text-slate-800 dark:text-slate-100 capitalize">{formData.department}</div>
                </div>
                <div>
                  <span className="text-slate-400">Scheduled Date:</span>
                  <div className="font-bold text-slate-800 dark:text-slate-100">{formData.preferredDate}</div>
                </div>
                <div>
                  <span className="text-slate-400">Time Slot:</span>
                  <div className="font-bold text-slate-800 dark:text-slate-100">{formData.preferredTime}</div>
                </div>
              </div>

              {selectedDocObj && (
                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-3">
                  <img
                    src={selectedDocObj.image}
                    alt={selectedDocObj.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <span className="text-slate-400">Attending Specialist:</span>
                    <div className="font-bold text-slate-800 dark:text-slate-100">{selectedDocObj.name}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-sky-500 text-white text-xs font-semibold shadow-md hover:bg-sky-600"
              >
                Done & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
