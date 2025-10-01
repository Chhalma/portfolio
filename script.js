// Smooth scrolling navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Create floating shapes
function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    if (!shapesContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.width = (Math.random() * 100 + 50) + 'px';
        shape.style.height = shape.style.width;
        shape.style.animationDelay = Math.random() * 6 + 's';
        shape.style.animationDuration = (Math.random() * 4 + 4) + 's';
        shapesContainer.appendChild(shape);
    }
}

// Skills Radar Chart
function createSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;
    
    try {
        new Chart(ctx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['JavaScript', 'React', 'Node.js', 'Python', 'Data Viz', 'ML/AI'],
                datasets: [{
                    label: 'Skills',
                    data: [90, 85, 80, 75, 95, 70],
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating skills chart:', error);
    }
}

// Activity Timeline Chart
function createActivityChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;
    
    try {
        const data = [];
        const labels = [];
        
        // Generate sample data for last 30 days
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            data.push(Math.floor(Math.random() * 20) + 1);
        }

        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Commits',
                    data: data,
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating activity chart:', error);
    }
}

// Three.js Demo
function createThreeJSDemo() {
    const container = document.getElementById('threejsDemo');
    if (!container || !window.THREE) return;
    
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x667eea,
            wireframe: true 
        });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            torus.rotation.x += 0.01;
            torus.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    } catch (error) {
        console.error('Error creating Three.js demo:', error);
        document.getElementById('threejsDemo').innerHTML = '3D Demo unavailable';
    }
}

// D3.js Network Demo
function createD3Demo() {
    const container = document.getElementById('d3Demo');
    if (!container || !window.d3) return;
    
    try {
        const width = container.offsetWidth;
        const height = 200;

        container.innerHTML = '';

        const svg = d3.select(container).append('svg')
            .attr('width', width)
            .attr('height', height);

        const nodes = d3.range(15).map(i => ({ id: i }));
        const links = d3.range(10).map(() => ({
            source: Math.floor(Math.random() * 15),
            target: Math.floor(Math.random() * 15)
        }));

        const simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-30))
            .force('link', d3.forceLink(links).id(d => d.id).distance(50))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.selectAll('.link')
            .data(links)
            .enter().append('line')
            .attr('class', 'link')
            .style('stroke', '#667eea')
            .style('stroke-width', 1.5);

        const node = svg.selectAll('.node')
            .data(nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', 5)
            .style('fill', '#764ba2');

        simulation.on('tick', () => {
            link
                .attr('x1', d => Math.max(5, Math.min(width - 5, d.source.x)))
                .attr('y1', d => Math.max(5, Math.min(height - 5, d.source.y)))
                .attr('x2', d => Math.max(5, Math.min(width - 5, d.target.x)))
                .attr('y2', d => Math.max(5, Math.min(height - 5, d.target.y)));

            node
                .attr('cx', d => Math.max(5, Math.min(width - 5, d.x)))
                .attr('cy', d => Math.max(5, Math.min(height - 5, d.y)));
        });
    } catch (error) {
        console.error('Error creating D3 demo:', error);
        document.getElementById('d3Demo').innerHTML = 'Network Demo unavailable';
    }
}

// Load blog articles (simulated)
function loadBlogArticles() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    setTimeout(() => {
        const articles = [
            {
                title: "Building Interactive Data Visualizations with D3.js",
                excerpt: "Learn how to create stunning, interactive charts and graphs that tell compelling stories with your data.",
                date: "Mar 15, 2024",
                readTime: "8 min read"
            },
            {
                title: "Modern React Patterns for 2024",
                excerpt: "Explore the latest React patterns and best practices for building scalable applications.",
                date: "Mar 10, 2024",
                readTime: "6 min read"
            },
            {
                title: "Machine Learning in the Browser with TensorFlow.js",
                excerpt: "Discover how to implement ML models directly in the browser for real-time predictions.",
                date: "Mar 5, 2024",
                readTime: "12 min read"
            }
        ];

        blogGrid.innerHTML = articles.map(article => `
            <div class="blog-card">
                <div class="blog-image">Article Preview</div>
                <div class="blog-content">
                    <div class="blog-title">${article.title}</div>
                    <div class="blog-excerpt">${article.excerpt}</div>
                    <div class="blog-meta">
                        <span>${article.date}</span>
                        <span>${article.readTime}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }, 1500);
}

// Load GitHub activity (simulated)
async function loadGitHubActivity() {
    const githubActivity = document.getElementById('githubActivity');
    if (!githubActivity) return;

    githubActivity.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            Fetching repositories...
        </div>
    `;

    try {
        const githubUsername = "Chhalma"; // your GitHub username

        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);

        const repos = await response.json();

        githubActivity.innerHTML = repos.map(repo => `
            <div class="repo-card">
                <div class="repo-name"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
                <div class="repo-description">${repo.description || 'No description'}</div>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>💻 ${repo.language || 'N/A'}</span>
                </div>
            </div>
        `).join('');
    } catch (err) {
        githubActivity.innerHTML = `<p style="color:red;">Failed to fetch repositories.</p>`;
        console.error(err);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createFloatingShapes();
    createSkillsChart();
    createActivityChart();
    createThreeJSDemo();
    createD3Demo();
    loadBlogArticles();
    loadGitHubActivity();
    
    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
});


// Toggle menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Sparkle effect on hover
const cards = document.querySelectorAll('.job-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        createSparkles(this);
    });
});

function createSparkles(card) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 0.5 + 's';
            card.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 100);
    }
}

// Tilt effect on mouse move
cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
    });
});

