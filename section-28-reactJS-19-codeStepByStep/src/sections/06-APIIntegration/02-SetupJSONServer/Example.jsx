import { useState } from 'react';

export const SetupJSONServerExample = () => {
  const [activeTab, setActiveTab] = useState('setup');

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Setup JSON Server</h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['setup', 'db.json', 'endpoints', 'demo'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? '#667eea' : 'white',
                color: activeTab === tab ? 'white' : '#333',
                border: '2px solid #667eea',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'db.json' ? 'db.json' : tab}
            </button>
          ))}
        </div>

        {/* Setup Tab */}
        {activeTab === 'setup' && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>What is JSON Server?</h3>
            
            <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
              <p style={{ margin: 0 }}>
                <strong>JSON Server</strong> is a simple tool that creates a full fake REST API from a JSON file.
                It's perfect for prototyping and development when you need a backend but don't want to set one up.
              </p>
            </div>

            <h4 style={{ color: '#667eea' }}>Step 1: Install JSON Server</h4>
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`# Install globally
npm install -g json-server

# Or install as dev dependency in your project
npm install json-server --save-dev`}
            </pre>

            <h4 style={{ color: '#667eea', marginTop: '1.5rem' }}>Step 2: Create db.json File</h4>
            <p>Create a <code>db.json</code> file in your project root:</p>
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
  ],
  "posts": [
    { "id": 1, "title": "Hello World", "userId": 1 },
    { "id": 2, "title": "JSON Server is awesome", "userId": 2 }
  ]
}`}
            </pre>

            <h4 style={{ color: '#667eea', marginTop: '1.5rem' }}>Step 3: Start the Server</h4>
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`# Start JSON Server
json-server --watch db.json --port 3001

