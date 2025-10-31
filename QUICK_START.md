# 🚀 Quick Start Guide - EarnIn Portfolio

## What You Have

A complete portfolio showcasing:
- **30-60-90 Plan**: Interactive roadmap for AI content factory
- **AI Content Portfolio**: Video gallery with automated scoring
- **Predictive Performance Intelligence**: ML-powered campaign optimization

## Upload Your Videos (2 Minutes)

### Step 1: Open Portfolio
Open `netlify-portfolio.html` in your browser

### Step 2: Upload Videos
1. Click **"Upload Videos"** button (top right)
2. Select your video files
3. Videos automatically appear in gallery

### Step 3: Done!
Videos are now in your portfolio. They stay in your browser's storage.

## Deploy to Netlify (5 Minutes)

### Option 1: Drag & Drop (Easiest)
1. Double-click `deploy-to-netlify.bat` to create deployment package
2. Go to https://netlify.com/drop
3. Drag `earnin-portfolio-deploy.zip` onto the page
4. Your site is live! 🎉

### Option 2: Git Integration
```bash
git init
git add .
git commit -m "Deploy EarnIn portfolio"
git remote add origin YOUR_REPO_URL
git push -u origin main
# Connect repo to Netlify
```

### Option 3: Netlify CLI
```bash
netlify deploy --prod --dir .
```

## Share with EarnIn

Send them:
1. ✉️ **Live URL** (e.g., `https://your-name.netlify.app`)
2. 📸 **Screenshots** of your videos in the portfolio
3. 📝 **Brief note**: "I've built a complete AI content portfolio with automated scoring and a 30-60-90 plan. You can upload your own videos when viewing."

## Key Pages

- **Home**: `https://your-site.netlify.app` (30-60-90 Plan)
- **Portfolio**: `https://your-site.netlify.app/portfolio` (Upload/View videos)
- **Gallery**: `https://your-site.netlify.app/gallery` (Video gallery)

## Important Notes

### Video Storage
- Videos stored in **browser localStorage** (client-side)
- Each person uploads their own videos
- **No server costs**, instant setup
- Perfect for demo/portfolio purposes

### For Production/Team Use
To share videos across team members, you'll need to:
1. Host videos on CDN (AWS S3, Cloudinary, etc.)
2. Update video URLs in portfolio
3. Implement backend storage

See `VIDEO_UPLOAD_GUIDE.md` for details.

## File Structure

```
EarnIn/
├── index.html              # 🎯 30-60-90 Plan (HOME PAGE)
├── netlify-portfolio.html  # 📹 AI Content Portfolio
├── viewer-portfolio.html   # 🖼️ Video Gallery
├── js/                     # JavaScript files
├── css/                    # Stylesheets
├── videos/                 # Video folders (organize by AI tool)
└── deploy/                 # Deployment package
```

## Troubleshooting

**Videos won't upload?**
- Check file size (< 50MB recommended)
- Use MP4 format
- Try refreshing page

**Site shows blank?**
- Check browser console (F12)
- Verify all files copied to deploy folder
- Ensure paths are relative (not absolute)

**Videos disappear after refresh?**
- Videos are stored per browser
- You need to re-upload in each browser
- This is expected behavior

## Next Steps

1. ✅ Upload your best AI-generated videos
2. ✅ Deploy to Netlify
3. ✅ Test all functionality
4. ✅ Share URL with EarnIn team
5. ✅ Prepare your pitch

## Questions?

Check these files:
- `VIDEO_UPLOAD_GUIDE.md` - Upload process
- `PRE_DEPLOYMENT_CHECKLIST.md` - Deployment verification
- `README.md` - General information
- `DEPLOYMENT_GUIDE.md` - Full deployment details

---

**Ready?** Let's get this deployed! 🚀

Run `deploy-to-netlify.bat` and you're 3 clicks away from a live portfolio!

