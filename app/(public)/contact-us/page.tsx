"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    comment: "",
    newsletter: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Message sent!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          comment: "",
          newsletter: false,
        });
      } else {
        alert("Failed to send");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1e1e1e] px-4 py-10">
      {/* Tabs */}
      <div className="flex justify-center mb-10 space-x-10 text-sm md:text-base font-medium">
        <div className="relative">
          <span>Flight Details</span>
          <div className="h-1 bg-yellow-400 w-full absolute bottom-[-6px] left-0"></div>
        </div>
        <div>Select flight</div>
        <div>Contact</div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold mb-6">Request a Quote</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border-b border-yellow-400 bg-transparent outline-none py-2"
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border-b border-yellow-400 bg-transparent outline-none py-2"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-b border-yellow-400 bg-transparent outline-none py-2"
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border-b border-yellow-400 bg-transparent outline-none py-2"
            required
          />
          <input
            name="location"
            placeholder="Current Location"
            value={formData.location}
            onChange={handleChange}
            className="border-b border-yellow-400 bg-transparent outline-none py-2 md:col-span-2"
          />
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
            className="border-b border-yellow-400 bg-transparent outline-none py-2 md:col-span-2"
            rows={4}
          />
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm">
            Sign Up to Receive newsletter from Swift Hiring
          </span>
        </label>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 font-semibold rounded-md"
        >
          Request Flight
        </button>
      </form>
    </div>
  );
}
