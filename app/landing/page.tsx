'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Users, Folder, List, Calendar, BarChart2, CheckCircle, Star, MessageSquare, Database, Bot } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import SharedLayout from '@/components/SharedLayout';

export default function LandingPage() {
  const { theme } = useTheme();

  const features = [
    { icon: <Users className="h-8 w-8" />, title: "Team Collaboration", description: "Work seamlessly with your team members, assign tasks, and track progress together." },
    { icon: <Folder className="h-8 w-8" />, title: "Project Management", description: "Organize your work into projects, set milestones, and manage resources effectively." },
    { icon: <List className="h-8 w-8" />, title: "Task Tracking", description: "Create, assign, and monitor tasks with ease. Set priorities and deadlines to stay on top of your work." },
    { icon: <Calendar className="h-8 w-8" />, title: "Scheduling", description: "Plan your work with an intuitive calendar view. Never miss a deadline again." },
    { icon: <BarChart2 className="h-8 w-8" />, title: "Analytics", description: "Gain insights into your team's performance with detailed reports and analytics." },
    { icon: <CheckCircle className="h-8 w-8" />, title: "Goal Tracking", description: "Set and track goals for your team. Celebrate achievements and identify areas for improvement." },
    { icon: <MessageSquare className="h-8 w-8" />, title: "AI Chatbot Assistant", description: "Get instant help and automate tasks with our intelligent chatbot." },
    { icon: <Database className="h-8 w-8" />, title: "Blockchain Integration", description: "Secure and transparent task management with blockchain technology." },
    { icon: <Bot className="h-8 w-8" />, title: "Agent Automation", description: "Leverage AI agents to automate repetitive tasks and enhance productivity." },
  ];

  const testimonials = [
    { name: "John Doe", role: "CEO, TechCorp", quote: "QuantumLabs has revolutionized our workflow. The AI chatbot and blockchain features are game-changers!" },
    { name: "Jane Smith", role: "Project Manager, InnovateCo", quote: "The best task management tool I've used. The chatbot assistant saves us hours every week." },
    { name: "Mike Johnson", role: "Team Lead, CreativeSolutions", quote: "QuantumLabs's blockchain integration gives us unparalleled security and transparency." },
  ];

  return (
    <SharedLayout>
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI-Powered Task Management
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            TaskFlow: Revolutionizing team collaboration with AI chatbots and blockchain technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-x-4"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Cutting-Edge Features for Modern Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-80 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-purple-500 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Chatbot Section */}
        <section className="bg-blue-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">AI-Powered Chatbot Assistant</h2>
            <p className="text-xl mb-8">Our intelligent chatbot helps you manage tasks, answer questions, and automate workflows.</p>
            <ul className="text-left max-w-md mx-auto">
              <li className="mb-2">✓ Instant task creation and assignment</li>
              <li className="mb-2">✓ Quick access to project information</li>
              <li className="mb-2">✓ Automated reminders and notifications</li>
              <li>✓ Natural language processing for ease of use</li>
            </ul>
          </div>
        </section>

        {/* Blockchain Integration Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Blockchain-Powered Security</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4">Unparalleled Security and Transparency</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Immutable task records</li>
                <li>Transparent project history</li>
                <li>Secure data storage</li>
                <li>Decentralized access control</li>
              </ul>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg mb-4">
                Our blockchain integration ensures that your project data is secure, transparent, and tamper-proof.
                Every action is recorded on the blockchain, providing an auditable trail of all project activities.
              </p>
            </div>
          </div>
        </section>

        {/* Agent Automation Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center">AI-Powered Agent Automation</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4">Supercharge Your Workflow with AI Agents</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Automate repetitive tasks</li>
                <li>Intelligent task assignment and prioritization</li>
                <li>24/7 productivity with always-on AI agents</li>
                <li>Customizable automation workflows</li>
              </ul>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg mb-4">
                Our AI agents work tirelessly to optimize your workflow, automating routine tasks and
                providing intelligent suggestions to boost your team's productivity.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-80 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to revolutionize your team's productivity?</h2>
            <p className="text-xl mb-8">Join thousands of teams already using QuantumLabs's AI and blockchain-powered platform.</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <Link href="/signup">Start Your Free 14-Day Trial</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 QuantumLabs. All rights reserved.</p>
        </div>
      </footer>
    </SharedLayout>
  );
}