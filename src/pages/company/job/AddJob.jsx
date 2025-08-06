import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    status: 'Open',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send form data to backend API
    alert('Job added!\n' + JSON.stringify(form, null, 2));
    setForm({
      title: '',
      company: '',
      location: '',
      salary: '',
      description: '',
      status: 'Open',
    });
    // Optionally navigate to job list after submit
    // navigate('/admin/dashboard/jobs');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 py-10 relative">
      {/* Back Button at top left */}
      <button
        type="button"
        onClick={() => navigate('/admin/dashboard/jobs')}
        className="absolute left-8 top-8 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg shadow transition"
      >
        ← Back
      </button>
      <div className="w-full max-w-2xl bg-white/90 rounded-xl shadow-2xl border border-blue-200 p-10 transition-all duration-300">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-900 tracking-tight text-center">
          Add New Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-blue-900 font-semibold mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-semibold mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
                placeholder="e.g. Tech Corp"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-semibold mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
                placeholder="e.g. Remote, Mumbai"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-semibold mb-1">Salary</label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                required
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
                placeholder="e.g. ₹8,00,000 - ₹12,00,000"
              />
            </div>
          </div>
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
              rows={4}
              placeholder="Describe the job role, responsibilities, and requirements..."
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-blue-900 font-semibold mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
              >
                <option value="Open" className="text-blue-700">Open</option>
                <option value="Closed" className="text-red-700">Closed</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-red-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-200 text-lg tracking-wide"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob