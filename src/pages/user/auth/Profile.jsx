import React, { useState, useRef } from "react";

const initialProfile = {
  name: "Ram",
  email: "ram@gmail.com",
  avatarUrl: "",
  location: { city: "", state: "", country: "" },
  education: [
    // Example
    // { school: "", degree: "", field: "", start: "", end: "" }
  ],
  resumeUrl: "",
  coverLetterUrl: "",
};

const Profile = ({ initialData = initialProfile, onSave }) => {
  const [profile, setProfile] = useState(initialData);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl || "");
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);

  // For opening files in case of new uploads (local preview)
  const resumeUrl = resumeFile
    ? URL.createObjectURL(resumeFile)
    : profile.resumeUrl;
  const coverUrl = coverLetterFile
    ? URL.createObjectURL(coverLetterFile)
    : profile.coverLetterUrl;

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        avatarUrl: "", // will be handled after upload
      }));
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target.result);
      reader.readAsDataURL(file);
      // Optionally, store 'file' for upload
      setProfile((prev) => ({ ...prev, avatarFile: file }));
    }
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (type === "resume") setResumeFile(file);
    else setCoverLetterFile(file);
    // Storing file in profile for backend
    setProfile((prev) => ({ ...prev, [`${type}File`]: file }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      setProfile((prev) => ({
        ...prev,
        location: { ...prev.location, [name.split(".")[1]]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEducationChange = (idx, field, value) => {
    setProfile((prev) => {
      const education = prev.education.map((edu, i) =>
        i === idx ? { ...edu, [field]: value } : edu
      );
      return { ...prev, education };
    });
  };

  const addEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { school: "", degree: "", field: "", start: "", end: "" },
      ],
    }));
  };

  const removeEducation = (idx) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = () => {
    // You need to handle file uploads in your onSave function, e.g. using FormData if sending files.
    onSave(profile, {
      avatarFile: profile.avatarFile,
      resumeFile,
      coverLetterFile,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b-4 border-red-900" style={{ borderBottomColor: '#8a3137' }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-900" style={{ color: '#164b7d' }}>
                Profile Settings
              </h1>
              <p className="text-gray-600 mt-2">Manage your personal information and documents</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center" style={{ backgroundColor: '#164b7d' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={avatarPreview || "/api/placeholder/120/120"}
                    alt="profile avatar"
                    className="w-32 h-32 rounded-full border-4 object-cover mx-auto shadow-lg"
                    style={{ borderColor: '#164b7d' }}
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-red-900 flex items-center justify-center shadow-lg cursor-pointer hover:bg-red-800 transition-colors"
                       style={{ backgroundColor: '#8a3137' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-4 text-blue-900" style={{ color: '#164b7d' }}>
                  {profile.name || "Your Name"}
                </h3>
                <p className="text-gray-600">{profile.email || "your.email@example.com"}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {profile.location.city && profile.location.state && profile.location.country
                    ? `${profile.location.city}, ${profile.location.state}, ${profile.location.country}`
                    : "Location not set"}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Resume</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${resumeFile || profile.resumeUrl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {resumeFile || profile.resumeUrl ? 'Uploaded' : 'Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Cover Letter</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${coverLetterFile || profile.coverLetterUrl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {coverLetterFile || profile.coverLetterUrl ? 'Uploaded' : 'Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Education</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${profile.education.length > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {profile.education.length} {profile.education.length === 1 ? 'Entry' : 'Entries'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              
              {/* Personal Information Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-900 px-6 py-4" style={{ backgroundColor: '#164b7d' }}>
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={avatarPreview || "/api/placeholder/80/80"}
                        alt="profile avatar"
                        className="w-20 h-20 rounded-full border-4 object-cover"
                        style={{ borderColor: '#164b7d' }}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white file:cursor-pointer file:bg-blue-800 hover:file:bg-blue-600"
                        style={{ '--file-bg': '#164b7d' }}
                        onChange={handleAvatarChange}
                      />
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                      style={{ '--focus-ring-color': '#164b7d' }}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      placeholder="your.email@example.com"
                      required
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="location.city"
                        value={profile.location.city}
                        onChange={handleChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        name="location.state"
                        value={profile.location.state}
                        onChange={handleChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        placeholder="State/Province"
                      />
                      <input
                        type="text"
                        name="location.country"
                        value={profile.location.country}
                        onChange={handleChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-red-900 px-6 py-4" style={{ backgroundColor: '#8a3137' }}>
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Documents
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  
                  {/* Resume */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700">Resume *</label>
                      <span className={`text-xs px-2 py-1 rounded-full ${resumeFile || profile.resumeUrl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {resumeFile || profile.resumeUrl ? 'Uploaded' : 'Required'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-red-700 file:border-0 file:text-sm file:font-semibold file:text-white file:cursor-pointer hover:file:bg-red-800"
                      style={{ '--file-bg': '#8a3137' }}
                      onChange={(e) => handleFileChange("resume", e)}
                    />
                    {(resumeFile || profile.resumeUrl) && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-900 hover:text-red-900 underline flex items-center transition-colors"
                          style={{ color: '#164b7d' }}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {resumeFile ? resumeFile.name : profile.resumeUrl.split("/").pop()}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700">Cover Letter</label>
                      <span className={`text-xs px-2 py-1 rounded-full ${coverLetterFile || profile.coverLetterUrl ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {coverLetterFile || profile.coverLetterUrl ? 'Uploaded' : 'Optional'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-red-700 file:border-0 file:text-sm file:font-semibold file:text-white file:cursor-pointer hover:file:bg-red-800"
                      style={{ '--file-bg': '#8a3137' }}
                      onChange={(e) => handleFileChange("coverLetter", e)}
                    />
                    {(coverLetterFile || profile.coverLetterUrl) && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <a
                          href={coverUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-900 hover:text-red-900 underline flex items-center transition-colors"
                          style={{ color: '#164b7d' }}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {coverLetterFile ? coverLetterFile.name : profile.coverLetterUrl.split("/").pop()}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-900 px-6 py-4 flex justify-between items-center" style={{ backgroundColor: '#164b7d' }}>
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Education
                  </h2>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center"
                    style={{ color: '#164b7d' }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Degree
                  </button>
                </div>
                <div className="p-6">
                  {profile.education.length === 0 ? (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p className="text-gray-500 mb-4">No education entries yet</p>
                      <button
                        type="button"
                        onClick={addEducation}
                        className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                        style={{ backgroundColor: '#164b7d' }}
                      >
                        Add Your First Degree
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {profile.education.map((edu, idx) => (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-blue-900" style={{ color: '#164b7d' }}>
                              Education #{idx + 1}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeEducation(idx)}
                              className="px-3 py-1 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center"
                              style={{ backgroundColor: '#8a3137' }}
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">School/University</label>
                              <input
                                type="text"
                                placeholder="Institution name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                                value={edu.school}
                                onChange={(e) => handleEducationChange(idx, "school", e.target.value)}
                                style={{ '--focus-ring-color': '#164b7d' }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                              <input
                                type="text"
                                placeholder="Bachelor's, Master's, etc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                                style={{ '--focus-ring-color': '#164b7d' }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                              <input
                                type="text"
                                placeholder="Computer Science, Business, etc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                                value={edu.field}
                                onChange={(e) => handleEducationChange(idx, "field", e.target.value)}
                                style={{ '--focus-ring-color': '#164b7d' }}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                              <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                                value={edu.start || ""}
                                onChange={(e) => handleEducationChange(idx, "start", e.target.value)}
                                style={{ '--focus-ring-color': '#164b7d' }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                              <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                                value={edu.end || ""}
                                onChange={(e) => handleEducationChange(idx, "end", e.target.value)}
                                style={{ '--focus-ring-color': '#164b7d' }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
                  style={{ backgroundColor: '#164b7d' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;