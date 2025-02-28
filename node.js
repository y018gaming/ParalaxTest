// proxy-server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).send('URL parameter is required');
    }
    
    try {
        // Forward the request to the target URL
        const response = await axios({
            method: req.method,
            url: url,
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': req.headers['user-agent'],
                'Accept': req.headers['accept'],
                'Accept-Language': req.headers['accept-language'],
                'Accept-Encoding': req.headers['accept-encoding'],
            },
            validateStatus: () => true, // Return all status codes
        });
        
        // Copy headers from the proxied response
        for (const [key, value] of Object.entries(response.headers)) {
            // Skip setting these headers to avoid conflicts
            if (!['content-length', 'content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) {
                res.set(key, value);
            }
        }
        
        // Modify HTML to rewrite links for further proxy navigation
        if (response.headers['content-type'] && response.headers['content-type'].includes('text/html')) {
            let html = response.data.toString();
            
            // Rewrite URLs to go through the proxy
            html = html.replace(/(href|src)="(http[s]?:\/\/[^"]+)"/g, (match, attr, link) => {
                return `${attr}="/proxy?url=${encodeURIComponent(link)}"`;
            });
            
            // Return the modified HTML
            return res.send(html);
        }
        
        // Return the response as-is for non-HTML content
        return res.status(response.status).send(response.data);
        
    } catch (error) {
        console.error('Proxy error:', error.message);
        return res.status(500).send(`Error proxying request: ${error.message}`);
    }
});

// Handle 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
