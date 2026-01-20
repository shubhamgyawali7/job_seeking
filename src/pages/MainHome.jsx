import React, { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaUsers,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MainHome = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-[#212121]">
      {/* --- NAVBAR --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-[#164b7d] tracking-tight">
            Rojgaar<span className="text-[#873036]">Hub</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            <a href="#home" className="hover:text-[#873036] transition">
              Home
            </a>
            <a href="#about" className="hover:text-[#873036] transition">
              About
            </a>
            <a href="#contact" className="hover:text-[#873036] transition">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")} // Wrapped in arrow function
              className="text-[#164b7d] font-semibold hover:text-[#873036] transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")} // Wrapped in arrow function
              className="bg-[#873036] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#164b7d] transition shadow-lg"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left z-10">
            <span className="bg-[#164b7d15] text-[#164b7d] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
              Discover Your Future
            </span>
            <h1 className="text-5xl lg:text-7xl font-black mt-6 mb-6 text-[#212121] leading-[1.1]">
              Secure Your <span className="text-[#164b7d]">Career Path.</span>{" "}
              <br />
              <span className="text-[#873036]">You're Worth It.</span>
            </h1>
            <p className="text-lg text-[#757575] mb-10 max-w-2xl mx-auto lg:mx-0">
              Empowering ambitious job seekers with the tools and resources to
              discover, apply, and secure their dream roles in top-tier
              companies.
            </p>

            {/* Search Bar UI */}
            <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-3xl border border-gray-100">
              <input
                type="text"
                placeholder="Job Title, Skills..."
                className="flex-1 px-6 py-4 outline-none text-gray-700 bg-transparent"
              />
              <div className="w-px bg-gray-200 hidden md:block my-2"></div>
              <input
                type="text"
                placeholder="Location"
                className="flex-1 px-6 py-4 outline-none text-gray-700 bg-transparent"
              />
              <button className="bg-[#164b7d] hover:bg-[#873036] text-white px-8 py-4 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2">
                Find Jobs <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#87303610] rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#164b7d10] rounded-full blur-3xl"></div>
            <img
              src="https://illustrations.popsy.co/amber/work-from-home.svg"
              alt="Hero Illustration"
              className="relative z-10 w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* --- STATS RIBBON --- */}
      <div className="bg-[#164b7d] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Jobs", value: "12K+", icon: <FaBriefcase /> },
            { label: "Companies", value: "500+", icon: <FaGlobe /> },
            { label: "Candidates", value: "80K+", icon: <FaUsers /> },
            { label: "New Jobs/Day", value: "200+", icon: <FaArrowRight /> },
          ].map((stat, i) => (
            <div key={i} className="text-center text-white">
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-blue-100 text-sm opacity-80 uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="bg-[#873036] h-48 rounded-2xl shadow-lg flex items-end p-6">
                <p className="text-white font-bold">
                  Trusted by Industry Leaders
                </p>
              </div>
              <div className="bg-gray-100 h-40 rounded-2xl border border-gray-200"></div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-100 h-40 rounded-2xl border border-gray-200"></div>
              <div className="bg-[#164b7d] h-48 rounded-2xl shadow-lg flex items-end p-6">
                <p className="text-white font-bold">Connecting Global Talent</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-[#164b7d] font-bold text-lg mb-2 italic">
              Our Story
            </h2>
            <h3 className="text-4xl font-extrabold mb-6 leading-tight">
              We Bridge the Gap Between{" "}
              <span className="text-[#873036]">Talent</span> and{" "}
              <span className="text-[#873036]">Opportunity</span>
            </h3>
            <p className="text-[#757575] text-lg mb-8 leading-relaxed">
              Founded in 2024, RojgaarHub has helped over 50,000 professionals
              find their place in the modern economy. We believe everyone
              deserves a career that fulfills their passion and rewards their
              worth.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "AI-Powered Job Matching",
                "Verified Company Profiles",
                "One-Click Easy Applications",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 font-semibold text-gray-700"
                >
                  <div className="w-6 h-6 rounded-full bg-[#87303615] text-[#873036] flex items-center justify-center text-xs">
                    ✔
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="border-2 border-[#164b7d] text-[#164b7d] px-8 py-3 rounded-full font-bold hover:bg-[#164b7d] hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/3 bg-[#164b7d] p-12 text-white">
              <h3 className="text-3xl font-bold mb-8">Contact Info</h3>
              <p className="text-blue-100 mb-12">
                Have questions? Our team is here to help you navigate your
                career journey.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Call Us</p>
                    <p className="font-bold">+977 9800000000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Email Us</p>
                    <p className="font-bold">support@rojgaarhub.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Visit Us</p>
                    <p className="font-bold">Butwal, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 p-12">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-[#873036] transition"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-[#873036] transition"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-bold text-sm text-gray-600">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-[#873036] transition"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button className="md:col-span-2 bg-[#873036] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-black text-[#164b7d] mb-6">
                RojgaarHub
              </div>
              <p className="text-gray-500 leading-relaxed">
                Making the job search process simple, fast, and effective for
                the next generation of professionals.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-500">
                <li>
                  <a href="#home" className="hover:text-[#873036]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#873036]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#873036]">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">For Candidates</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="hover:text-[#873036] cursor-pointer">
                  Browse Jobs
                </li>
                <li className="hover:text-[#873036] cursor-pointer">
                  Career Advice
                </li>
                <li className="hover:text-[#873036] cursor-pointer">
                  Job Alerts
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Subscribe</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-100 px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-[#164b7d]"
                />
                <button className="bg-[#164b7d] text-white px-4 py-2 rounded-lg">
                  Go
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} RojgaarHub. Built with passion
              by Shubham Gyawali.
            </p>
            <div className="flex gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainHome;
