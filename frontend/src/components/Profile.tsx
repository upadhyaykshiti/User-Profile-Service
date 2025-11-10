

// import React, { useEffect, useState } from "react";
// import { getProfile, updateProfile, logout } from "../services/auth";

// export default function Profile({ onLogout }: { onLogout(): void }) {
//   const [profile, setProfile] = useState<any>(null);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [msg, setMsg] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const r = await getProfile();
//         setProfile(r.data);
//         setFirstName(r.data.firstName || "");
//         setLastName(r.data.lastName || "");
//       } catch (err) {
//         setProfile(null);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   async function save() {
//     try {
//       await updateProfile({ firstName, lastName });
//       setMsg("✅ Profile updated successfully!");
//       setTimeout(() => setMsg(null), 3000);
//     } catch {
//       setMsg("❌ Failed to update profile.");
//     }
//   }

//   // function logout() {
//   //   // Clear cookie on backend if needed, but for now just redirect
//   //   onLogout();
//   // }
//   async function handleLogout() {
//   await logout();
//   onLogout();
//   }

//   if (loading) return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;

//   if (!profile)
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-gray-700">
//         <p>Not authenticated.</p>
//         <button
//           onClick={handleLogout}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//         >
//           Go to Login
//         </button>
//       </div>
//     );

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>
//         <div className="text-gray-600 mb-4">
//           <p className="text-lg">
//             <span className="font-semibold">Email:</span> {profile.email}
//           </p>
//         </div>

//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//           />

//           <button
//             onClick={save}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
//           >
//             Save Changes
//           </button>

//           <button
//             onClick={logout}
//             className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
//           >
//             Logout
//           </button>
//         </div>

//         {msg && <div className="mt-4 text-sm text-green-600">{msg}</div>}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { getProfile, updateProfile, logout as apiLogout } from "../services/auth";

export default function Profile({ onLogout }: { onLogout(): void }) {
  const [profile, setProfile] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await getProfile();
        setProfile(r.data);
        setFirstName(r.data.firstName || "");
        setLastName(r.data.lastName || "");
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save() {
    try {
      await updateProfile({ firstName, lastName });
      setMsg("✅ Profile updated successfully!");
      setTimeout(() => setMsg(null), 3000);
    } catch {
      setMsg("❌ Failed to update profile.");
    }
  }

  async function handleLogout() {
    try {
      await apiLogout(); // clears cookie from backend
    } catch {
      console.warn("Logout request failed");
    } finally {
      onLogout(); // return to login screen
    }
  }

  if (loading)
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;

  if (!profile)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <p>Not authenticated.</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>

        <div className="text-gray-600 mb-4">
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          <button
            onClick={save}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Logout
          </button>
        </div>

        {msg && <div className="mt-4 text-sm text-green-600">{msg}</div>}
      </div>
    </div>
  );
}
