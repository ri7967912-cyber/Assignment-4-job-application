let jobs = [
    { id: 1, companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "All", badge: "NOT APPLIED" },
    { id: 2, companyName: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Full-time", salary: "$80,000 - $120,000", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "All", badge: "NOT APPLIED" },
    { id: 3, companyName: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $155,000", description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "All", badge: "NOT APPLIED" },
    { id: 4, companyName: "CloudScale Inc", position: "DevOps Engineer", location: "Austin, TX", type: "Full-time", salary: "$140,000 - $180,000", description: "Manage and scale cloud infrastructure on AWS. Experience with Kubernetes and Terraform is mandatory.", status: "All", badge: "NOT APPLIED" },
    { id: 5, companyName: "FinTech Hub", position: "Backend Developer", location: "Remote", type: "Full-Time", salary: "$90 - $120 / hr", description: "Develop secure and scalable APIs for banking applications. Knowledge of microservices architecture is a plus.", status: "All", badge: "NOT APPLIED" },
    { id: 6, companyName: "Creative Pixel", position: "UI/UX Designer", location: "New York, NY", type: "Full-time", salary: "$110,000 - $140,000", description: "Design user-centric interfaces for mobile and web platforms. Proficiency in Figma and Adobe XD is required.", status: "All", badge: "NOT APPLIED" },
    { id: 7, companyName: "GreenEnergy Tech", position: "Frontend Developer", location: "Denver, CO", type: "Full-Time", salary: "$115,000 - $145,000", description: "Build sustainable energy monitoring dashboards using Vue.js. Help us create a cleaner future through technology.", status: "All", badge: "NOT APPLIED" },
    { id: 8, companyName: "CyberGuard", position: "Security Analyst", location: "Washington, DC", type: "Full-time", salary: "$130,000 - $160,000", description: "Monitor and protect organization networks from cyber threats. Experience with SIEM tools and incident response.", status: "All", badge: "NOT APPLIED" }
];

let currentTab = 'All';

function renderJobs() {
    const container = document.getElementById('jobs-container');
    const filteredJobs = jobs.filter(job => currentTab === 'All' ? true : job.status === currentTab);
    
    document.getElementById('tab-job-count').innerText = `${filteredJobs.length} jobs`;
    updateDashboard();

    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="text-center py-20 bg-white border border-gray-100 rounded-xl">
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" class="w-16 mx-auto opacity-20 mb-4">
                <h4 class="text-lg font-bold text-gray-400 uppercase">No Jobs Available</h4>
                <p class="text-gray-400 text-sm">Please check back later or try a different filter.</p>
            </div>`;
        return;
    }

    container.innerHTML = filteredJobs.map(job => `
        <div class="bg-white p-8 rounded-xl border border-gray-100 relative shadow-sm">
            <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
            <h4 class="text-xl font-bold text-gray-800 mb-1">${job.companyName}</h4>
            <p class="text-gray-500 text-sm mb-3">${job.position}</p>
            <div class="flex flex-wrap gap-4 text-xs text-gray-400 mb-5">
                <span>${job.location}</span> • <span>${job.type}</span> • <span>${job.salary}</span>
            </div>
            <span class="inline-block bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded mb-4 tracking-wider">${job.status === 'All' ? job.badge : job.status.toUpperCase()}</span>
            <p class="text-gray-600 text-sm mb-8 leading-relaxed max-w-3xl">${job.description}</p>
            <div class="flex gap-4">
                <button onclick="updateStatus(${job.id}, 'Interview')" class="btn btn-sm btn-outline btn-success px-6 normal-case font-bold">INTERVIEW</button>
                <button onclick="updateStatus(${job.id}, 'Rejected')" class="btn btn-sm btn-outline btn-error px-6 normal-case font-bold">REJECTED</button>
            </div>
        </div>
    `).join('');
}

function updateStatus(id, status) {
    jobs = jobs.map(job => job.id === id ? {...job, status: status} : job);
    renderJobs();
}

function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    renderJobs();
}

function updateDashboard() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'Interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'Rejected').length;
}

function changeTab(tab) {
    currentTab = tab;
    ['All', 'Interview', 'Rejected'].forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if(t === tab) {
            el.classList.add('bg-blue-600', 'text-white');
            el.classList.remove('bg-gray-100', 'text-gray-500');
        } else {
            el.classList.remove('bg-blue-600', 'text-white');
            el.classList.add('bg-gray-100', 'text-gray-500');
        }
    });
    renderJobs();
}

renderJobs();