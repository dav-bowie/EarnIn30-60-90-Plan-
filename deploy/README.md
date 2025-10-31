# EarnIn 30-60-90 Plan Portfolio

A comprehensive portfolio showcasing David Bui's 30-60-90 strategic plan for EarnIn AI Content Operations, including an interactive timeline, AI-generated video gallery, and automated scoring system integration.

## 🎯 Features

### **30-60-90 Strategic Plan**
- Interactive timeline with List and Gantt chart views
- Phase-by-phase breakdown with detailed task breakdowns
- Critical success factors and dependencies
- Predictive Performance Intelligence System proposal

### **AI Marketing Video Portfolio**
- Clean, professional Netlify-style gallery layout
- Support for multiple AI tools (Sora, Veo3, ChatGPT, Gemini, Other)
- Built-in performance analytics and scoring
- Local Storage persistence
- Upload, analyze, and download functionality

### **Accessibility & HCI Excellence**
- **WCAG 2.1 compliant** design
- Full keyboard navigation support
- Screen reader optimized (ARIA labels throughout)
- Focus management and modal accessibility
- Respects `prefers-reduced-motion` for motion sensitivity

### **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes (480px, 768px, desktop)
- Touch-friendly interactions
- Smooth animations and transitions

## 📁 Project Structure

```
EarnIn/
├── index.html                          # 30-60-90 Plan homepage
├── netlify-portfolio.html              # AI video portfolio
├── viewer-portfolio.html               # Gallery viewer
├── css/
│   └── netlify-style.css              # Complete styling system
├── js/
│   ├── netlify-portfolio.js           # Portfolio functionality
│   └── viewer-portfolio.js            # Gallery viewer
├── videos/                             # AI-generated videos
├── thumbnails/                         # Video thumbnails
├── assets/                             # Additional assets
├── deploy/                             # Deployment package
├── DEPLOYMENT_GUIDE.md                 # Deployment instructions
├── VIDEO_UPLOAD_GUIDE.md              # Video upload guide
├── PRE_DEPLOYMENT_CHECKLIST.md        # Pre-deployment checklist
├── QUICK_START.md                      # Quick start guide
├── N8N_WORKFLOW_INTEGRATION_PROMPT.md # n8n integration docs
├── N8N_PROMPT_SHORT.md                # Short n8n prompt
├── N8N_INTEGRATION_VISUAL.md          # Visual workflow diagram
└── README.md                           # This file
```

## 🚀 Quick Start

### Local Development
1. Open `index.html` in your browser for the 30-60-90 plan
2. Open `netlify-portfolio.html` for the AI video gallery
3. Upload videos using the "Upload Videos" button
4. Toggle between List and Gantt chart views in the timeline

### Netlify Deployment

#### Option 1: Drag & Drop (Easiest)
1. Run `deploy-to-netlify.bat` to create deployment package
2. Go to [Netlify](https://netlify.com)
3. Drag and drop `earnin-portfolio-deploy.zip`

#### Option 2: Git Integration
1. This repository is already connected to GitHub
2. Push changes: `git push origin main`
3. Connect GitHub repo to Netlify for auto-deployment

## 🎬 Video Upload Instructions

1. **Supported Formats**: MP4, WebM, MOV, AVI
2. **Recommended Size**: Under 50MB for optimal loading
3. **Aspect Ratio**: 9:16 (vertical) for mobile-first content
4. **Duration**: 5-15 seconds for marketing content

## 🧠 AI Content Creation Methodology

Based on structured JSON prompt approach:

### 1. Metadata & Variables
- `AD_ID`: Unique tracking identifier
- `MODEL`: VLM specification (Sora, Veo, etc.)
- `TARGET_PLATFORM`: Aspect ratio constraints
- `DURATION_SEC`: Runtime limits
- `A_B_TEST_VARIABLE`: Focus variables

### 2. Cinematography Parameters
- `CAMERA_TYPE`: Digital cinema specifications
- `LENS_SPEC`: 35mm prime lens equivalent
- `DEPTH_OF_FIELD`: Shallow focus control
- `LIGHTING`: Golden hour or studio diffused
- `COLOR_GRADE`: Warm cinematic minimal saturation

### 3. Scene Breakdown
- Three-act structure: Tension → Solution → Resolution
- Time-coded visual descriptions
- Text overlay specifications
- Camera movement (dolly, push-in)

### 4. Audio & CTA
- `VOICEOVER_TEXT`: Brand messaging
- `MUSIC_TRACK`: Uplifting ambient synth
- `SFX`: App tap sounds, cash register chime
- `FINAL_CTA`: Download EarnIn call-to-action

## 🔗 n8n Workflow Integration

The portfolio includes comprehensive documentation for integrating an automated scoring engine with Alex's n8n AI video generation workflow:

- **N8N_WORKFLOW_INTEGRATION_PROMPT.md**: Detailed step-by-step guide
- **N8N_PROMPT_SHORT.md**: Quick implementation prompt
- **N8N_INTEGRATION_VISUAL.md**: Visual workflow diagram

**Key Integration Points:**
1. Brief intake webhook
2. 5 prompt variants generation
3. Parallel video generation across agents
4. Automated scoring engine integration
5. Quality gate (7.5/10 threshold)
6. Brand guardrails validation
7. CMS publish workflow
8. Analytics and ML feedback loop

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: LocalStorage (client-side)
- **Deployment**: Netlify
- **Design**: Modern, accessible, mobile-first
- **Framework**: No dependencies (vanilla JavaScript)

## 📱 Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔧 Customization

### Modifying Colors
Edit CSS variables in `css/netlify-style.css`:
```css
:root {
    --earnin-yellow: #FFC107;
    --earnin-black: #000000;
    --earnin-white: #FFFFFF;
}
```

### Adding New AI Tools
Edit `detectAITool()` function in `js/netlify-portfolio.js`

### Adding New Metrics
Extend the video object structure in JavaScript files

## 📊 30-60-90 Plan Highlights

### Phase 1: Days 0-30
**Focus**: Learn & Ship Small
- Onboard and KPI contract
- Infrastructure and tools
- AI video generation pipeline
- Internal testing and feedback

### Phase 2: Days 31-60
**Focus**: Scale & Standardize
- Production deployment
- Automated scoring system
- Brand guardrails implementation
- Performance dashboard

### Phase 3: Days 61-90
**Focus**: Optimize & Expand
- Model refinement and optimization
- Auto-budget allocation
- Advanced analytics and reporting
- Full team integration

## 🎯 Predictive Performance Intelligence System

An additional value proposition featuring:
- ML model training on historical campaign data
- Real-time performance prediction
- Budget optimization algorithms
- Continuous learning loop

**Projected ROI:**
- 30-40% reduction in wasted ad spend
- $500K+ annual savings
- 2x campaign success rate
- Faster iteration cycles

## 📈 Performance Tips

1. **Optimize Videos**: Compress videos before upload
2. **Use Thumbnails**: Generate video thumbnails for faster loading
3. **Lazy Loading**: Implemented for large galleries
4. **CDN**: Use CDN for video hosting in production

## 🤝 Contributing

This is a portfolio project for EarnIn AI Content Operations position.

## 📄 License

This project is for portfolio demonstration purposes.

## 📞 Support

For questions or issues:
- Check the troubleshooting section in guides
- Review browser console for errors
- Ensure all dependencies are properly loaded

---

**Created by David Bui**  
*AI Marketing Content Intern Candidate*  
[Portfolio Repository](https://github.com/dav-bowie/EarnIn30-60-90-Plan-)
