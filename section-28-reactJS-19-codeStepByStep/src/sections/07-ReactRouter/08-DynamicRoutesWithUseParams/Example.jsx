import { useState } from 'react';

export const DynamicRoutesWithUseParamsExample = () => {
  const [currentPath, setCurrentPath] = useState('/products');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock product data
  const products = [
    { id: '1', name: 'MacBook Pro', category: 'laptops', price: 1999, description: 'Powerful laptop for professionals' },
    { id: '2', name: 'iPhone 15', category: 'phones', price: 999, description: 'Latest smartphone with amazing camera' },
    { id: '3', name: 'AirPods Pro', category: 'accessories', price: 249, description: 'Premium wireless earbuds' },
    { id: '4', name: 'iPad Air', category: 'tablets', price: 599, description: 'Versatile tablet for work and play' },
  ];

  // Mock users
  const users = [
    { id: 'john-doe', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 'jane-smith', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  // Parse URL params
  const getParams = () => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts[0] === 'products' && parts[1]) {
      return { type: 'product', id: parts[1] };
    }
    if (parts[0] === 'users' && parts[1]) {
      return { type: 'user', slug: parts[1] };
    }
    if (parts[0] === 'category' && parts[1]) {
      return { type: 'category', name: parts[1] };
    }
    return { type: 'list' };
  };

  const params = getParams();

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>Dynamic Routes with useParams</h2>

        {/* Concept Explanation */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>What are Dynamic Routes?</h3>
          
          <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
            <p style={{ margin: 0 }}>
              Dynamic routes use URL parameters (like <code>:id</code> or <code>:slug</code>) to render 
              different content based on the URL. The <code>useParams</code> hook extracts these values.
            </p>
          </div>

          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Route definition
<Route path="/products/:id" element={<ProductDetail />} />

// Component
function ProductDetail() {
  const { id } = useParams();  // Extract 'id' from URL
  // /products/123 → id = "123"
  
  return <div>Product ID: {id}</div>;
}`}
          </pre>
        </div>

        {/* Interactive Demo */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Interactive Demo</h3>
          
          {/* Navigation */}
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Try different routes:</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => setCurrentPath('/products')} style={navBtnStyle(currentPath === '/products')}>
                /products
              </button>
              {products.map(p => (
                <button key={p.id} onClick={() => setCurrentPath(`/products/${p.id}`)} style={navBtnStyle(currentPath === `/products/${p.id}`)}>
                  /products/{p.id}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {users.map(u => (
                <button key={u.id} onClick={() => setCurrentPath(`/users/${u.id}`)} style={navBtnStyle(currentPath === `/users/${u.id}`)}>
                  /users/{u.id}
                </button>
              ))}
              <button onClick={() => setCurrentPath('/category/laptops')} style={navBtnStyle(currentPath === '/category/laptops')}>
                /category/laptops
              </button>
            </div>
          </div>

          {/* URL Bar */}
          <div style={{
            padding: '0.75rem 1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            fontFamily: 'monospace',
            marginBottom: '1rem',
          }}>
            localhost:3000<span style={{ color: '#667eea', fontWeight: 'bold' }}>{currentPath}</span>
            {params.id && <span style={{ marginLeft: '1rem', color: '#e91e63' }}>params.id = "{params.id}"</span>}
            {params.slug && <span style={{ marginLeft: '1rem', color: '#e91e63' }}>params.slug = "{params.slug}"</span>}
            {params.name && <span style={{ marginLeft: '1rem', color: '#e91e63' }}>params.name = "{params.name}"</span>}
          </div>

          {/* Content Based on Route */}
          <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '6px', minHeight: '200px' }}>
            {params.type === 'list' && currentPath === '/products' && (
              <div>
                <h3 style={{ margin: '0 0 1rem 0' }}>All Products</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  {products.map(p => (
                    <div
                      key={p.id}
                      onClick={() => setCurrentPath(`/products/${p.id}`)}
                      style={{
                        padding: '1rem',
                        background: 'white',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: '2px solid #e0e0e0',
                      }}
                    >
                      <h4 style={{ margin: '0 0 0.25rem 0' }}>{p.name}</h4>
                      <p style={{ margin: 0, color: '#667eea', fontWeight: 'bold' }}>${p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {params.type === 'product' && (
              <ProductDetail product={products.find(p => p.id === params.id)} />
            )}

            {params.type === 'user' && (
              <UserProfile user={users.find(u => u.id === params.slug)} />
            )}

            {params.type === 'category' && (
              <CategoryPage 
                category={params.name} 
                products={products.filter(p => p.category === params.name)} 
              />
            )}
          </div>
        </div>

        {/* Multiple Parameters */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Multiple URL Parameters</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Route with multiple parameters
<Route path="/blog/:year/:month/:slug" element={<BlogPost />} />

// Component
function BlogPost() {
  const { year, month, slug } = useParams();
  
  // /blog/2024/03/my-first-post
  // year = "2024", month = "03", slug = "my-first-post"
  
  return (
    <article>
      <p>Published: {month}/{year}</p>
      <h1>{slug}</h1>
    </article>
  );
}`}
          </pre>
        </div>

        {/* Optional Parameters */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Optional & Catch-All Parameters</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`// Optional parameter with ?
<Route path="/users/:id?" element={<Users />} />
// Matches: /users AND /users/123

// Catch-all with *
<Route path="/docs/*" element={<Docs />} />
// Matches: /docs, /docs/intro, /docs/api/hooks

// Access catch-all with useParams
function Docs() {
  const { "*": splat } = useParams();
  // /docs/api/hooks → splat = "api/hooks"
}`}
          </pre>
        </div>

        {/* useSearchParams */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Query Parameters with useSearchParams</h3>
          
          <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
{`import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read query params
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'name';
  const category = searchParams.get('category');
  
  // /products?page=2&sort=price&category=phones
  
  // Update query params
  const nextPage = () => {
    setSearchParams({ 
      page: String(Number(page) + 1),
      sort,
      category 
    });
  };
  
  return (
    <div>
      <p>Page: {page}, Sort: {sort}</p>
      <button onClick={nextPage}>Next Page</button>
    </div>
  );
}`}
          </pre>

          <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>URL Params vs Query Params</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              <li><strong>URL Params</strong> (<code>:id</code>): Required, part of path - <code>/products/123</code></li>
              <li><strong>Query Params</strong> (<code>?key=value</code>): Optional, for filtering/sorting - <code>/products?page=2</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper styles
const navBtnStyle = (isActive) => ({
  padding: '0.5rem 0.75rem',
  background: isActive ? '#667eea' : '#e0e0e0',
  color: isActive ? 'white' : '#333',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.85rem',
});

// Detail Components
const ProductDetail = ({ product }) => {
  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3 style={{ color: '#c62828' }}>Product Not Found</h3>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div>
      <button style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        ← Back to Products
      </button>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{product.name}</h2>
        <p style={{ color: '#667eea', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>
          ${product.price}
        </p>
        <p style={{ color: '#666' }}>{product.description}</p>
        <p style={{ color: '#999', fontSize: '0.9rem' }}>Category: {product.category}</p>
        <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#e3f2fd', borderRadius: '4px' }}>
          <code>useParams() returned: {`{ id: "${product.id}" }`}</code>
        </div>
      </div>
    </div>
  );
};

const UserProfile = ({ user }) => {
  if (!user) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}><h3>User Not Found</h3></div>;
  }

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
      <h2 style={{ margin: '0 0 1rem 0' }}>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#e8f5e9', borderRadius: '4px' }}>
        <code>useParams() returned: {`{ slug: "${user.id}" }`}</code>
      </div>
    </div>
  );
};

const CategoryPage = ({ category, products }) => (
  <div>
    <h3 style={{ margin: '0 0 1rem 0', textTransform: 'capitalize' }}>{category} Category</h3>
    {products.length === 0 ? (
      <p>No products in this category.</p>
    ) : (
      <div style={{ display: 'grid', gap: '1rem' }}>
        {products.map(p => (
          <div key={p.id} style={{ padding: '1rem', background: 'white', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.25rem 0' }}>{p.name}</h4>
            <p style={{ margin: 0, color: '#667eea' }}>${p.price}</p>
          </div>
        ))}
      </div>
    )}
    <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#fff3e0', borderRadius: '4px' }}>
      <code>useParams() returned: {`{ name: "${category}" }`}</code>
    </div>
  </div>
);

export default DynamicRoutesWithUseParamsExample;
