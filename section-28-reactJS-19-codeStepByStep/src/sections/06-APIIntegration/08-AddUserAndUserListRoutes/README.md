# Add User and User List Routes

## Quick Overview

Build a complete CRUD routing structure with separate pages for user list, add user, and edit user functionality.

## What You'll Learn

- Route structure for CRUD operations
- User list page with navigation
- Add user page with form
- Linking between pages
- Programmatic navigation after actions
- Shared layouts and navigation

## Time to Complete

Approximately 25-30 minutes

## Prerequisites

- React Router basics
- Form handling
- API integration

## Route Structure

```
/users              → List all users
/users/add          → Create new user
/users/:userId/edit → Edit existing user
```

## Key Components

### Route Setup
```jsx
<Routes>
  <Route path="/users" element={<UserListPage />} />
  <Route path="/users/add" element={<AddUserPage />} />
  <Route path="/users/:userId/edit" element={<EditUserPage />} />
</Routes>
```

### Navigation
```jsx
// Declarative
<Link to="/users/add">Add User</Link>
<Link to={`/users/${id}/edit`}>Edit</Link>

// Programmatic
navigate('/users');  // After save
```

---

**Tip**: Use shared layouts with `Outlet` to keep navigation consistent across all user management pages!
