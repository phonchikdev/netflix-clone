import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage.jsx"

import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"

import Footer from './components/Footer.jsx'
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser.js"
import { useEffect } from "react"

import { Loader } from "lucide-react"

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  console.log("auth user is here ", user);

  useEffect(() => {
    authCheck();
  }, [authCheck])

  if(isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"></Loader>
        </div>
      </div>
    )
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />}></Route>
      <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />}></Route>
    </Routes>
    <Footer />
    <Toaster />
    </>
  )
}

export default App
