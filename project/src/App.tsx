import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Tasks } from './pages/Tasks';
import { Profile } from './pages/Profile';

function AppContent() {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentPage, setCurrentPage] = useState<'tasks' | 'profile'>('tasks');

  if (!user) {
    return authMode === 'login' ? (
      <Login onToggleMode={() => setAuthMode('signup')} />
    ) : (
      <Signup onToggleMode={() => setAuthMode('login')} />
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
        {currentPage === 'tasks' ? <Tasks /> : <Profile />}
      </DashboardLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