# Server runs at http://localhost:3001`}
            </pre>

            <h4 style={{ color: '#667eea', marginTop: '1.5rem' }}>Step 4: Add npm Script (Optional)</h4>
            <p>Add to your <code>package.json</code>:</p>
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`{
  "scripts": {
    "dev": "vite",
    "server": "json-server --watch db.json --port 3001",
    "dev:all": "concurrently \\"npm run dev\\" \\"npm run server\\""
  }
}`}
            </pre>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff3e0', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#e65100' }}>Run Both Servers</h4>
              <p style={{ margin: 0 }}>
                Use <code>concurrently</code> package to run React and JSON Server together:
                <br />
                <code>npm install concurrently --save-dev</code>
              </p>
            </div>
          </div>
        )}

        {/* db.json Tab */}
        {activeTab === 'db.json' && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Sample db.json Structure</h3>
            
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "avatar": "https://i.pravatar.cc/150?img=1"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "user",
      "avatar": "https://i.pravatar.cc/150?img=2"
    },
    {
      "id": 3,
      "name": "Bob Wilson",
      "email": "bob@example.com",
      "role": "user",
      "avatar": "https://i.pravatar.cc/150?img=3"
    }
  ],
  "posts": [
    {
      "id": 1,
      "title": "Getting Started with React",
      "body": "React is a JavaScript library for building UIs...",
      "userId": 1,
      "createdAt": "2024-01-15"
    },
    {
      "id": 2,
      "title": "Understanding Hooks",
      "body": "Hooks are functions that let you use state...",
      "userId": 2,
      "createdAt": "2024-01-20"
    }
  ],
  "comments": [
    {
      "id": 1,
      "postId": 1,
      "text": "Great article!",
      "author": "Jane"
    },
    {
      "id": 2,
      "postId": 1,
      "text": "Very helpful, thanks!",
      "author": "Bob"
    }
  ],
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999,
      "category": "electronics"
    },
    {
      "id": 2,
      "name": "Headphones",
      "price": 199,
      "category": "electronics"
    }
  ]
}`}
            </pre>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e8f5e9', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Key Points</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                <li>Each top-level key becomes an endpoint (<code>/users</code>, <code>/posts</code>)</li>
                <li>Each item must have a unique <code>id</code> field</li>
                <li>JSON Server auto-generates new IDs for POST requests</li>
                <li>File is automatically updated on POST, PUT, DELETE</li>
              </ul>
            </div>
          </div>
        )}

        {/* Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Available Endpoints</h3>
            
            <p>JSON Server automatically creates RESTful endpoints:</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#667eea', color: 'white' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Method</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Endpoint</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#f5f5f5' }}>
                  <td style={{ padding: '0.75rem', color: '#4caf50', fontWeight: 'bold' }}>GET</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>/users</td>
                  <td style={{ padding: '0.75rem' }}>Get all users</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', color: '#4caf50', fontWeight: 'bold' }}>GET</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>/users/1</td>
                  <td style={{ padding: '0.75rem' }}>Get user with id 1</td>
                </tr>
                <tr style={{ background: '#f5f5f5' }}>
                  <td style={{ padding: '0.75rem', color: '#2196f3', fontWeight: 'bold' }}>POST</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>/users</td>
                  <td style={{ padding: '0.75rem' }}>Create new user</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', color: '#ff9800', fontWeight: 'bold' }}>PUT</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>/users/1</td>
                  <td style={{ padding: '0.75rem' }}>Replace user 1</td>
                </tr>
                <tr style={{ background: '#f5f5f5' }}>
                  <td style={{ padding: '0.75rem', color: '#ff9800', fontWeight: 'bold' }}>PATCH</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>/users/1</td>
                  <td style={{ padding: '0.75rem' }}>Update user 1 partially</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', color: '#f44336', fontWeight: 'bold' }}>DELETE</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>/users/1</td>
                  <td style={{ padding: '0.75rem' }}>Delete user 1</td>
                </tr>
              </tbody>
            </table>

            <h4 style={{ color: '#667eea' }}>Query Parameters</h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace' }}>
                <strong>Filter:</strong> /posts?userId=1
              </div>
              <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace' }}>
                <strong>Paginate:</strong> /posts?_page=1&_limit=10
              </div>
              <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace' }}>
                <strong>Sort:</strong> /posts?_sort=createdAt&_order=desc
              </div>
              <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace' }}>
                <strong>Search:</strong> /posts?q=react
              </div>
              <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace' }}>
                <strong>Relations:</strong> /posts?_embed=comments
              </div>
            </div>
          </div>
        )}

        {/* Demo Tab */}
        {activeTab === 'demo' && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Using JSON Server in React</h3>
            
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Define base URL
const API_URL = 'http://localhost:3001';

// GET all users
const getUsers = async () => {
  const response = await fetch(\`\${API_URL}/users\`);
  return response.json();
};

// GET single user
const getUser = async (id) => {
  const response = await fetch(\`\${API_URL}/users/\${id}\`);
  return response.json();
};

// POST new user
const createUser = async (user) => {
  const response = await fetch(\`\${API_URL}/users\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return response.json();
};

// PUT update user
const updateUser = async (id, user) => {
  const response = await fetch(\`\${API_URL}/users/\${id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return response.json();
};

// DELETE user
const deleteUser = async (id) => {
  await fetch(\`\${API_URL}/users/\${id}\`, {
    method: 'DELETE'
  });
};`}
            </pre>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>API Service Pattern</h4>
              <p style={{ margin: 0 }}>
                Create an <code>api.js</code> or <code>services/userService.js</code> file to keep
                all API calls organized in one place.
              </p>
            </div>

            <h4 style={{ color: '#667eea', marginTop: '1.5rem' }}>Project Structure</h4>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`my-react-app/
├── db.json              # JSON Server database
├── package.json
├── src/
│   ├── services/
│   │   └── api.js       # API functions
│   ├── components/
│   │   └── UserList.jsx
│   └── App.jsx`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupJSONServerExample;
