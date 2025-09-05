"use client";
import React, { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    insurances: [] as string[],
    problem: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const insuranceOptions = [
    "Health",
    "Term/Life",
    "Motor",
    "Travel",
    "Home",
    "Gadget",
    "None",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "insurances") {
      setForm((prev) => {
        let newInsurances = prev.insurances.includes(value)
          ? prev.insurances.filter((i) => i !== value)
          : [...prev.insurances, value];
        // If "None" is checked, uncheck others
        if (value === "None" && !prev.insurances.includes("None")) {
          newInsurances = ["None"];
        } else if (value !== "None") {
          newInsurances = newInsurances.filter((i) => i !== "None");
        }
        return { ...prev, insurances: newInsurances };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setError(null);

    if (!form.name || !form.email || !form.phone) {
      setError("Please fill all required fields.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        insurances: [],
        problem: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('waitlist-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-blue-100 border border-white/20 mb-4 animate-pulse">
              🚀 Launching Soon
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight animate-fade-in">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              fin-o-ji
            </span>
          </h1>
          
        <p className="text-lg sm:text-xl text-blue-100 font-semibold mb-3 animate-slide-up">
          Your personal AI insurance advocate.
        </p>
        
        <p className="text-blue-200 text-base max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up-delay">
          We use AI to X-ray your complex policies into simple, understandable advice and act as your dedicated co-pilot during stressful claims.
        </p>          <button
            onClick={scrollToForm}
            className="group inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold text-base rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 animate-bounce-gentle"
          >
            Join Waitlist
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </button>
        </div>
        
        {/* Animated decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-float-delay"></div>
      </section>

      {/* About Us Section */}
      <section className="relative py-20 px-4 bg-white">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              ✨ Our Story
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Who we are
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl font-medium text-gray-900">
                fin-o-ji isn't another insurance marketplace; it's your personal AI advocate that stands only with you — the policyholder.
              </p>
              
              <p>
                In India, insurance is supposed to be a safety net — but instead, it often becomes a source of stress. Policies are written in complex language, exclusions are hidden in fine print, and when the time comes to make a claim, families are left feeling helpless.
              </p>
              
              <p>
                We experienced this pain ourselves, within our families and friends, and realized there has to be a better way. That's why we're building fin-o-ji as your dedicated insurance co-pilot.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-blue-100 mb-6">
                To eliminate the fear, confusion, and frustration that millions of Indians feel towards insurance by becoming your most trusted personal advocate.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <p className="text-sm text-blue-100 font-medium">
                  "We don't sell insurance. We empower you to understand and get the most value from what you already own."
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Experience the magic of fin-o-ji:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl animate-wiggle">🔍</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Policy X-Ray</h4>
                <p className="text-gray-600 text-sm">AI-powered translation of complex policy jargon into simple, understandable language. See hidden conditions and exclusions clearly.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl animate-wiggle-delay">🤝</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Claims Co-pilot</h4>
                <p className="text-gray-600 text-sm">Your partner during stressful claims. Get step-by-step guidance, document prep, and communication help.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-2xl animate-bounce-soft">🚨</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">One-Tap Emergency</h4>
                <p className="text-gray-600 text-sm">In crisis moments, one tap transforms the app to show only critical info: health cards, TPA contacts, accident guides.</p>
              </div>
            </div>
          </div>
          
          {/* 5-Minute Health Checkup Section */}
          <div className="mt-12 bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                ✨ Launch Feature
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">5-Minute Insurance Health Checkup</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your first "wow" moment with fin-o-ji. Get instant insights into your insurance portfolio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl animate-bounce">�</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Upload Your Policies</h4>
                <p className="text-gray-600 text-sm">Upload existing insurance documents or connect securely. Our AI analyzes everything automatically.</p>
              </div>
              
              <div className="text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl animate-spin-slow">🤖</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
                <p className="text-gray-600 text-sm">Instant analysis of your policies, coverage gaps, and recommendations within minutes.</p>
              </div>
              
              <div className="text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl animate-pulse">📊</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Health Score</h4>
                <p className="text-gray-600 text-sm">Get your Insurance Health Score (like 7/10) with a simple report card and actionable insights.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center space-y-6">
            <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Our Roadmap:</span> Starting with Health & Life Insurance, then expanding to Motor, Travel, Home, Gadget, and beyond — creating a comprehensive "Super-Advocate" for all your insurance needs.
              </p>
              
              <p className="text-xl font-semibold text-gray-900">
                fin-o-ji is not just an app. It's a movement to put power back in the hands of people, not companies.
              </p>
              
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
                <p className="text-gray-800 font-medium">
                  Founded in 2025 by IIT Bombay students for the FinTech Entrepreneurship course — building the future of insurance advocacy in India.
                </p>
              </div>
            </div>
            
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Join Our Mission
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist-form" className="relative py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        {/* Animated background decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200/20 rounded-full blur-xl animate-float-slow"></div>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4 animate-bounce-gentle">
              🎯 Join the Revolution
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Be the first to experience the future
            </h2>
            <p className="text-gray-600 text-lg">
              Join thousands of Indians waiting for their personal AI insurance advocate
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6 backdrop-blur-sm border border-white/20 hover:shadow-2xl transition-all duration-300 animate-slide-up"
          >
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Join the Waitlist
          </h2>
          {status === "success" && (
            <div className="bg-green-100 border border-green-200 text-green-800 rounded-lg p-4 text-center font-medium flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Thanks! Please check your email to verify your spot.</span>
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-100 border border-red-200 text-red-800 rounded-lg p-4 text-center font-medium flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={form.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="your.email@example.com"
            />
          </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Which insurance do you currently have?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {insuranceOptions.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      form.insurances.includes(option)
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-sm'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="insurances"
                      value={option}
                      checked={form.insurances.includes(option)}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="font-medium text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                What is your biggest insurance problem right now?{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="problem"
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                rows={3}
                value={form.problem}
                onChange={handleChange}
                placeholder="Tell us about your insurance challenges..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-pulse-gentle"
              disabled={status === "success"}
            >
              {status === "success" ? "Welcome to the waitlist! 🎉" : "Join Waitlist"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300">Ready to transform insurance?</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join thousands of Indians who are waiting for a better insurance experience.
            </p>
          </div>
          
          <div className="pt-8 border-t border-gray-700 space-y-4">
            <div className="text-gray-300">
              <span className="font-semibold text-white">Co-founders:</span>{" "}
              Kovid Bhatia — {" "}
              <a 
                href="mailto:kovidbhatia611@gmail.com" 
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                kovidbhatia611@gmail.com
              </a>
              {" | "} Krishna Gahlod — {" "}
              <a 
                href="mailto:krishnagahlod@gmail.com" 
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                krishnagahlod@gmail.com
              </a>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-400">
                Made with ❤️ by IIT Bombay students for the people of India
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
