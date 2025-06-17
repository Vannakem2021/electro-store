"use client";

import React, { useState } from "react";
import { Navbar } from "@/components";
import Link from "next/link";
import Button from "@/components/ui/Button";
import AccountSidebar from "@/components/account/AccountSidebar";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "general",
    message: "",
    priority: "medium"
  });

  const [tickets] = useState([
    {
      id: "TKT-2024-001",
      subject: "Order delivery issue",
      category: "Order Support",
      status: "Open",
      priority: "High",
      createdAt: "2024-01-15",
      lastUpdate: "2024-01-16"
    },
    {
      id: "TKT-2024-002",
      subject: "Product return request",
      category: "Returns",
      status: "Resolved",
      priority: "Medium",
      createdAt: "2024-01-10",
      lastUpdate: "2024-01-12"
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission
    setFormData({
      subject: "",
      category: "general",
      message: "",
      priority: "medium"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      description: "Get help via email",
      contact: "support@elecxo.com",
      responseTime: "24 hours"
    },
    {
      icon: "📞",
      title: "Phone Support",
      description: "Call us directly",
      contact: "+1 (555) 123-4567",
      responseTime: "Immediate"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available 9 AM - 6 PM EST",
      responseTime: "Few minutes"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8 font-poppins">
          <Link href="/" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link href="/account" className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
            Account
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">Contact us</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar activeItem="contact" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact Methods */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">Contact Us</h1>
                <p className="text-gray-600 font-poppins">Get in touch with our support team</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors duration-200">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{method.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 font-poppins mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 font-poppins mb-3">{method.description}</p>
                    <p className="font-semibold text-blue-800 font-poppins mb-2">{method.contact}</p>
                    <p className="text-xs text-gray-500 font-poppins">Response: {method.responseTime}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Send us a Message</h2>
                <p className="text-gray-600 font-poppins">Fill out the form below and we'll get back to you</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="product">Product Information</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 font-poppins mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed information about your inquiry..."
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-poppins text-gray-900 focus:border-blue-600 focus:outline-none transition-colors duration-200 resize-vertical"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 font-poppins font-semibold bg-blue-800 hover:bg-blue-900"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Your Support Tickets</h2>
                <p className="text-gray-600 font-poppins">Track the status of your support requests</p>
              </div>

              {tickets.length > 0 ? (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors duration-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="font-semibold text-gray-900 font-poppins mb-1">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600 font-poppins mb-2">Ticket ID: {ticket.id}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 font-poppins">
                            <span>Category: {ticket.category}</span>
                            <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                            <span>Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold font-poppins ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-poppins font-semibold"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">🎫</span>
                  </div>
                  <p className="text-gray-600 font-poppins">No support tickets found</p>
                </div>
              )}
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-2">Frequently Asked Questions</h2>
                <p className="text-gray-600 font-poppins">Quick answers to common questions</p>
              </div>

              <div className="space-y-4">
                <details className="border-2 border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 font-poppins cursor-pointer">
                    How can I track my order?
                  </summary>
                  <p className="mt-3 text-gray-600 font-poppins text-sm">
                    You can track your order by visiting the Orders section in your account or using the tracking number sent to your email.
                  </p>
                </details>

                <details className="border-2 border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 font-poppins cursor-pointer">
                    What is your return policy?
                  </summary>
                  <p className="mt-3 text-gray-600 font-poppins text-sm">
                    We offer a 30-day return policy for most items. Products must be in original condition with all packaging and accessories.
                  </p>
                </details>

                <details className="border-2 border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 font-poppins cursor-pointer">
                    How long does shipping take?
                  </summary>
                  <p className="mt-3 text-gray-600 font-poppins text-sm">
                    Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. Free shipping is available on orders over $50.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
