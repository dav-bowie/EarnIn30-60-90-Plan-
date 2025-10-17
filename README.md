# EarnIn AI Marketing Portfolio

A professional portfolio showcasing AI-generated marketing content with a Netlify-style interface and structured JSON prompt methodology.

## 🎯 Features

- **Netlify-Style Gallery**: Clean, professional video gallery layout
- **JSON Prompt Methodology**: Structured approach to AI content creation
- **Multiple AI Tools**: Support for Sora, Veo3, ChatGPT, Gemini, Other
- **Performance Analytics**: Built-in video analysis and scoring
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Local Storage**: Videos persist in browser session
- **Export Functionality**: Download portfolio data

## 📁 Project Structure

```
EarnIn/
├── netlify-portfolio.html    # Main portfolio page
├── css/
│   └── netlify-style.css     # Netlify-style CSS
├── js/
│   └── netlify-portfolio.js  # Portfolio functionality
├── videos/                   # Video files (for local development)
├── thumbnails/              # Video thumbnails
├── assets/                  # Additional assets
└── README.md               # This file
```

## 🚀 Quick Start

### Local Development
1. Open `netlify-portfolio.html` in your browser
2. Click "Upload Videos" to add your AI-generated content
3. Videos will be displayed in a Netlify-style gallery

### Netlify Deployment

#### Option 1: Drag & Drop (Easiest)
1. Zip the entire `EarnIn` folder
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the zip file to deploy

#### Option 2: Git Integration
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will auto-deploy on every push

#### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

## 🎬 Video Upload Instructions

1. **Supported Formats**: MP4, WebM, MOV, AVI
2. **Recommended Size**: Under 50MB for optimal loading
3. **Aspect Ratio**: 9:16 (vertical) for mobile-first content
4. **Duration**: 5-15 seconds for marketing content

## 📊 JSON Prompt Methodology

Based on the structured approach documented in the [Google Sheet](https://docs.google.com/spreadsheets/d/1VThE5mDLFk_kAwmz9OirAHjWTs5fRxTaNzQUWHF36s8/edit?usp=sharing):

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

## 🛠️ Customization

### Adding New AI Tools
Edit `detectAITool()` function in `js/netlify-portfolio.js`:

```javascript
function detectAITool(filename) {
    const name = filename.toLowerCase();
    if (name.includes('your-new-tool')) return 'Your New Tool';
    // ... existing code
}
```

### Modifying Styling
Edit `css/netlify-style.css` to customize:
- Colors (CSS variables in `:root`)
- Layout (grid system)
- Typography (Inter font family)
- Animations and transitions

### Adding New Metrics
Extend the video object structure in `js/netlify-portfolio.js`:

```javascript
const video = {
    // ... existing properties
    customMetrics: {
        creativity: 0,
        innovation: 0
    }
};
```

## 📱 Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔧 Troubleshooting

### Videos Not Playing
- Ensure videos are in supported formats (MP4 recommended)
- Check file size (under 50MB recommended)
- Verify browser supports the video codec

### Upload Issues
- Check browser console for errors (F12)
- Ensure sufficient disk space
- Try refreshing the page

### Netlify Deployment Issues
- Ensure all files are in the root directory
- Check for any server-side dependencies
- Verify file paths are relative

## 📈 Performance Tips

1. **Optimize Videos**: Compress videos before upload
2. **Use Thumbnails**: Generate video thumbnails for faster loading
3. **Lazy Loading**: Implement lazy loading for large galleries
4. **CDN**: Use a CDN for video hosting in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for portfolio demonstration purposes.

## 📞 Support

For questions or issues:
- Check the troubleshooting section
- Review browser console for errors
- Ensure all dependencies are properly loaded

---

**Created by David Bui**  
*AI Marketing Content Intern Candidate*
