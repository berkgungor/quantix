# AI Market Sensing - Complete Application

A full-stack AI-powered market intelligence platform that automates vendor selection, market research, competitor analysis, and business decision-making through real-time data analysis.

## 🚀 Features

### Core Services
- **Vendor Selection**: AI-powered vendor analysis and recommendations
- **Market Research**: Real-time market insights and trend analysis  
- **Competitor Analysis**: Track competitor moves and strategic changes
- **Build vs Buy Analysis**: Make informed build vs buy decisions
- **RFP Intelligence**: Analyze RFPs for opportunities and risks

### Technical Highlights
- Modern, responsive web application
- Real-time data processing and analysis
- Interactive dashboards and visualizations
- Scalable microservices architecture
- AI/ML-powered insights generation

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  Data Sources   │
│   (Next.js)     │────│   (FastAPI)     │────│  (APIs/Web)     │
│                 │    │                 │    │                 │
│ • React/TypeScript  │    │ • Python/FastAPI   │    │ • News APIs         │
│ • Tailwind CSS     │    │ • PostgreSQL       │    │ • Job Boards        │
│ • Recharts         │    │ • Redis/Celery     │    │ • Patent DBs        │
│ • Responsive UI    │    │ • AI/ML Models     │    │ • Social Media      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Custom components with Radix UI
- **Charts**: Recharts
- **HTTP**: Axios

### Backend  
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL + SQLAlchemy
- **Cache/Queue**: Redis + Celery
- **AI/ML**: OpenAI, LangChain, Transformers
- **Data**: Pandas, NumPy, Scikit-learn

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL
- Redis

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-market-sensing
```

2. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your configuration
npm run dev
```

3. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
uvicorn main:app --reload
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📱 Screenshots & Demo

### Landing Page
Modern, professional landing page with service overview and clear call-to-actions.

### Service Pages
Individual pages for each analysis service with intuitive forms and real-time processing.

### Dashboard Results
Interactive dashboards with charts, metrics, and actionable insights.

### Mobile Responsive
Fully responsive design optimized for all devices and screen sizes.

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linting
npm run test         # Run tests
```

### Backend Development
```bash
cd backend
uvicorn main:app --reload    # Start development server
pytest                       # Run tests
alembic upgrade head         # Apply database migrations
```

## 🌐 Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
vercel deploy

# Environment variables to set:
# - NEXTAUTH_URL
# - NEXTAUTH_SECRET  
# - NEXT_PUBLIC_BACKEND_API_URL
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
# Using Docker
docker build -t ai-market-sensing-backend .
docker run -p 8000:8000 ai-market-sensing-backend

# Environment variables to set:
# - DATABASE_URL
# - REDIS_URL
# - OPENAI_API_KEY
# - SECRET_KEY
```

## 📊 Data Sources

The application ethically gathers insights from public data sources:

- **News & Media**: Real-time news feeds, press releases
- **Job Markets**: Hiring trends, role changes
- **Patents**: USPTO filings, intellectual property
- **Business**: Company filings, pricing pages
- **Social**: Reddit, forums, product discussions

*All data collection respects robots.txt, implements rate limiting, and follows privacy guidelines.*

## 🤖 AI/ML Pipeline

1. **Data Collection**: Automated gathering from multiple sources
2. **Processing**: Clean, normalize, and validate data
3. **Analysis**: Apply NLP models for sentiment, entity extraction
4. **Insights**: Generate actionable business recommendations
5. **Visualization**: Present results in interactive dashboards

## 🔒 Security & Compliance

- JWT-based authentication
- Environment variable configuration
- Rate limiting and input validation
- CORS and security headers
- Data privacy compliance
- Ethical data collection practices

## 📈 Business Value

### Time Savings
- Automate hours of manual research into minutes
- Real-time insights vs delayed reports
- Standardized analysis across teams

### Cost Reduction  
- Eliminate expensive consultants
- Reduce research subscription costs
- Improve decision accuracy

### Competitive Advantage
- Real-time competitor monitoring
- Market opportunity identification
- Data-driven decision making

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📝 License

This project is proprietary and confidential.

## 📞 Support

For questions and support, please contact the development team.

---

*Built with ❤️ for modern businesses seeking AI-powered market intelligence*
