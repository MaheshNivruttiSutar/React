# Toggle HTML Elements

## Basic Show/Hide

```jsx
const [show, setShow] = useState(true);

<button onClick={() => setShow(!show)}>
  {show ? 'Hide' : 'Show'}
</button>

{show && <div>This content toggles</div>}
```

## Toggle Between Two Elements

```jsx
{isLoggedIn ? (
  <Dashboard />
) : (
  <LoginForm />
)}
```

## Modal/Dialog Toggle

```jsx
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>Open Modal</button>

{isOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Modal Title</h2>
      <p>Modal content here</p>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  </div>
)}
```

## Accordion/Expandable

```jsx
const [expandedId, setExpandedId] = useState(null);

const toggle = (id) => {
  setExpandedId(expandedId === id ? null : id);
};

{items.map(item => (
  <div key={item.id}>
    <button onClick={() => toggle(item.id)}>
      {item.title}
    </button>
    {expandedId === item.id && (
      <div>{item.content}</div>
    )}
  </div>
))}
```

## Multiple Independent Toggles

```jsx
const [expanded, setExpanded] = useState({});

const toggleItem = (id) => {
  setExpanded(prev => ({
    ...prev,
    [id]: !prev[id]
  }));
};

{items.map(item => (
  <div key={item.id}>
    <button onClick={() => toggleItem(item.id)}>
      {item.title}
    </button>
    {expanded[item.id] && <div>{item.content}</div>}
  </div>
))}
```

## Tabs

```jsx
const [activeTab, setActiveTab] = useState('home');

<nav>
  {['home', 'profile', 'settings'].map(tab => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={activeTab === tab ? 'active' : ''}
    >
      {tab}
    </button>
  ))}
</nav>

<div>
  {activeTab === 'home' && <HomeContent />}
  {activeTab === 'profile' && <ProfileContent />}
  {activeTab === 'settings' && <SettingsContent />}
</div>
```

## Dropdown Menu

```jsx
const [isOpen, setIsOpen] = useState(false);

<div className="dropdown">
  <button onClick={() => setIsOpen(!isOpen)}>
    Menu ▼
  </button>
  {isOpen && (
    <ul className="dropdown-menu">
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
    </ul>
  )}
</div>
```

## With Animation (CSS)

```css
.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.content.open {
  max-height: 500px;
}
```

```jsx
<div className={`content ${isOpen ? 'open' : ''}`}>
  {/* Content */}
</div>
```

## Common Patterns

| Pattern | Use Case |
|---------|----------|
| `show && <X />` | Simple show/hide |
| `show ? <A /> : <B />` | Toggle between two |
| `expanded[id]` | Multiple items |
| `activeTab === 'x'` | One of many (tabs) |

## Best Practices

1. **Use descriptive state names** - `isModalOpen`, `showDetails`
2. **Handle outside clicks** - Close modals when clicking backdrop
3. **Add transitions** - Smooth show/hide animations
4. **Consider accessibility** - Proper ARIA attributes
