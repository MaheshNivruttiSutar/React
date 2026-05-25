# Dynamic Routes with useParams

## What are Dynamic Routes?

Dynamic routes use URL parameters to render different content based on the URL. Parameters are defined with a colon (`:`) prefix in the route path.

## Basic Syntax

```jsx
// Route definition
<Route path="/products/:id" element={<ProductDetail />} />

// Accessing the parameter
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  
  // URL: /products/123
  // id = "123"
  
  return <div>Product ID: {id}</div>;
}
```

## Common Patterns

### Product/Item Detail

```jsx
<Routes>
  <Route path="/products" element={<ProductList />} />
  <Route path="/products/:id" element={<ProductDetail />} />
</Routes>

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <Loading />;
  return <div>{product.name}</div>;
}
```

### User Profile with Slug

```jsx
<Route path="/users/:username" element={<UserProfile />} />

function UserProfile() {
  const { username } = useParams();
  // /users/john-doe → username = "john-doe"
}
```

### Blog Post

```jsx
<Route path="/blog/:slug" element={<BlogPost />} />

function BlogPost() {
  const { slug } = useParams();
  // /blog/my-first-post → slug = "my-first-post"
}
```

## Multiple Parameters

```jsx
<Route path="/blog/:year/:month/:day/:slug" element={<BlogPost />} />

function BlogPost() {
  const { year, month, day, slug } = useParams();
  
  // /blog/2024/03/15/hello-world
  // year = "2024"
  // month = "03"
  // day = "15"
  // slug = "hello-world"
}
```

## Optional Parameters

Use `?` to make a parameter optional:

```jsx
// Optional :id parameter
<Route path="/users/:id?" element={<Users />} />

function Users() {
  const { id } = useParams();
  
  if (id) {
    return <UserDetail userId={id} />;
  }
  return <UserList />;
}

// Matches:
// /users       → id = undefined
// /users/123   → id = "123"
```

## Catch-All Routes (Splat)

Use `*` to match any path:

```jsx
<Route path="/docs/*" element={<Documentation />} />

function Documentation() {
  const { "*": splat } = useParams();
  
  // /docs/getting-started     → splat = "getting-started"
  // /docs/api/hooks/usestate  → splat = "api/hooks/usestate"
  
  const pathSegments = splat?.split('/') || [];
}
```

## Linking to Dynamic Routes

```jsx
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

## Programmatic Navigation with Params

```jsx
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const viewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div onClick={viewDetails}>
      {product.name}
    </div>
  );
}
```

## Query Parameters with useSearchParams

For optional filtering/sorting, use query parameters:

```jsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read params
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'name';
  const category = searchParams.get('category');
  
  // URL: /products?page=2&sort=price&category=electronics
  
  // Update params
  const setPage = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', newPage);
      return prev;
    });
  };
  
  // Delete param
  const clearCategory = () => {
    setSearchParams(prev => {
      prev.delete('category');
      return prev;
    });
  };

  return (
    <div>
      <p>Page: {page}</p>
      <button onClick={() => setPage(Number(page) + 1)}>
        Next Page
      </button>
    </div>
  );
}
```

## URL Params vs Query Params

| Feature | URL Params (`:id`) | Query Params (`?key=value`) |
|---------|-------------------|---------------------------|
| Required | Usually yes | No |
| Position | Part of path | After `?` |
| Use case | Resource identification | Filtering, sorting, pagination |
| Example | `/products/123` | `/products?page=2&sort=price` |
| Access | `useParams()` | `useSearchParams()` |

## Data Fetching with Params

```jsx
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    setLoading(true);
    setError(null);
    
    fetchProduct(id)
      .then(data => {
        if (!cancelled) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, [id]); // Re-fetch when id changes

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!product) return <NotFound />;
  
  return <ProductView product={product} />;
}
```

## Nested Dynamic Routes

```jsx
<Route path="/categories/:category" element={<CategoryLayout />}>
  <Route index element={<CategoryProducts />} />
  <Route path=":productId" element={<ProductDetail />} />
</Route>

function ProductDetail() {
  const { category, productId } = useParams();
  // /categories/electronics/123
  // category = "electronics"
  // productId = "123"
}
```

## Best Practices

1. **Validate parameters** - Check if the resource exists
2. **Handle loading states** - Show spinners while fetching
3. **Handle errors** - Show user-friendly error messages
4. **Use meaningful names** - `:userId` not just `:id` when multiple params
5. **Re-fetch on param change** - Include param in useEffect dependencies
6. **Prefer URL params for resources** - Use query params for filters
