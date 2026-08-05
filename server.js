const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
// Use plain CSV storage to avoid third-party Excel parser vulnerabilities

const app = express();
const port = process.env.PORT || 5001;
const csvPath = path.join(__dirname, 'assets', 'contact info.csv');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (site) so GET / returns index.html
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

async function ensureCsv() {
  if (!fs.existsSync(csvPath)) {
    const header = 'Timestamp,Name,Email,Phone,Message\n';
    await fs.promises.writeFile(csvPath, header, 'utf8');
  }
}

app.post('/submit-contact', async (req, res) => {
  try {
    await ensureCsv();

    const timestamp = new Date().toISOString();
    const escape = (val) => {
      if (val === null || val === undefined) return '';
      const s = String(val);
      // Escape double quotes by doubling them, wrap field in quotes if it contains comma or quote or newline
      const needsWrap = /[",\n,]/.test(s);
      const escaped = s.replace(/"/g, '""');
      return needsWrap ? `"${escaped}"` : escaped;
    };

    const fields = [
      timestamp,
      req.body.name || '',
      req.body.email || '',
      req.body.phone || '',
      req.body.message || ''
    ].map(escape);

    const line = fields.join(',') + '\n';
    await fs.promises.appendFile(csvPath, line, 'utf8');

    res.json({ success: true, message: 'Contact saved to contacts CSV.' });
  } catch (error) {
    console.error('Contact form save error:', error);
    res.status(500).json({ success: false, error: 'Unable to save contact submission.' });
  }
});

// Admin: download contacts CSV
app.get('/download-contacts', (req, res) => {
  try {
    if (!fs.existsSync(csvPath)) return res.status(404).send('No contacts file');
    res.download(csvPath, 'contact info.csv');
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).send('Unable to download contacts');
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
