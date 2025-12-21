import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Components & Assets
import Header from "../../components/Header.jsx";
import heroImg from "../../assets/images/jobapplyimage.png";
import { JOB_ROUTE } from "../../constants/routes.js";
import { getJobs } from "@/api/jobs.js";

const Home = () => {
  const navigate = useNavigate();

  // 1. Move State to the Top
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    workers: 0,
    companies: 0,
    categories: 0,
  });

  // 2. Logic: Number Animation
  const animateNumber = (target, setter, duration = 2000) => {
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);
      setter(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  // 3. Effects: Fetching Data
  useEffect(() => {
    // Fetch Jobs
    getJobs()
      .then((response) => {
        setJobs(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });

    // Animate Stats
    const timer = setTimeout(() => {
      animateNumber(586000, (val) => setStats((p) => ({ ...p, workers: val })));
      animateNumber(
        15000,
        (val) => setStats((p) => ({ ...p, companies: val })),
        2200
      );
      animateNumber(
        850,
        (val) => setStats((p) => ({ ...p, categories: val })),
        1800
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const goToJobList = () => navigate({ pathname: JOB_ROUTE });

  // 4. Prepare data for the scroll
  // If loading or no jobs, we show 6 "skeleton" or dummy items
  const displayJobs = jobs.length > 0 ? jobs : [...Array(6)];

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-[Poppins]">
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-12 px-4">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#212121] leading-tight">
            Secure Your Career Path.
            <br />
            You're Worth It.
          </h1>
          <p className="mb-6 text-[#757575] text-lg max-w-xl">
            Empowering Ambitious Job Seekers with Comprehensive Tools and
            Resources to Discover, Apply, and Secure Their Dream.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="px-4 py-2 rounded-lg border border-[#164b7d] focus:outline-none focus:ring-2 focus:ring-[#164b7d] text-[#212121] bg-white min-w-[180px]"
            />
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2 rounded-lg border border-[#164b7d] focus:outline-none focus:ring-2 focus:ring-[#164b7d] text-[#212121] bg-white min-w-[140px]"
            />
            <button className="px-6 py-2 rounded-lg font-semibold bg-[#873036] text-white hover:bg-[#164b7d] transition">
              Find Jobs
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={heroImg}
            alt="Job Search"
            className="w-80 md:w-[26rem] object-contain"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#164b7d] py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <StatItem value={stats.workers} label="Active Workers" />
          <StatItem value={stats.companies} label="Companies" />
          <StatItem value={stats.categories} label="Job Categories" />
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-[#212121]">About Us</h2>
          <p className="text-[#757575] text-lg mb-4">
            We are dedicated to connecting job seekers with their dream
            careers...
          </p>
          <ul className="list-disc pl-6 text-[#212121]">
            <li>Thousands of jobs from top companies</li>
            <li>Easy application process</li>
            <li>Personalized job recommendations</li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={heroImg}
            alt="About"
            className="w-72 md:w-96 object-contain rounded-xl shadow"
          />
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="bg-[#F8FAFC] py-16 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#212121]">
            Latest Jobs
          </h2>
          <button
            onClick={goToJobList}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#873036] text-white font-semibold hover:bg-[#164b7d] transition"
          >
            View All Jobs <FaArrowRight />
          </button>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex animate-scroll-x space-x-6 w-max px-4">
            {/* Map twice to create a seamless infinite loop effect */}
            {[...displayJobs, ...displayJobs].map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 border-l-4 border-[#873036] min-w-[270px] max-w-[270px]"
              >
                <h3 className="text-[#164b7d] font-semibold text-lg mb-1 truncate">
                  {job?.title || "Loading Job..."}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  {job?.company || "Tech Company"} &middot;{" "}
                  {job?.location || "Remote"}
                </p>
                <p className="text-[#873036] font-medium text-sm">
                  {job?.type || "Full-time"} &middot;{" "}
                  {job?.salary || "Contact for Salary"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#212121] text-center">
          Contact Us
        </h2>
        <form className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-2 rounded border border-[#164b7d] focus:outline-none focus:ring-2 focus:ring-[#164b7d]"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 rounded border border-[#164b7d] focus:outline-none focus:ring-2 focus:ring-[#164b7d]"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="px-4 py-2 rounded border border-[#164b7d] focus:outline-none focus:ring-2 focus:ring-[#164b7d]"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg font-semibold bg-[#873036] text-white hover:bg-[#164b7d] transition self-end"
          >
            Send Message
          </button>
        </form>
      </section>

      <footer className="bg-[#873036] text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold">RojgaarHub</div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Shubham Gyawali. All rights
            reserved.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

// Small Helper Component
const StatItem = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl font-bold text-white">
      {value.toLocaleString()}+
    </span>
    <span className="text-gray-200 font-medium">{label}</span>
  </div>
);

export default Home;
