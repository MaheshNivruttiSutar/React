# Edit User Detail Page

## Quick Overview

Build a complete edit page pattern with navigation from a list view, form population, validation, and save functionality.

## What You'll Learn

- List to detail page navigation
- Using URL parameters (useParams)
- Fetching single resource data
- Form validation with error display
- Handling not found cases
- Navigation after save (useNavigate)

## Time to Complete

Approximately 25-30 minutes

## Prerequisites

- React Router basics
- Form handling
- API integration (GET, PUT)

## Page Flow

```
/users (list) → /users/:id/edit (form) → Save → /users
```

## Key Pattern

```jsx
import { useParams, useNavigate } from 'react-router-dom';

function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({ ...data });
      });
  }, [userId]);

  const handleSave = async () => {
    await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    navigate('/users');
  };

  return <form>...</form>;
}
```

---

**Tip**: Always handle the case where the user ID doesn't exist in the database - show a friendly "not found" message!
