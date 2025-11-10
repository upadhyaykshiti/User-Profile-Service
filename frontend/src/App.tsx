

import React, { useState } from "react";
import Login from "./components/Login";

function App() {
  const [authed, setAuthed] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile Service</h1>
        <Login onLogin={() => setAuthed(true)} onSwitch={() => setShowRegister(true)} />

        
      </div>
    </div>
  );
}

export default App;
