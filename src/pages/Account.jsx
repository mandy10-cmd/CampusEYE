import React from 'react';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const completedTasks = [
    { title: 'Fighting Detected', status: 'Resolved by Bouncer 1', time: '2 hrs ago' },
    { title: 'Ragging Intervention', status: 'Handled by Security Team', time: 'Yesterday' },
    { title: 'Property Tampering', status: 'Reported and Cleared', time: '3 days ago' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-gray-800 border-r border-gray-700 hidden sm:block">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-2">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-semibold">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1">CampusEye User</p>
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Account Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedTasks.map((task, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-lg border border-gray-700 hover:bg-slate-700 transition">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">{task.title}</h3>
              <p className="text-gray-300 text-sm">{task.status}</p>
              <p className="text-gray-500 text-xs mt-2">{task.time}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Account;