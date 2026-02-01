# Smilestones Website Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)
Vercel is the easiest way to deploy Next.js applications.

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Custom Domain** (Optional):
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain (e.g., smilestones.com)

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repository

### Option 3: Traditional Hosting

1. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

2. **Server Requirements**:
   - Node.js 18+
   - PM2 or similar process manager
   - Nginx (optional, for reverse proxy)

## 🔧 Environment Configuration

### Environment Variables
Create a `.env.local` file for production:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://smilestones.com
NEXT_PUBLIC_CONTACT_EMAIL=info@smilestones.com
NEXT_PUBLIC_PHONE=+919876543210

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Form Handling (Optional)
FORM_ENDPOINT=https://your-form-handler.com/submit
```

### Google Analytics Setup
1. Create a Google Analytics account
2. Get your GA4 Measurement ID
3. Add it to your environment variables
4. Update the layout.tsx to include the GA script

## 📱 Performance Optimization

### Image Optimization
- Add your images to the `public` folder
- Use Next.js Image component for automatic optimization
- Consider using a CDN for better performance

### Font Optimization
- The website uses Google Fonts (Inter)
- Fonts are automatically optimized by Next.js

### SEO Optimization
- ✅ Meta tags configured
- ✅ OpenGraph tags for social sharing
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml generated
- ✅ Robots.txt configured

## 🔍 Google Search Console Setup

1. **Verify Ownership**:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your domain
   - Verify using HTML tag method

2. **Submit Sitemap**:
   - In Search Console, go to "Sitemaps"
   - Submit: `https://yourdomain.com/sitemap.xml`

3. **Monitor Performance**:
   - Check indexing status
   - Monitor search performance
   - Fix any crawl errors

## 📊 Analytics & Monitoring

### Google Analytics 4
Add this to your `layout.tsx` head section:

```tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `,
      }}
    />
  </>
)}
```

### Performance Monitoring
- Use Vercel Analytics (if deployed on Vercel)
- Monitor Core Web Vitals
- Set up error tracking (Sentry, LogRocket, etc.)

## 🔒 Security Considerations

### HTTPS
- Ensure SSL certificate is properly configured
- Use HTTPS for all external resources

### Content Security Policy
Add CSP headers for enhanced security:

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;"
          }
        ]
      }
    ]
  }
}
```

## 📧 Contact Form Setup

The contact form is currently set up with client-side validation. For production:

### Option 1: Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update the form action in `ContactForm.tsx`

### Option 2: Netlify Forms
1. Add `netlify` attribute to the form
2. Add hidden input: `<input type="hidden" name="form-name" value="contact" />`

### Option 3: Custom API Route
Create `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Process form data
  // Send email using nodemailer, SendGrid, etc.
  
  return NextResponse.json({ success: true });
}
```

## 🎨 Customization Guide

### Colors
Update colors in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    yellow: "#FFD43B",
    red: "#FF4D4D", 
    green: "#6BCF9B",
    blue: "#4DA6FF",
  }
}
```

### Content Updates
- Update service information in `src/components/sections/Services.tsx`
- Modify team information in the respective components
- Update contact information in multiple files

### Adding New Pages
1. Create folder in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `Header.tsx`
4. Add to sitemap in `src/app/sitemap.ts`

## 🔧 Maintenance

### Regular Updates
- Keep dependencies updated: `npm update`
- Monitor security vulnerabilities: `npm audit`
- Update content regularly

### Backup Strategy
- Regular database backups (if using)
- Code repository backups
- Media files backup

### Performance Monitoring
- Monitor page load speeds
- Check mobile performance
- Monitor Core Web Vitals

## 📞 Support

For technical support or customization requests:
- Check the documentation
- Review the code comments
- Contact the development team

---

**🎉 Your Smilestones website is ready for deployment!**

The website includes:
- ✅ Modern, responsive design
- ✅ SEO optimization
- ✅ Performance optimization
- ✅ Accessibility features
- ✅ Contact forms
- ✅ Social media integration
- ✅ Google Analytics ready
- ✅ Mobile-first approach