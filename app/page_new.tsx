'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { 
  Star, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Heart, 
  Users, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Search,
  FileText,
  Brain,
  Zap
} from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full blur-2xl opacity-20"
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Launching Soon
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
          >
            fin-o-ji
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 font-semibold"
          >
            Your personal AI insurance advocate
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            We use AI to X-ray your complex policies into simple, understandable advice and act as your dedicated co-pilot during stressful claims.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
          >
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
            >
              Join Waitlist
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <Search className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">Policy X-Ray</h3>
              <p className="text-gray-400 text-sm">AI-powered translation of complex policies</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <Heart className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">AI Claims Co-pilot</h3>
              <p className="text-gray-400 text-sm">Your partner during stressful claims</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <Zap className="w-8 h-8 text-red-400 mb-4 mx-auto" />
              <h3 className="text-white font-semibold mb-2">One-Tap Emergency</h3>
              <p className="text-gray-400 text-sm">Crisis mode with only critical info</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
              <Star className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Who we are
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xl font-medium text-white">
                fin-o-ji isn't another insurance marketplace; it's your personal AI advocate that stands only with you — the policyholder.
              </p>
              <p className="text-gray-300 leading-relaxed">
                In India, insurance is supposed to be a safety net — but instead, it often becomes a source of stress. Policies are written in complex language, exclusions are hidden in fine print, and when the time comes to make a claim, families are left feeling helpless.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We experienced this pain ourselves, within our families and friends, and realized there has to be a better way. That's why we're building fin-o-ji as your dedicated insurance co-pilot.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Our Mission</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    To eliminate the fear, confusion, and frustration that millions of Indians feel towards insurance by becoming your most trusted personal advocate.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <p className="text-sm text-gray-200 font-medium italic">
                      "We don't sell insurance. We empower you to understand and get the most value from what you already own."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Experience the magic of fin-o-ji:
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Search,
                  title: "Policy X-Ray",
                  description: "AI-powered translation of complex policy jargon into simple, understandable language. See hidden conditions and exclusions clearly."
                },
                {
                  icon: Heart,
                  title: "AI Claims Co-pilot", 
                  description: "Your partner during stressful claims. Get step-by-step guidance, document prep, and communication help."
                },
                {
                  icon: Zap,
                  title: "One-Tap Emergency",
                  description: "In crisis moments, one tap transforms the app to show only critical info: health cards, TPA contacts, accident guides."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 5-Minute Health Checkup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/20 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <Badge variant="secondary" className="mb-4 bg-green-500/20 text-green-300 border-green-500/30 w-fit mx-auto">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Launch Feature
                </Badge>
                <CardTitle className="text-2xl text-white mb-3">
                  5-Minute Insurance Health Checkup
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your first "wow" moment with fin-o-ji. Get instant insights into your insurance portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: FileText, title: "Upload Your Policies", description: "Upload existing insurance documents or connect securely. Our AI analyzes everything automatically." },
                    { icon: Brain, title: "AI Analysis", description: "Instant analysis of your policies, coverage gaps, and recommendations within minutes." },
                    { icon: TrendingUp, title: "Health Score", description: "Get your Insurance Health Score (like 7/10) with a simple report card and actionable insights." }
                  ].map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="text-center group hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                        <step.icon className="w-8 h-8 text-green-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-300 text-sm">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg text-gray-300">
                <span className="font-semibold text-white">Our Roadmap:</span> Starting with Health & Life Insurance, then expanding to Motor, Travel, Home, Gadget, and beyond — creating a comprehensive "Super-Advocate" for all your insurance needs.
              </p>
              <p className="text-xl font-semibold text-white">
                fin-o-ji is not just an app. It's a movement to put power back in the hands of people, not companies.
              </p>
              <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="text-gray-200 font-medium">
                    Founded in 2025 by IIT Bombay students for the FinTech Entrepreneurship course — building the future of insurance advocacy in India.
                  </p>
                </CardContent>
              </Card>
            </div>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
            >
              Join Our Mission
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist-form" className="relative py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
              <Users className="w-4 h-4 mr-2" />
              Join the Revolution
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Be the first to experience the future
            </h2>
            <p className="text-gray-300 text-lg">
              Join thousands of Indians waiting for their personal AI insurance advocate
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white text-center">
                  Join the Waitlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg p-4 text-center font-medium flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Thanks! Please check your email to verify your spot.</span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg p-4 text-center font-medium flex items-center justify-center space-x-2"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">
                        Name<span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="name"
                        type="text"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">
                        Phone Number<span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Email<span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Which insurance do you currently have?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {insuranceOptions.map((option) => (
                        <motion.label
                          key={option}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                            form.insurances.includes(option)
                              ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10'
                          }`}
                        >
                          <input
                            type="checkbox"
                            name="insurances"
                            value={option}
                            checked={form.insurances.includes(option)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="font-medium text-sm">{option}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      What is your biggest insurance problem right now?{" "}
                      <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <textarea
                      name="problem"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                      rows={3}
                      value={form.problem}
                      onChange={handleChange}
                      placeholder="Tell us about your insurance challenges..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 disabled:opacity-50"
                    disabled={status === "success"}
                  >
                    {status === "success" ? "Welcome to the waitlist! 🎉" : "Join Waitlist"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/50 backdrop-blur-sm border-t border-white/10 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-300">Ready to transform insurance?</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join thousands of Indians who are waiting for a better insurance experience.
            </p>
          </div>
          
          <div className="pt-8 border-t border-white/10 space-y-4">
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
    </div>
  )
}
