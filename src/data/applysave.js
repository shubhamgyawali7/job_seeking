// Sample applied jobs data from your JSON
  const appliedJobs = [
    {
      "_id": "686f9a768acb0bc598c7994e",
      "userId": "686f99178acb0bc598c79944",
      "jobId": "686f71625a92a093cb587bb9",
      "status": "Pending",
      "appliedAt": "2025-07-10T08:52:51.243Z",
      "jobDetails": {
        "_id": "686f71625a92a093cb587bb9",
        "title": "Video Editor",
        "company": "VisionCraft Studios",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/3/33/YouTube_Logo_2017.svg",
        "experience": "1-3 years",
        "salary": "₹4,00,000 - ₹6,00,000 per annum",
        "description": "We are seeking a creative and detail-oriented Video Editor to join our content production team. You will be responsible for assembling recorded footage into a finished project that matches the director's vision and is suitable for publishing.",
        "location": "Mumbai",
        "type": "Hybrid",
        "deadline": "2025-08-01T00:00:00.000Z",
        "requirements": [
          "Proficiency in Adobe Premiere Pro, After Effects, or similar tools",
          "Strong understanding of timing, pacing, and visual storytelling",
          "Experience editing YouTube or short-form social media videos",
          "Basic color grading and audio editing skills",
          "Portfolio of past work"
        ],
        "status": "Open",
        "postedDate": "2025-07-10T07:47:42.730Z",
        "createdBy": "686183145518a29fecfc8449"
      }
    },
    {
      "_id": "686fa04888a615478463a70f",
      "userId": "686f99178acb0bc598c79944",
      "jobId": "686fa03b88a615478463a70d",
      "status": "Interview",
      "appliedAt": "2025-07-10T11:08:32.009Z",
      "jobDetails": {
        "_id": "686fa03b88a615478463a70d",
        "title": "Junior Accountant",
        "company": "Finexa Solutions",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_Tax_Finance.svg",
        "experience": "1-2 years",
        "salary": "₹2,50,000 - ₹4,00,000 per annum",
        "description": "We are looking for a Junior Accountant to manage daily accounting tasks. You will be part of a team working to maintain order and transparency for the company's finances.",
        "location": "Kathmandu",
        "type": "Onsite",
        "deadline": "2025-08-10T00:00:00.000Z",
        "requirements": [
          "Bachelor's degree in Accounting or Finance",
          "Basic knowledge of Tally, MS Excel, and bookkeeping",
          "Familiarity with tax regulations and billing procedures",
          "Good numerical and analytical skills",
          "Strong attention to detail"
        ],
        "status": "Open",
        "postedDate": "2025-07-10T11:08:31.951Z",
        "createdBy": "686183145518a29fecfc8449"
      }
    },
    {
      "_id": "687a477dd848aa6e68a4b699",
      "userId": "686f99178acb0bc598c79944",
      "jobId": "685be4bf73af167e01f2897d",
      "status": "Accepted",
      "appliedAt": "2025-07-18T13:08:35.630Z",
      "jobDetails": {
        "_id": "685be4bf73af167e01f2897d",
        "title": "iOS Flutter Developer",
        "company": "Apple Inc.",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        "experience": "2-4 years",
        "salary": "₹15,00,000 - ₹20,00,000",
        "description": "Join the Apple India development team to build cutting-edge cross-platform mobile applications using Flutter. Collaborate with designers and product managers to create seamless iOS experiences.",
        "location": "Bangalore",
        "type": "Hybrid",
        "deadline": "2025-08-01T00:00:00.000Z",
        "requirements": [
          "Strong proficiency in Flutter and Dart",
          "Deep understanding of iOS UI/UX guidelines",
          "Experience with REST APIs and third-party libraries",
          "Familiarity with Swift/Objective-C is a plus"
        ],
        "status": "Open",
        "postedDate": "2025-06-25T10:55:46.652Z",
        "createdBy": "685bccddc0fdf543c45c5975"
      }
    }
  ];

  // Sample saved jobs data
  const savedJobs = [
    {
      "_id": "saved_1",
      "title": "Frontend Developer",
      "company": "Tech Solutions",
      "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "experience": "2-3 years",
      "salary": "₹8,00,000 - ₹12,00,000",
      "location": "Remote",
      "type": "Remote",
      "savedAt": "2025-07-15T10:30:00.000Z"
    },
    {
      "_id": "saved_2",
      "title": "UI/UX Designer",
      "company": "Design Hub",
      "logo": "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      "experience": "1-2 years",
      "salary": "₹5,00,000 - ₹8,00,000",
      "location": "Delhi",
      "type": "Hybrid",
      "savedAt": "2025-07-12T14:20:00.000Z"
    }
  ];

  export  {appliedJobs,savedJobs};