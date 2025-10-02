# agent.md: Prompt Template for Building AI-First Market Sensing App

## Overview
This file contains a detailed prompt template for a coding agent to build a full-stack application based on the AI-First Market Sensing business idea. The app automates market research, competitor analysis, and related services using AI-driven data scanning from public sources.

Feed this prompt into a coding agent (e.g., AI code generator) to produce the complete codebase. The agent should output structured code files, including setup instructions, dependencies, and deployment notes.

## Architecture
- **Frontend**: Next.js (TypeScript) for a responsive, modern UI with routing and dashboards.
- **Backend**: FastAPI (Python) for data fetching, AI analysis, and API endpoints.
- **Why this stack?** Next.js handles client-side interactivity and SEO-friendly pages. FastAPI excels in async API development and integrates seamlessly with Python AI libraries for real-time data processing. Communication via REST APIs (e.g., frontend calls backend endpoints for analysis results).
- **Additional Tools**:
  - UI: Tailwind CSS for styling, Recharts or Chart.js for dashboards.
  - Data Handling: SQLAlchemy + PostgreSQL for storing/caching results; Celery + Redis for background tasks (e.g., data scanning).
  - AI/Analysis: Integrate Hugging Face Transformers or OpenAI API for NLP-based insights (e.g., sentiment analysis on news/social data).
  - Data Sources: Use ethical scraping (respect robots.txt) with libraries like Scrapy, Requests, or APIs (e.g., NewsAPI, USPTO API, LinkedIn/Indeed scraping via official APIs where possible).
- **Deployment**: Docker for containerization; Vercel for frontend, Heroku/DigitalOcean for backend.

## Advanced Prompt for Coding Agent

You are an expert full-stack developer tasked with building a complete, production-ready application for the "AI-First Market Sensing" business idea. Analyze the requirements below and generate the full codebase, including all necessary files, configurations, and documentation. Ensure the app is secure, scalable, and follows best practices (e.g., error handling, logging, environment variables for API keys).

### Business Requirements
- **Problem Solved**: Automate vendor selection, market research, and competitor analysis to save time/money by scanning public data sources in real-time and generating AI-powered reports/dashboards.
- **App Structure**:
  - **Welcome Page**: A landing page with an overview of the app, login/signup (use JWT for auth), and a top navigation bar.
  - **Top Navigation Bar**: Buttons for main services: "Vendor Selection", "Market Research", "Competitor Analysis", "Build vs Buy vs Hybrid", "RFP Intelligence System". Clicking a button routes to the service's dedicated page.
  - **Service Pages**: Each page includes:
    - A text input form (e.g., fields for company name, industry, technology, keywords).
    - On submit, fetch data from backend, perform AI analysis, and display results in a beautiful, modern dashboard (e.g., cards with metrics, charts for trends, tables for comparisons).
    - Examples of Outputs:
      - Vendor Selection: List top vendors with pros/cons, pricing trends.
      - Market Research: Industry trends, customer sentiment from social/forums.
      - Competitor Analysis: Specific company insights (e.g., hiring surges, patent filings).
      - Build vs Buy vs Hybrid: Recommendations based on cost/risk analysis.
      - RFP Intelligence: Analyze RFPs for opportunities/risks.
  - **Dashboards**: Use responsive, interactive components (e.g., line charts for price changes, heatmaps for competitor moves, sentiment gauges from social data).
- **Data Sources (Integrate via Backend)**:
  - Public news & press releases (e.g., NewsAPI for real-time feeds).
  - Job postings & role changes (e.g., Indeed/LinkedIn API or ethical scraping).
  - Patent & trademark filings (e.g., USPTO API).
  - Supplier & procurement platforms (e.g., public feeds or APIs).
  - Pricing pages & e-commerce feeds (e.g., monitor via web scraping).
  - Social/Reddit/niche forums/Product Hunt (e.g., Reddit API, web scraping for sentiment).
  - Ensure ethical practices: Rate limiting, caching to avoid overload, no private data access.
- **AI Analysis**: Use NLP models to derive insights (e.g., predict product launches from hiring data, detect regulation risks from news).

### Technical Specifications
- **Frontend (Next.js with TypeScript)**:
  - Use app router for pages: `/` (welcome), `/services/vendor-selection`, etc.
  - State management: React Context or Redux for user inputs/results.
  - UI Library: Tailwind CSS for styling; Shadcn/UI or Ant Design for components.
  - API Calls: Use Axios or Fetch to call backend endpoints (e.g., POST /analyze with input data).
  - Authentication: Implement user sessions with NextAuth.js.
  - Responsiveness: Mobile-friendly dashboards.
- **Backend (FastAPI with Python)**:
  - Endpoints: e.g., GET /health, POST /analyze/{service_type} (takes JSON input, returns analyzed data).
  - Data Fetching: Async functions for scraping/APIs; cache results in database.
  - AI Integration: Use libraries like LangChain or Hugging Face to process data (e.g., summarize news, classify trends).
  - Database: PostgreSQL for storing user queries/results; use SQLAlchemy ORM.
  - Background Tasks: Celery for non-blocking scans.
  - Security: API keys for external services, CORS for frontend access, input validation.
- **Full Stack Integration**:
  - Frontend proxies requests to backend (or use API routes in Next.js if needed).
  - Error Handling: Graceful failures (e.g., "Data source unavailable") with retries.
  - Performance: Optimize for real-time (e.g., WebSockets for live updates if advanced).
- **Best Practices**:
  - Code Modularity: Separate concerns (e.g., utils/scrapers, components/dashboards).
  - Testing: Include unit tests (Jest for frontend, Pytest for backend).
  - Environment: Use .env files for secrets (e.g., API keys).
  - Scalability: Design for cloud deployment; add rate limiting.
  - Edge Cases: Handle invalid inputs, no data found, API rate limits.
  - Documentation: Generate README.md with setup/run instructions.

### Output Format for Coding Agent
- Generate a ZIP-like structure of files (e.g., frontend/ directory with pages/, components/; backend/ with main.py, models/, routers/).
- Include package.json (frontend), requirements.txt (backend), and a setup script.
- Provide step-by-step installation/deployment guide.
- Ensure all code is TypeScript/Python, commented, and error-free.

Build the entire app based on this prompt. Start coding now!