# AI Market Sensing Backend

FastAPI backend service providing AI-powered market intelligence and business analysis APIs.

## Features

- **REST API**: FastAPI-based REST endpoints
- **Real-time Analysis**: Background job processing with Celery
- **Data Sources**: Integration with multiple public data sources
- **AI Processing**: NLP and machine learning analysis
- **Scalable Architecture**: Microservices-ready design

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Task Queue**: Celery with Redis
- **AI/ML**: OpenAI, LangChain, Transformers
- **Data Processing**: Pandas, NumPy, Scikit-learn
- **Web Scraping**: Scrapy, BeautifulSoup, Requests

## Getting Started

### Prerequisites

- Python 3.11+
- PostgreSQL
- Redis
- pip or poetry

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-market-sensing/backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy environment variables:
```bash
cp .env.example .env
```

5. Update the environment variables in `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost/ai_market_sensing
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your-openai-api-key
NEWS_API_KEY=your-news-api-key
```

6. Run database migrations:
```bash
alembic upgrade head
```

7. Start the development server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

8. API documentation available at [http://localhost:8000/docs](http://localhost:8000/docs)

## API Endpoints

### Health Check
- `GET /health` - Service health status

### Analysis
- `POST /analyze/{service_type}` - Submit analysis request
- `GET /analysis/{analysis_id}` - Get analysis status
- `GET /analysis/{analysis_id}/results` - Get analysis results

### Service Types
- `vendor-selection` - Vendor analysis and recommendations
- `market-research` - Market insights and trends
- `competitor-analysis` - Competitor tracking and analysis
- `build-vs-buy` - Build vs buy recommendations
- `rfp-intelligence` - RFP analysis and insights

## Project Structure

```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── alembic/            # Database migrations
├── app/                # Application modules
│   ├── api/            # API routes
│   ├── core/           # Core functionality
│   ├── db/             # Database models
│   ├── services/       # Business logic
│   └── workers/        # Background tasks
├── tests/              # Test suite
└── scripts/            # Utility scripts
```

## Development

### Running Tests
```bash
pytest
```

### Database Migrations
```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head
```

### Background Workers
```bash
# Start Celery worker
celery -A app.workers.celery_app worker --loglevel=info

# Start Celery beat (scheduler)
celery -A app.workers.celery_app beat --loglevel=info
```

## Data Sources

### News & Media
- NewsAPI for real-time news
- RSS feeds from industry publications
- Social media APIs (Twitter, Reddit)

### Business Data
- Job posting APIs (Indeed, LinkedIn)
- Patent databases (USPTO)
- Company filings (SEC)
- Pricing pages and e-commerce

### Compliance
- Respect robots.txt
- Rate limiting
- Data retention policies
- Privacy compliance

## AI/ML Pipeline

### Data Processing
1. **Collection**: Gather data from various sources
2. **Cleaning**: Normalize and validate data
3. **Analysis**: Apply NLP and ML models
4. **Insights**: Generate actionable recommendations

### Models Used
- **Sentiment Analysis**: Customer opinion analysis
- **Named Entity Recognition**: Extract companies, products
- **Trend Detection**: Identify market patterns
- **Classification**: Categorize opportunities and risks

## Deployment

### Docker
```bash
# Build image
docker build -t ai-market-sensing-backend .

# Run container
docker run -p 8000:8000 ai-market-sensing-backend
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `NEWS_API_KEY` | NewsAPI key | No |
| `SECRET_KEY` | Application secret key | Yes |

## License

This project is proprietary and confidential.
