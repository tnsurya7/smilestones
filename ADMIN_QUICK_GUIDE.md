# Admin Panel - Quick User Guide

## 🚀 Getting Started

### Step 1: Login
1. Navigate to: `http://localhost:3000/admin/login`
2. Enter credentials:
   - **Username:** `smilestones`
   - **Password:** `child@777`
3. Click "Sign In"

### Step 2: Dashboard Overview
After login, you'll see:
- **Total Children** - Number of registered children
- **Active Doctors** - Number of doctors in system
- **Sessions Today** - Today's therapy sessions
- **Total Sessions** - All recorded sessions

## 📋 Common Tasks

### Adding a New Doctor
1. Click "Manage Doctors" from dashboard
2. Click "Add New Doctor" button
3. Fill in:
   - Name
   - Email
   - Username
   - Password
   - Role (Super Admin or Sub Doctor)
4. Click "Add Doctor"

### Adding a New Child
1. Click "Manage Children" from dashboard
2. Click "Add New Child" button
3. Fill in:
   - Child's name
   - Age
   - Diagnosis
   - Parent/Guardian name
   - Phone number
   - Assign to a doctor (optional)
4. Click "Add Child"

### Creating a Therapy Session
1. Click "View Sessions" from dashboard
2. Click "New Session" button
3. Select:
   - Child (from dropdown)
   - Doctor (from dropdown)
   - Date
   - Attendance (Present/Absent)
4. Mark progress indicators:
   - ✓ Eye Contact
   - ✓ Follow Instructions
   - ✓ Speech Attempt
   - ✓ Motor Improvement
5. Select overall skill level:
   - Poor / Average / Good / Excellent
6. Add activities performed (comma-separated)
7. Add session notes
8. Add next session goal
9. Click "Create Session"

### Viewing Session Details
1. Go to "View Sessions"
2. Click "View" button on any session
3. See complete session information
4. Click "Export PDF" to download report

### Editing a Session
1. Go to "View Sessions"
2. Click "Edit" button on any session
3. Modify any fields
4. Click "Update Session"

### Exporting Reports
1. Click "Export Reports" from dashboard
2. Choose export type:
   - **Individual Session PDF** - Single session report
   - **Child Progress Report** - All sessions for a child
3. Select child/session from dropdown
4. Click "Export PDF"
5. PDF will download automatically

## 🎯 Tips & Best Practices

### Data Entry
- ✅ Always fill required fields (marked with *)
- ✅ Use consistent naming for children and doctors
- ✅ Add detailed notes for better tracking
- ✅ Set realistic next session goals

### Session Management
- ✅ Record sessions immediately after completion
- ✅ Be specific in activities and notes
- ✅ Track progress indicators consistently
- ✅ Review previous sessions before creating new ones

### PDF Reports
- ✅ Export PDFs regularly for backup
- ✅ Share reports with parents
- ✅ Keep digital copies organized
- ✅ Use professional language in notes

## 📱 Mobile Usage

The admin panel works on mobile devices:
- **Login:** Full-screen form
- **Dashboard:** Stacked cards
- **Tables:** Horizontal scroll or simplified view
- **Forms:** Full-width inputs
- **Buttons:** Touch-friendly size

## 🔒 Security Notes

### Session Management
- Your session persists in browser
- Click "Sign Out" when done
- Session clears on logout
- Auto-redirects if not logged in

### Data Privacy
- All data stored locally in browser
- No external database (yet)
- Clear browser data = lose all records
- Backup by exporting PDFs regularly

## ⚠️ Important Warnings

### Data Loss Prevention
1. **Browser Data:** Don't clear browser cache/localStorage
2. **Backup:** Export PDFs regularly
3. **Testing:** Use test data initially
4. **Migration:** Plan Supabase migration for production

### Known Limitations
- Data only in current browser
- No multi-device sync (yet)
- No automatic backups
- No user roles enforcement (yet)

## 🆘 Troubleshooting

### Can't Login?
- Check credentials: `smilestones` / `child@777`
- Clear browser cache
- Check `.env.local` file exists
- Restart development server

### Data Not Saving?
- Check browser console for errors
- Ensure localStorage is enabled
- Try different browser
- Check browser storage quota

### PDF Not Downloading?
- Allow pop-ups in browser
- Check download folder
- Try different browser
- Ensure session has all required data

### Text Not Visible?
- All fixed in latest version
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)

## 📞 Support

For issues or questions:
- Check `ADMIN_PANEL_COMPLETE.md` for technical details
- Check `SUPABASE_SETUP.md` for database migration
- Review browser console for errors

## 🎓 Training Checklist

For new admin users:
- [ ] Successfully login
- [ ] Navigate dashboard
- [ ] Add a test doctor
- [ ] Add a test child
- [ ] Create a test session
- [ ] View session details
- [ ] Edit a session
- [ ] Export a PDF
- [ ] Understand data persistence
- [ ] Know how to logout

## 📊 Workflow Example

**Daily Therapy Session Recording:**

1. **Morning:** Login to admin panel
2. **After Each Session:**
   - Go to "New Session"
   - Select child and doctor
   - Mark attendance
   - Check progress indicators
   - Add activities performed
   - Write session notes
   - Set next goal
   - Save session
3. **End of Day:**
   - Review all sessions
   - Export important PDFs
   - Logout

**Weekly Review:**
1. Go to "View Sessions"
2. Filter by date range
3. Review progress trends
4. Export child progress reports
5. Share with parents/team

**Monthly Tasks:**
1. Review all children progress
2. Export all session PDFs (backup)
3. Update doctor assignments
4. Plan next month's goals

---

**Remember:** This is a powerful tool for tracking child development. Use it consistently for best results!

**Last Updated:** February 5, 2026
