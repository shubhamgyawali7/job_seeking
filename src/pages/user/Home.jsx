import React, { useEffect, useState } from "react";
import { jobs } from "../../data/jobs.js";
import Header from "../../components/Header.jsx";
import heroImg from "../../assets/images/jobapplyimage.png";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { JOB_ROUTE } from "../../constants/routes.js";

const Home = () => {
  const navigate = useNavigate();

  //Incerasing number counter
  const [stats, setStats] = useState({
    workers: 0,
    companies: 0,
    categories: 0,
  });
  const animateNumber = (target, setter, duration = 2000) => {
    const start = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(
        startValue + (target - startValue) * easeOutQuart
      );
      setter(current);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      animateNumber(
        586000,
        (value) => setStats((prev) => ({ ...prev, workers: value })),
        2000
      );
      animateNumber(
        15000,
        (value) => setStats((prev) => ({ ...prev, companies: value })),
        2200
      );
      animateNumber(
        850,
        (value) => setStats((prev) => ({ ...prev, categories: value })),
        1800
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // navigate to job page when click to animatuion latest job 
  const goToJobList = () => {
    navigate({ pathname: JOB_ROUTE });
  };

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
      <section id="stats-section" className="bg-[#164b7d] py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">
              {stats.workers.toLocaleString()}+
            </span>
            <span className="text-gray-200 font-medium">Active Workers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">
              {stats.companies.toLocaleString()}+
            </span>
            <span className="text-gray-200 font-medium">Companies</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">
              {stats.categories.toLocaleString()}+
            </span>
            <span className="text-gray-200 font-medium">Job Categories</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-[#212121]">About Us</h2>
          <p className="text-[#757575] text-lg mb-4">
            We are dedicated to connecting job seekers with their dream careers
            and helping employers find the best talent. Our platform offers a
            seamless experience for searching, applying, and managing job
            applications, making your job hunt easier and more effective.
          </p>
          <ul className="list-disc pl-6 text-[#212121]">
            <li>Thousands of jobs from top companies</li>
            <li>Easy application process</li>
            <li>Personalized job recommendations</li>
            <li>Trusted by professionals worldwide</li>
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

      {/* Latest Jobs Section - Scroll Animation with Fade */}
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

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

        {/* Scroll container */}
        <div className="overflow-hidden relative">
          <div className="flex animate-scroll-x space-x-6 w-max px-4">
            {(jobs.length > 0 ? jobs : [...Array(6)]).map((job, index) => (
              <div
                key={job.id || `dummy-${index}`}
                className="bg-white rounded-xl shadow-md p-4 border-l-4 border-[#873036] min-w-[270px] max-w-[270px]"
              >
                <h3 className="text-[#164b7d] font-semibold text-lg mb-1 truncate">
                  {job.title || `Software Engineer ${index + 1}`}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  {job.company || "Tech Company"} &middot;{" "}
                  {job.location || "Remote"}
                </p>
                <p className="text-gray-600 text-sm">
                  {job.type || "Full-time"} &middot;{" "}
                  {job.salary || "₹50,000 - ₹80,000"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CSS scroll animation */}
        <style>{`
          @keyframes scroll-x {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll-x {
            animation: scroll-x 40s linear infinite;
          }
        `}</style>
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
            className="px-4 py-2 rounded border border-[#164b7d] focus:outline-none focus:ring-2 focus:ring-[#164b7d] text-[#212121] bg-white"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 rounded border border-[#164b7d] focus:outline-none focus:ring-2 focus:ring-[#164b7d] text-[#212121] bg-white"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="px-4 py-2 rounded border border-[#164b7d] focus:outline-none focus:ring-2 focus:ring-[#164b7d] text-[#212121] bg-white"
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

      {/* Footer */}
      <footer className="bg-[#873036] text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold">RojgaarHub</div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Shubham Gyawali. All rights
            reserved.
          </div>
        </div>
      </footer>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes job-scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-job-scroll {
          animation: job-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
