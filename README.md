# RBAC Route Guard Scenario

Symptom: Students can paste `/crm` into the URL and still access the CRM dashboard.

## What the candidate sees

```jsx
if (!requiredRole && user.roles.length === 0) {
  return <Navigate to="/unauthorized" />;
}
```

The `requiredRole` is never enforced.

## Expected fix

```jsx
if (requiredRole && !hasRole(user, requiredRole)) {
  return <Navigate to="/unauthorized" />;
}
```

## Follow-up question

"What happens if roles change during the session? What should the UX do?"

## Run locally

```bash
npm install
npm run dev
```

- GraphQL server: http://localhost:4001/graphql
- Client app: http://localhost:5173

## Interviewer prompt

"Students cannot see the CRM link, but if they manually visit `/crm` the dashboard appears. Please debug this calmly and explain your reasoning."
