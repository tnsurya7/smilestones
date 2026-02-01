# Vercel Deployment Guide for Smilestones

## Quick Deploy Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com)
2. **Sign in/Sign up**: Use your GitHub account
3. **Import Project**: Click "New Project" → "Import Git Repository"
4. **Select Repository**: Choose `tnsurya7/smilestones`
5. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)
6. **Deploy**: Click "Deploy" button

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd smilestones-website
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: smilestones
# - Directory: ./
# - Override settings? N
```

## Environment Variables (if needed)

If you need to add environment variables later:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add any required variables

## Custom Domain Setup

1. **In Vercel Dashboard**: Go to your project → Settings → Domains
2. **Add Domain**: Enter your custom domain (e.g., `smilestones.com`)
3. **Configure DNS**: Update your domain's DNS settings as instructed by Vercel

## Build Configuration

The project is already configured with:
- ✅ Next.js 16 with App Router
- ✅ TypeScript support
- ✅ Tailwind CSS
- ✅ Automatic optimization
- ✅ SEO-ready pages
- ✅ Responsive design
- ✅ Security headers

## Expected Build Time
- **First deployment**: ~2-3 minutes
- **Subsequent deployments**: ~1-2 minutes

## Post-Deployment Checklist

After successful deployment:

1. ✅ **Test all pages**: Home, About, Services, Programs, Milestones, Team, Contact
2. ✅ **Check mobile responsiveness**
3. ✅ **Test contact form**
4. ✅ **Verify floating buttons work**
5. ✅ **Test navigation links**
6. ✅ **Check logo displays correctly**

## Troubleshooting

### Common Issues:

1. **Build fails**: Check the build logs in Vercel dashboard
2. **Images not loading**: Ensure images are in the `public` folder
3. **404 errors**: Check file paths and routing

### Support:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)

---

## Live URL
After deployment, your site will be available at:
- **Vercel URL**: `https://smilestones-[random].vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

🚀 **Ready to deploy!**