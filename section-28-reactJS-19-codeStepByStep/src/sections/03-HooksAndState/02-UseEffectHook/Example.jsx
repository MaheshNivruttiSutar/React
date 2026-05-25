import { useState, useEffect } from 'react';

export const UseeffecthookExample = () => {
  // State for different examples
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(1);

  // Example 1: componentDidMount equivalent - runs once
  useEffect(() => {
    console.log('Component mounted - runs once');
    document.title = 'useEffect Examples';
    
    // Cleanup function - componentWillUnmount equivalent
    return () => {
      console.log('Component will unmount');
      document.title = 'React App'; // Reset title
    };
  }, []); // Empty dependency array = runs once

  // Example 2: Watch specific state changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    
    // Update document title with count
    document.title = `Count: ${count}`;
  }, [count]); // Runs when count changes

  // Example 3: Window resize listener with cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // No dependencies - setup once, cleanup on unmount

  // Example 4: Timer with cleanup
  useEffect(() => {
    let interval;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    // Cleanup: clear interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]); // Runs when isTimerRunning changes

  // Example 5: Data fetching with dependency
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [selectedUserId]); // Runs when selectedUserId changes

  // Example 6: Fetch posts based on user
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const postsData = await response.json();
        setPosts(postsData.slice(0, 3)); // Limit to 3 posts
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [user]); // Runs when user changes

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <div style={{ padding: '2rem', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#667eea', marginBottom: '2rem' }}>useEffect Hook Examples</h2>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          {/* Basic Effect Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🔄 Basic Effect (Count Changes)</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Effect runs when count changes</p>
            
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '1rem' }}>
                Count: {count}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <button 
                  onClick={() => setCount(count - 1)}
                  style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  -1
                </button>
                <button 
                  onClick={() => setCount(count + 1)}
                  style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  +1
                </button>
              </div>
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`useEffect(() => {
  console.log('Count changed to:', count);
  document.title = \`Count: \${count}\`;
}, [count]); // Runs when count changes`}
            </div>
          </div>

          {/* Window Resize Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>📏 Window Resize Listener</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Effect with event listener + cleanup</p>
            
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea', marginBottom: '1rem' }}>
                Window Width: {windowWidth}px
              </div>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Resize your browser window to see this update in real-time!
              </p>
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Setup once, cleanup on unmount`}
            </div>
          </div>

          {/* Timer Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>⏱️ Timer with Cleanup</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>setInterval with proper cleanup</p>
            
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '1rem' }}>
                {timer} seconds
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <button 
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  style={{ padding: '0.5rem 1rem', background: isTimerRunning ? '#f44336' : '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {isTimerRunning ? 'Stop' : 'Start'}
                </button>
                <button 
                  onClick={resetTimer}
                  style={{ padding: '0.5rem 1rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Reset
                </button>
              </div>
            </div>
            
            <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`useEffect(() => {
  let interval;
  if (isRunning) {
    interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  }
  
  return () => clearInterval(interval);
}, [isRunning]);`}
            </div>
          </div>

          {/* Data Fetching Example */}
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0', gridColumn: 'span 2' }}>
            <h3 style={{ marginTop: 0, color: '#2196f3' }}>🌐 Data Fetching with Dependencies</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Fetch user data when selectedUserId changes</p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Select User:</label>
              <select 
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
                style={{ padding: '0.5rem', border: '2px solid #667eea', borderRadius: '4px', fontSize: '1rem' }}
              >
                {[1,2,3,4,5].map(id => (
                  <option key={id} value={id}>User {id}</option>
                ))}
              </select>
            </div>
            
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#667eea' }}>
                Loading user data...
              </div>
            ) : user ? (
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
                  <h4 style={{ marginTop: 0, color: '#1976d2' }}>User Info</h4>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Website:</strong> {user.website}</p>
                </div>
                
                <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '6px' }}>
                  <h4 style={{ marginTop: 0, color: '#388e3c' }}>Recent Posts</h4>
                  {posts.length > 0 ? (
                    posts.map(post => (
                      <div key={post.id} style={{ marginBottom: '0.75rem', padding: '0.5rem', background: 'white', borderRadius: '4px', fontSize: '0.9rem' }}>
                        <strong>{post.title}</strong>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#666' }}>
                          {post.body.substring(0, 100)}...
                        </p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#666' }}>Loading posts...</p>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#f44336' }}>
                Failed to load user data
              </div>
            )}
            
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {`useEffect(() => {
  const fetchUser = async () => {
    setLoading(true);
    const response = await fetch(\`/users/\${selectedUserId}\`);
    const userData = await response.json();
    setUser(userData);
    setLoading(false);
  };
  
  fetchUser();
}, [selectedUserId]); // Runs when selectedUserId changes`}
            </div>
          </div>

        </div>

        {/* Effect Patterns Summary */}
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>🎯 useEffect Patterns</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '6px' }}>
              <strong>Mount Only: useEffect(() =&gt; {'{}'}, [])</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Runs once when component mounts</p>
            </div>
            <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '6px' }}>
              <strong>Every Render: useEffect(() =&gt; {'{}'})</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Runs after every render (rarely needed)</p>
            </div>
            <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '6px' }}>
              <strong>Dependency: useEffect(() =&gt; {'{}'}, [dep])</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Runs when dependencies change</p>
            </div>
            <div style={{ padding: '1rem', background: '#fce4ec', borderRadius: '6px' }}>
              <strong>Cleanup: return () =&gt; {'{ cleanup }'}</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Cleanup subscriptions and timers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseeffecthookExample;