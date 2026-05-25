# Populate Data in Input Fields

## Quick Overview

Learn how to fetch data from an API and populate form fields for editing, including tracking changes and reset functionality.

## What You'll Learn

- Fetching data and populating forms
- Keeping original vs modified data separate
- Tracking dirty/changed state
- Reset to original values
- Showing change indicators
- Preventing navigation with unsaved changes

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- useState and useEffect hooks
- Controlled form inputs
- GET API integration

## Key Pattern

```jsx
const [user, setUser] = useState(null);      // Original data
const [formData, setFormData] = useState({}); // Editable copy

useEffect(() => {
  fetchUser(userId).then(data => {
    setUser(data);           // Keep original
    setFormData({            // Populate form
      name: data.name,
      email: data.email
    });
  });
}, [userId]);

const isDirty = formData.name !== user?.name;

const handleReset = () => {
  setFormData({ name: user.name, email: user.email });
};
```

---

**Tip**: Always keep the original data separate from form data so you can detect changes and provide reset functionality!
