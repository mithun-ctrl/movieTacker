<h1>🎬 CINEDAIRY API Installation Guide</h1>
<p>This guide explains how to install and run the <strong>CINEDAIRY API</strong>, a Node.js-based application.</p>

<hr>

<h2>📌 Prerequisites</h2>
<ul>
    <li><strong>Node.js</strong> (latest LTS recommended)</li>
    <li><strong>npm</strong> or <strong>Yarn</strong></li>
    <li><strong>Git</strong> (optional)</li>
    <li><strong>Database</strong> (PostgreSQL)</li>
</ul>

<hr>

<h2>🚀 Installation Steps</h2>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/mithun-ctrl/movieTacker
cd movieTacker
</code></pre>

<h3>2. Install Dependencies</h3>
<pre><code>npm install
# OR
yarn install
</code></pre>

<h3>3. Configure Environment Variables</h3>
<ol>
    <li>Create a <code>.env</code> file in the root directory.</li>
    <li>Copy values from <code>.env.example</code> if available.</li>
    <li>Update the required configuration fields.</li>
</ol>

<pre><code>PORT=3000
DATABASE_URL=postgresql_db
UPSTASH_REDIS_REST_URL=your_upstash_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here
FIREBASE_SA_TYPE=""
FIREBASE_PROJECT_ID= ""
FIREBASE_PRIVATE_KEY_ID= "" 
FIREBASE_PRIVATE_KEY= ""
FIREBASE_CLIENT_EMAIL= ""
FIREBASE_CLIENT_ID= ""
FIREBASE_AUTH_URI= ""
FIREBASE_TOKEN_URI= ""
FIREBASE_AUTH_PROVIDER_CERT_URL= ""
FIREBASE_UNIVERSE_DOMAIN= ""
FIREBASE_DATABASE_URL= ""
</code></pre>

<h3>4. Run the Application</h3>

<h4>Development Mode</h4>
<pre><code>npm run dev
# OR
yarn dev
</code></pre>

<h4>Production Mode</h4>
<pre><code>npm start
# OR
yarn start
</code></pre>

<hr>

<h2>✅ Next Steps</h2>
<ul>
    <li>Test the API using Postman or Insomnia.</li>
    <pre><code>POST http://localhost:8000/api/v3/movie</code></pre>
</ul>