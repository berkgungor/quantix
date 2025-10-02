from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import datetime
import uuid

app = FastAPI(
    title="AI Market Sensing API",
    description="Backend API for AI-powered market intelligence",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class AnalysisRequest(BaseModel):
    service_type: str
    company_name: Optional[str] = None
    industry: Optional[str] = None
    technology: Optional[str] = None
    keywords: Optional[List[str]] = None
    additional_params: Optional[Dict[str, Any]] = None

class AnalysisResponse(BaseModel):
    id: str
    status: str
    results: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    created_at: str
    completed_at: Optional[str] = None

# In-memory storage for demo (replace with database in production)
analyses_db = {}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.post("/analyze/{service_type}", response_model=AnalysisResponse)
async def submit_analysis(service_type: str, request: AnalysisRequest):
    """Submit analysis request"""
    
    # Validate service type
    valid_services = [
        "vendor-selection", 
        "market-research", 
        "competitor-analysis", 
        "build-vs-buy", 
        "rfp-intelligence"
    ]
    
    if service_type not in valid_services:
        raise HTTPException(status_code=400, detail="Invalid service type")
    
    # Create analysis entry
    analysis_id = str(uuid.uuid4())
    analysis = AnalysisResponse(
        id=analysis_id,
        status="processing",
        created_at=datetime.datetime.now().isoformat()
    )
    
    # Store in database
    analyses_db[analysis_id] = analysis
    
    # Simulate processing (in real app, this would trigger background job)
    # For demo, immediately return mock results
    mock_results = generate_mock_results(service_type, request)
    analysis.status = "completed"
    analysis.results = mock_results
    analysis.completed_at = datetime.datetime.now().isoformat()
    
    return analysis

@app.get("/analysis/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis_status(analysis_id: str):
    """Get analysis status and results"""
    
    if analysis_id not in analyses_db:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return analyses_db[analysis_id]

@app.get("/analysis/{analysis_id}/results")
async def get_analysis_results(analysis_id: str):
    """Get analysis results only"""
    
    if analysis_id not in analyses_db:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    analysis = analyses_db[analysis_id]
    
    if analysis.status != "completed":
        raise HTTPException(status_code=202, detail="Analysis still processing")
    
    return analysis.results

def generate_mock_results(service_type: str, request: AnalysisRequest) -> Dict[str, Any]:
    """Generate mock results for demo purposes"""
    
    base_results = {
        "analysis_id": str(uuid.uuid4()),
        "service_type": service_type,
        "timestamp": datetime.datetime.now().isoformat(),
        "input_parameters": request.dict()
    }
    
    if service_type == "vendor-selection":
        base_results.update({
            "vendors": [
                {
                    "name": "TechCorp Solutions",
                    "score": 95,
                    "price_range": "$100K-$150K",
                    "strengths": ["Industry leader", "Great support", "Scalable"],
                    "weaknesses": ["Higher cost", "Complex setup"]
                },
                {
                    "name": "InnovateNow",
                    "score": 88,
                    "price_range": "$80K-$120K",
                    "strengths": ["Cost effective", "Easy integration", "Good features"],
                    "weaknesses": ["Smaller company", "Limited enterprise features"]
                }
            ],
            "recommendation": "TechCorp Solutions based on requirements and budget"
        })
    
    elif service_type == "market-research":
        base_results.update({
            "market_size": "$2.4B",
            "growth_rate": "12.5% CAGR",
            "key_trends": [
                "Increasing adoption of AI",
                "Remote work driving demand",
                "Sustainability focus"
            ],
            "sentiment_analysis": {
                "positive": 65,
                "neutral": 25,
                "negative": 10
            }
        })
    
    elif service_type == "competitor-analysis":
        base_results.update({
            "competitors": [
                {
                    "name": request.company_name or "CompetitorA",
                    "hiring_trend": "+45%",
                    "recent_moves": ["Acquired StartupXYZ", "Launched new product line"],
                    "patent_filings": 12
                }
            ],
            "market_position": "Strong growth trajectory",
            "threat_level": "Medium"
        })
    
    elif service_type == "build-vs-buy":
        base_results.update({
            "recommendation": "Hybrid approach",
            "build_costs": {
                "development": "$200K",
                "timeline": "8-12 months",
                "risk": "Medium"
            },
            "buy_costs": {
                "licensing": "$150K/year",
                "implementation": "2-3 months",
                "risk": "Low"
            },
            "hybrid_approach": {
                "core_buy": "Use existing platform for 80% of needs",
                "custom_build": "Build specific integrations and customizations",
                "total_cost": "$300K first year",
                "timeline": "4-6 months"
            }
        })
    
    elif service_type == "rfp-intelligence":
        base_results.update({
            "opportunity_score": 78,
            "win_probability": "65%",
            "key_requirements": [
                "Must have enterprise security",
                "24/7 support required",
                "Integration with existing systems"
            ],
            "competitive_analysis": [
                {"competitor": "BigCorp", "strengths": ["Market leader"], "weaknesses": ["Higher cost"]},
                {"competitor": "StartupInc", "strengths": ["Innovative"], "weaknesses": ["Limited track record"]}
            ],
            "recommendations": [
                "Emphasize your security credentials",
                "Highlight cost-effectiveness",
                "Showcase similar implementations"
            ]
        })
    
    return base_results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
