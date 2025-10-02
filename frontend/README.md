# AI Market Sensing Frontend

A modern, responsive Next.js application for AI-powered market intelligence and business analysis.

## Features

- **Vendor Selection**: AI-powered vendor analysis and recommendations
- **Market Research**: Real-time market insights and trend analysis
- **Competitor Analysis**: Track competitor moves and strategic changes
- **Build vs Buy Analysis**: Make informed build vs buy decisions
- **RFP Intelligence**: Analyze RFPs for opportunities and risks

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-market-sensing/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Copy environment variables:
```bash
cp .env.local.example .env.local
```

4. Update the environment variables in `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── services/         # Service pages
│       ├── vendor-selection/
│       ├── market-research/
│       ├── competitor-analysis/
│       ├── build-vs-buy/
│       └── rfp-intelligence/
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── AnalysisForm.tsx  # Analysis form component
│   ├── Dashboard.tsx     # Results dashboard
│   └── Navigation.tsx    # Main navigation
├── lib/                  # Utility functions
│   ├── api.ts           # API client
│   └── utils.ts         # Helper utilities
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Features

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

### Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Accessibility-focused components

### Data Visualization
- Interactive charts and graphs
- Real-time data updates
- Export capabilities

### Performance
- Server-side rendering
- Optimized images and assets
- Code splitting and lazy loading

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | NextAuth.js URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret | Yes |
| `NEXT_PUBLIC_BACKEND_API_URL` | Backend API URL | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is proprietary and confidential.
