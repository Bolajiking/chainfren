'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/chainlogo.png'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Logo in top left */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/">
          <Image src={logo} alt="Chainfren Logo" width={120} height={40} className="h-auto brightness-0 invert" />
        </Link>
      </div>

      {/* X icon in top right */}
      <div className="absolute top-6 right-6 z-10">
        <Link href="/">
          <button className="text-white hover:opacity-80 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </Link>
      </div>

      {/* Form Container */}
      <div className="flex items-center justify-center min-h-screen px-4 py-20">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16">
            Tell us about you
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* First Row: First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="firstName" className="block text-[#ccc] text-sm mb-2">
                  First Name <span className="text-[#ccc] font-serif">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-[#ccc] text-white placeholder-white/50 focus:outline-none focus:border-white pb-2"
                  placeholder=""
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-[#ccc] text-sm mb-2">
                  Last Name <span className="text-[#ccc] font-serif">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-[#ccc] text-white placeholder-white/50 focus:outline-none focus:border-white pb-2"
                  placeholder=""
                />
              </div>
            </div>

            {/* Second Row: Email and Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="email" className="block text-[#ccc] text-sm mb-2">
                  Email <span className="text-[#ccc] font-serif ">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-[#ccc] text-white placeholder-white/50 focus:outline-none font-serif focus:border-white pb-2"
                  placeholder=""
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-[#ccc] text-sm mb-2">
                  Company <span className="text-[#ccc] font-serif">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-[#ccc] text-white placeholder-white/50 focus:outline-none focus:border-white pb-2"
                  placeholder=""
                />
              </div>
            </div>

            {/* Message Field - Full Width */}
            <div>
              <label htmlFor="message" className="block text-[#ccc] text-sm mb-2">
                Message <span className="text-[#ccc] font-serif">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b-2 border-[#ccc] text-white placeholder-white/50 focus:outline-none focus:border-white pb-2 resize-none"
                placeholder=""
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-start pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-white text-black font-semibold rounded-full uppercase hover:opacity-90 transition-opacity"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
