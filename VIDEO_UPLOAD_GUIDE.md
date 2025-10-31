# Video Upload Guide for EarnIn Portfolio

## Quick Start: How to Upload Videos

### Step 1: Access the Portfolio Page
1. Open `netlify-portfolio.html` in your browser
2. You'll see the "Upload Videos" button in the header

### Step 2: Upload Your Videos
1. Click the **"Upload Videos"** button
2. Select one or more video files from your computer
3. Videos are automatically processed and displayed in the gallery

### Step 3: Video Organization
- Videos are automatically categorized by AI tool based on their filename or folder
- Supported patterns: `sora`, `veo3`, `chatgpt`, `gemini`
- Videos not matching any pattern will be labeled as "Other"

### Step 4: View Your Portfolio
- Videos are stored in your browser's localStorage
- They'll persist across sessions on the same browser/device
- Click on any video to watch it fullscreen
- Use the search and filter options to find specific videos

## Important Notes for Deployment

### For Netlify/GitHub Pages Deployment

**Current Setup:**
- Videos are stored in browser localStorage (client-side only)
- Best for: Demonstration, portfolios, single-user scenarios

**For Production/Team Use:**
You have two options:

#### Option 1: Manual Upload (Current Method)
- User uploads videos through the browser interface
- Videos stored in each user's browser
- Pros: No server costs, instant setup
- Cons: Not shared across devices/users

#### Option 2: Host Videos on CDN (Recommended for Team)
If you want videos accessible to everyone:
1. Upload videos to a CDN or cloud storage (AWS S3, Cloudinary, etc.)
2. Update the video URLs in your portfolio
3. Store just metadata (URLs, titles, metadata) in localStorage or a database

### Video File Recommendations

**Supported Formats:**
- MP4 (H.264) - **Recommended**
- WebM
- MOV

**File Size:**
- Recommended: Under 50MB per video
- Maximum: 100MB (browser dependent)

**Aspect Ratios:**
- 9:16 for TikTok, Instagram Reels, YouTube Shorts
- 16:9 for YouTube, CTV, Display Ads
- 1:1 for Instagram Feed

## Current Features

✅ **Upload multiple videos at once**
✅ **Automatic AI tool detection from filename**
✅ **Search and filter videos**
✅ **Performance analytics dashboard**
✅ **Video analysis and scoring**
✅ **Export/import portfolio data**
✅ **Responsive design**

## Quick Reference

### Upload Button
- Location: Top right of `netlify-portfolio.html`
- Function: Opens file picker to select videos

### Gallery View
- Location: Below the hero section
- Features: Search, filter, view all videos
- Click any video to play fullscreen

### Navigation
- **Process**: See the AI content creation workflow
- **Gallery**: Browse all uploaded videos
- **Methodology**: JSON prompt methodology
- **About**: Technology stack info

## Troubleshooting

### Videos won't upload
- Check file format (must be video file)
- Check file size (try under 50MB)
- Try refreshing the page

### Videos won't play
- Check browser supports the video codec
- Try a different video format (MP4 recommended)

### Videos disappear after refresh
- Clear browser cache and localStorage
- Re-upload videos

### Need to share portfolio with others
Currently videos are stored locally. For sharing:
1. Export the portfolio data (export button)
2. Recipients will need to re-upload their own videos
3. OR implement server-side storage

## For Developers

### File Structure
```
videos/
├── Sora/        # Sora-generated videos
├── Veo3/        # Veo3-generated videos
├── ChatGPT/     # ChatGPT-generated videos
├── Gemini/      # Gemini-generated videos
└── Other/       # Other AI tools
```

### localStorage Key
- `earnin-portfolio-videos`: Contains all video metadata and base64 data

### Adding New AI Tools
Edit `detectAITool()` function in `js/netlify-portfolio.js`

## Questions?

For technical issues or feature requests, refer to the main README or contact the development team.

