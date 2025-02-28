# Forest Window Proxy - Installation Guide

This guide will walk you through setting up and running the Forest Window Proxy application in GitHub Codespaces or on your local machine.

## Setup in GitHub Codespaces

1. **Create a new repository on GitHub**
   - Create a new repository on GitHub
   - Initialize it with a README

2. **Open in Codespaces**
   - Click on the "Code" button in your repository
   - Select the "Codespaces" tab
   - Click "Create codespace on main"

3. **Create the project files**
   - Create a new folder named `public`
   - Inside the `public` folder, create a file named `index.html` and paste the HTML code
   - In the root directory, create a file named `proxy-server.js` and paste the server code
   - Create a `package.json` file and paste the package configuration

4. **Install dependencies and run the application**
   ```bash
   npm install
   npm start
   ```

5. **Access the application**
   - Codespaces will show a notification that a port is now forwarded
   - Click "Open in Browser" or navigate to the forwarded port URL

## Setup on your local machine

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd <repository-name>
   ```

2. **Create project files**
   - Create the folder structure and files as described above

3. **Install dependencies and run the application**
   ```bash
   npm install
   npm start
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
.
├── public/
│   └── index.html       # The main web application with UI and client-side code
├── proxy-server.js      # The Node.js proxy server implementation
├── package.json         # Project configuration and dependencies
└── README.md            # Project documentation
```

## Features

- **Parallax Forest Window Background**: Moving your mouse will create a depth effect in the forest background
- **Raindrops Animation**: Simulated rain falling on the window
- **Web Proxy Functionality**: Browse websites through the proxy
- **Responsive Design**: Works on all device sizes

## Usage

1. Enter a URL in the input field (e.g., https://example.com)
2. Click "Browse" or press Enter
3. The requested website will load in the iframe below

## Notes

- Some websites might not allow being displayed in iframes due to X-Frame-Options headers
- For security reasons, a proper deployment would need additional safeguards and rate limiting
- This is a demonstration project and not intended for production use without further security enhancements
