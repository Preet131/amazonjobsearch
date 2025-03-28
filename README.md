# Amazon Job Search Monitor

This application automatically searches for Amazon jobs in multiple Canadian cities and notifies you when new positions are available.

## Prerequisites (One-time setup)

### 1. Install Node.js
1. Go to [Node.js website](https://nodejs.org/)
2. Click the "LTS" (Long Term Support) version to download
3. Run the downloaded installer
4. Click "Next" through the installation steps
5. Click "Finish" when complete

### 2. Install Python
1. Go to [Python website](https://www.python.org/downloads/)
2. Click "Download Python" (get the latest version)
3. Run the downloaded installer
4. **Important**: Check ✅ "Add Python to PATH" at the bottom
5. Click "Install Now"
6. Click "Close" when complete

### 3. Download This Project
1. Download this project as a ZIP file
2. Extract the ZIP to a folder (e.g., Desktop)
3. Open the extracted folder

## First-Time Setup

### Windows Users:
1. Right-click inside the project folder
2. Select "Open in Terminal" or "Open PowerShell window here"
3. Copy and paste this command:
```bash
npm install
```
4. Press Enter and wait for it to complete

## Running the Application

### Using the Graphical Interface (Recommended):
1. Double-click `job_search_gui.py`
2. A window will open
3. Click "Start Job Search" to begin monitoring
4. The results will appear in the window
5. Click "Stop" when you want to end the search

### Using Command Line (Alternative):
1. Open Terminal/PowerShell in the project folder
2. Type:
```bash
node run_postman.js
```
3. Press Enter
4. Press Ctrl+C to stop

## Understanding the Results

The application will show:
- Which cities are being searched
- Number of jobs found in each city
- When the search was completed
- Any errors that occur

## Files in This Project
- `job_search_gui.py`: The graphical interface
- `run_postman.js`: The main search program
- `cities.js`: List of cities being searched
- Other supporting files

## Currently Monitored Cities
- London, Ontario
- St. Thomas, Ontario
- Ottawa, Ontario

## Troubleshooting

### If the GUI doesn't open:
1. Open Terminal/PowerShell
2. Navigate to project folder
3. Run:
```bash
python job_search_gui.py
```
4. Note any error messages and refer to solutions below

### Common Issues:

#### "node not found":
- Reinstall Node.js and restart your computer

#### "python not found":
- Reinstall Python and make sure to check "Add Python to PATH"
- Restart your computer

#### "module not found":
Run these commands:
```bash
npm install
```

### Still Having Issues?
- Make sure all installation steps were followed
- Try restarting your computer
- Check that you're in the correct folder
- Ensure all files are in the same folder

## Notes
- The search runs every minute automatically
- You can close the window to stop the search
- The program needs an internet connection to work
- No special permissions are needed

## Support
If you need help:
1. Check the troubleshooting section
2. Make sure all installation steps were followed
3. Try restarting your computer
4. Contact support with any error messages you see

## Updates
To update the program:
1. Download the latest version
2. Replace all files in your folder
3. Run the setup commands again

---
Created by: Preet Vaghela   
Last Updated: 29-03-2025