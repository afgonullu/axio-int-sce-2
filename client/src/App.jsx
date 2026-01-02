import { gql, useQuery } from '@apollo/client';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import RouteGuard, { hasRole } from './RouteGuard.jsx';

const GET_VIEWER = gql`
  query Viewer {
    viewer {
      id
      name
      roles
    }
  }
`;

const GET_CRM_ACCOUNTS = gql`
  query CrmAccounts {
    crmAccounts {
      id
      name
      owner
      health
    }
  }
`;

function LoadingScreen() {
  return (
    <div className="page">
      <section className="card">Loading session...</section>
    </div>
  );
}

function ErrorScreen({ message }) {
  return (
    <div className="page">
      <section className="card error">{message}</section>
    </div>
  );
}

function SessionCard({ viewer }) {
  return (
    <div className="session">
      <p className="label">Signed in as</p>
      <p className="value">{viewer.name}</p>
      <div className="pill-row">
        {viewer.roles.map((role) => (
          <span key={role} className="pill">
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}

function Home({ viewer }) {
  return (
    <div className="grid">
      <section className="card">
        <p className="eyebrow">Student success</p>
        <h2>Advising overview</h2>
        <p className="body">
          This environment simulates a student portal. The CRM dashboard is meant
          to be restricted to users with the <span className="code">crm</span>{' '}
          role.
        </p>
        <div className="stats">
          <div>
            <p className="label">Active cohorts</p>
            <p className="value">8</p>
          </div>
          <div>
            <p className="label">Open outreach</p>
            <p className="value">23</p>
          </div>
          <div>
            <p className="label">Your role</p>
            <p className="value">{viewer.roles.join(', ')}</p>
          </div>
        </div>
      </section>
      <section className="card">
        <p className="eyebrow">Access policy</p>
        <h3>CRM protection rules</h3>
        <p className="body">
          Students should never see CRM data. The navigation hides CRM for users
          without access, but the route guard should also enforce it.
        </p>
        <div className="policy">
          <span className="pill warn">Restricted route</span>
          <span className="pill outline">Requires: crm</span>
        </div>
        <p className="note">
          Signed in user: <strong>{viewer.name}</strong>
        </p>
      </section>
    </div>
  );
}

function CrmDashboard() {
  const { data, loading, error } = useQuery(GET_CRM_ACCOUNTS);

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Confidential</p>
          <h2>CRM pipeline</h2>
        </div>
        <span className="pill accent">Internal only</span>
      </div>
      <p className="body">
        Account outreach and engagement health across partner institutions.
      </p>

      {loading && <p className="status">Loading CRM data...</p>}
      {error && (
        <p className="status error">Unable to load CRM data: {error.message}</p>
      )}

      {data && (
        <ul className="list">
          {data.crmAccounts.map((account, index) => (
            <li
              key={account.id}
              className="list-item"
              style={{ '--delay': `${index * 70}ms` }}
            >
              <div>
                <p className="account">{account.name}</p>
                <p className="meta">Owner: {account.owner}</p>
              </div>
              <span className={`pill status-pill ${account.health.toLowerCase()}`}>
                {account.health}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Unauthorized() {
  return (
    <section className="card">
      <p className="eyebrow">Access blocked</p>
      <h2>Unauthorized</h2>
      <p className="body">
        Your session does not include the required role for this route.
      </p>
      <Link className="button" to="/">
        Return to overview
      </Link>
    </section>
  );
}

export default function App() {
  const { data, loading, error } = useQuery(GET_VIEWER);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={`GraphQL error: ${error.message}`} />;
  }

  const viewer = data.viewer;

  return (
    <BrowserRouter>
      <div className="page">
        <header className="header">
          <div>
            <p className="eyebrow">Campus CRM</p>
            <h1>Advising console</h1>
          </div>
          <SessionCard viewer={viewer} />
        </header>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
            end
          >
            Overview
          </NavLink>
          {hasRole(viewer, 'crm') ? (
            <NavLink
              to="/crm"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              CRM
            </NavLink>
          ) : (
            <span className="nav-disabled">CRM (restricted)</span>
          )}
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home viewer={viewer} />} />
            <Route
              path="/crm"
              element={
                <RouteGuard user={viewer} requiredRole="crm">
                  <CrmDashboard />
                </RouteGuard>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Unauthorized />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
