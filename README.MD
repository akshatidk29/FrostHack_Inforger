<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xpensa - AI-Powered Personal Finance Tracker</title>
  <style>
    :root {
      --primary: #6366f1;
      --primary-dark: #4f46e5;
      --secondary: #06b6d4;
      --accent: #f43f5e;
      --text: #334155;
      --bg-light: #f8fafc;
      --bg-card: #ffffff;
      --border: #e2e8f0;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: var(--text);
      background: linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%);
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .hero {
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      color: white;
      padding: 3rem 2rem;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.2);
      margin-bottom: 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.1;
    }
    
    h1 {
      font-size: 3rem;
      margin: 0;
      letter-spacing: -0.5px;
    }
    
    .tagline {
      font-size: 1.25rem;
      margin-top: 1rem;
      font-weight: 300;
    }
    
    .card {
      background: var(--bg-card);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      color: var(--primary-dark);
      margin-top: 0;
      display: flex;
      align-items: center;
      font-size: 1.6rem;
    }
    
    h2 i {
      margin-right: 0.75rem;
      font-size: 1.5rem;
    }
    
    .pill {
      display: inline-block;
      background: #e0e7ff;
      color: var(--primary);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 50px;
      margin: 0.25rem;
    }
    
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1.5rem 0;
    }
    
    .highlight {
      color: var(--accent);
      font-weight: 600;
    }
    
    .footer {
      text-align: center;
      padding: 2rem 0;
      margin-top: 3rem;
      border-top: 1px solid var(--border);
    }
    
    .section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }
    
    .feature-card {
      background: rgba(99, 102, 241, 0.05);
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      border: 1px solid rgba(99, 102, 241, 0.1);
    }
    
    .feature-icon {
      font-size: 2rem;
      color: var(--primary);
      margin-bottom: 1rem;
    }
    
    .toc {
      position: sticky;
      top: 20px;
      background: var(--bg-card);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }
    
    .toc ul {
      padding-left: 1.5rem;
      margin: 0.5rem 0;
    }
    
    .toc a {
      color: var(--text);
      text-decoration: none;
      display: block;
      padding: 0.25rem 0;
      transition: color 0.2s ease;
    }
    
    .toc a:hover {
      color: var(--primary);
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 2.25rem;
      }
      
      .section-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
  <div class="container">
    <div class="hero">
      <h1>✨ Xpensa</h1>
      <p class="tagline">AI-Powered Personal Finance Tracker</p>
      <p>Track Smarter. Save Better. Live Stress-Free.</p>
    </div>
    
    <div class="section-grid">
      <div class="card toc">
        <h2><i class="fas fa-list"></i> Navigation</h2>
        <ul>
          <li><a href="#inspiration">Inspiration</a></li>
          <li><a href="#problem">The Problem It Solves</a></li>
          <li><a href="#features">What It Does</a></li>
          <li><a href="#build">How We Built It</a></li>
          <li><a href="#challenges">Challenges We Ran Into</a></li>
          <li><a href="#accomplishments">Accomplishments</a></li>
          <li><a href="#lessons">What We Learned</a></li>
          <li><a href="#future">What's Next</a></li>
          <li><a href="#tech">Technologies Used</a></li>
        </ul>
      </div>
      
      <div>
        <div class="card" id="inspiration">
          <h2><i class="fas fa-lightbulb"></i> Inspiration</h2>
          <p>Managing personal finances can be overwhelming, with scattered transactions, unclear spending patterns, and a lack of real-time insights. We wanted to create <span class="highlight">a seamless, AI-powered solution</span> that simplifies expense tracking, provides actionable insights, and helps users <span class="highlight">make smarter financial decisions effortlessly</span>.</p>
        </div>
        
        <div class="card" id="problem">
          <h2><i class="fas fa-puzzle-piece"></i> The Problem It Solves</h2>
          <p>Financial mismanagement is a widespread issue, affecting individuals and businesses alike. People struggle with <span class="highlight">untracked expenses, impulsive spending, and a lack of financial awareness</span>, leading to <span class="highlight">debt, poor savings, and financial stress</span>.</p>
          
          <p>Traditional budgeting tools require manual input, making them tedious and ineffective for real-time decision-making. In a world driven by digital transactions, there is no <span class="highlight">intelligent, automated system</span> that seamlessly <span class="highlight">analyzes, categorizes, and provides actionable insights</span> into financial data.</p>
          
          <p><span class="highlight">Xpensa</span> addresses this gap by offering an <span class="highlight">AI-powered, real-time financial tracker</span> that simplifies money management, making financial health accessible to everyone. 🚀</p>
        </div>
      </div>
    </div>
    
    <div class="card" id="features">
      <h2><i class="fas fa-rocket"></i> What It Does</h2>
      <p>Xpensa is an <span class="highlight">AI-powered personal finance tracker</span> that:</p>
      
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-chart-line"></i></div>
          <p><strong>Tracks expenses in real-time</strong> from uploaded transaction data</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-robot"></i></div>
          <p><strong>Uses AI to categorize and analyze</strong> spending patterns</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-bell"></i></div>
          <p><strong>Provides smart alerts</strong> for unusual spending or savings opportunities</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-chart-pie"></i></div>
          <p><strong>Visualizes financial data</strong> with interactive charts and graphs</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-piggy-bank"></i></div>
          <p><strong>Offers budgeting insights and recommendations</strong> to help users save better</p>
        </div>
      </div>
    </div>
    
    <div class="card" id="build">
      <h2><i class="fas fa-code"></i> How We Built It</h2>
      <div class="tech-stack">
        <span class="pill"><i class="fab fa-react"></i> React</span>
        <span class="pill"><i class="fas fa-bolt"></i> Vite</span>
        <span class="pill"><i class="fab fa-css3"></i> Tailwind CSS</span>
        <span class="pill"><i class="fab fa-node-js"></i> Node.js</span>
        <span class="pill"><i class="fas fa-server"></i> Express</span>
        <span class="pill"><i class="fas fa-database"></i> MongoDB</span>
        <span class="pill"><i class="fas fa-brain"></i> Pathway</span>
        <span class="pill"><i class="fas fa-robot"></i> Fetch.ai Agents</span>
        <span class="pill"><i class="fas fa-chart-bar"></i> D3.js</span>
        <span class="pill"><i class="fas fa-chart-area"></i> Recharts</span>
        <span class="pill"><i class="fas fa-key"></i> JWT</span>
        <span class="pill"><i class="fas fa-cloud"></i> Vercel</span>
      </div>
    </div>
    
    <div class="card" id="challenges">
      <h2><i class="fas fa-mountain"></i> Challenges We Ran Into</h2>
      
      <h3>1. Implementing Pathway Vector Store</h3>
      <ul>
        <li><strong>Efficient Data Processing:</strong> Handling and structuring <span class="highlight">large volumes of unstructured transaction data</span> for real-time processing was challenging.</li>
        <li><strong>Vectorization Complexity:</strong> Converting financial data into meaningful vector representations while ensuring <span class="highlight">fast, accurate retrieval</span> required multiple optimizations.</li>
        <li><strong>Indexing and Query Optimization:</strong> Ensuring <span class="highlight">low-latency</span> search and retrieval from the Pathway vector store for AI-driven financial insights was a key hurdle.</li>
      </ul>
      
      <h3>2. Integrating Fetch.ai Agents</h3>
      <ul>
        <li><strong>Decentralized Agent Communication:</strong> Setting up <span class="highlight">autonomous economic agents</span> to securely process transactions and generate insights required <span class="highlight">deep integration with Fetch.ai's ecosystem</span>.</li>
        <li><strong>Real-Time Data Syncing:</strong> Ensuring that Fetch.ai agents efficiently <span class="highlight">fetch, process, and deliver financial insights</span> without delays.</li>
        <li><strong>Scalability and Reliability:</strong> Making sure the <span class="highlight">multi-agent system</span> could handle increasing transaction loads while maintaining accuracy and efficiency.</li>
      </ul>
    </div>
    
    <div class="section-grid">
      <div class="card" id="accomplishments">
        <h2><i class="fas fa-trophy"></i> Accomplishments</h2>
        <ul>
          <li>Successfully implemented <span class="highlight">real-time transaction analysis</span></li>
          <li>Built an <span class="highlight">AI-powered system that understands user spending habits</span></li>
          <li>Created <span class="highlight">a sleek, intuitive UI</span> for effortless financial tracking</li>
          <li>Overcame <span class="highlight">technical hurdles</span> in integrating AI and data visualization</li>
        </ul>
      </div>
      
      <div class="card" id="lessons">
        <h2><i class="fas fa-graduation-cap"></i> What We Learned</h2>
        <ul>
          <li>The importance of <span class="highlight">efficient data pipelines</span> for real-time finance tracking</li>
          <li>AI-driven insights can make personal finance <span class="highlight">simpler and more accessible</span></li>
          <li><span class="highlight">Optimizing user experience</span> is key to encouraging better financial habits</li>
        </ul>
      </div>
    </div>
    
    <div class="card" id="future">
      <h2><i class="fas fa-road"></i> What's Next for Xpensa</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-plug"></i></div>
          <p><strong>Expanding API integrations</strong> to connect with banks and payment platforms</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-brain"></i></div>
          <p><strong>Enhancing AI models</strong> for more personalized financial advice</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-chart-line"></i></div>
          <p><strong>Adding predictive analytics</strong> to forecast future spending trends</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon"><i class="fas fa-mobile-alt"></i></div>
          <p><strong>Launching a mobile app</strong> for even more accessibility</p>
        </div>
      </div>
    </div>
    
    <div class="card" id="tech">
      <h2><i class="fas fa-tools"></i> Technologies We Used</h2>
      
      <div class="section-grid">
        <div>
          <h3>Frontend</h3>
          <ul>
            <li>React</li>
            <li>Vite</li>
            <li>Tailwind CSS</li>
          </ul>
          
          <h3>Backend</h3>
          <ul>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
          </ul>
        </div>
        
        <div>
          <h3>AI & Data Processing</h3>
          <ul>
            <li>Pathway Vector Store</li>
            <li>Fetch.ai Agents</li>
          </ul>
          
          <h3>APIs & Integrations</h3>
          <ul>
            <li>Custom APIs</li>
            <li>Secure Data Processing</li>
          </ul>
        </div>
        
        <div>
          <h3>Visualization</h3>
          <ul>
            <li>D3.js</li>
            <li>Recharts</li>
          </ul>
          
          <h3>Authentication & Deployment</h3>
          <ul>
            <li>JWT (JSON Web Tokens)</li>
            <li>Vercel</li>
            <li>Cloud Hosting</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <h2 style="justify-content: center;">🚀 Xpensa</h2>
      <p>Track Smarter. Save Better. Live Stress-Free.</p>
    </div>
  </div>
</body>
</html>