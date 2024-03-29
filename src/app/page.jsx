"use client";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import NavbarLogin from "@/components/NavbarLogin";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CustomTable from "@/components/CustomTable";
import Image from "next/image";
import Login from "@/components/LogIn";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const [logoutMessage, setLogoutMessage] = useState("");
  const { isAuthorized, loading, handleAuthorization } = useAuth();

  const handleLogin = async () => {
    try {
      await handleAuthorization(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const [theme, setTheme] = useState(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light";
  });
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (newTheme) => {
    if (newTheme === "dark") {
      document.body.classList.add("dark-theme");
      const container = document.getElementById("container");
      if (container) {
        container.classList.add("dark-theme");
      }
      const child = document.getElementById("child");
      if (child) {
        child.classList.add("dark-theme");
      }
    } else {
      document.body.classList.remove("dark-theme");
      const container = document.getElementById("container");
      if (container) {
        container.classList.remove("dark-theme");
      }
      const child = document.getElementById("child");
      if (child) {
        child.classList.remove("dark-theme");
      }
    }
  };
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState(0);
  const list_year = ["First Year", "Second Year", "Third Year", "Fourth Year"];
  const list_semester = ["First Semester", "Second Semester"];

  return (
    <div className="flex">
      {isAuthorized ? (
        <>
          <Navbar className="flex-1" />
          <Sidebar setLogoutMessage={setLogoutMessage} />
          <main className="overflow-y-auto w-screen md:flex-row sm:flex-row">
            <div className="flex  pt-20  justify-center items-center bg-white dark:bg-gray-800 px-6 py-4 shadow-md w-full">
              <ul className="flex cursor-pointer ml-10 pd-10">
                {list_year.map((year, index) => (
                  <li className="mr-10" key={index}>
                    {index === selectedYear ? (
                      <a
                      className="text-blue-200 border-b-2 border-blue-500 pb-2"
                        onClick={() => setSelectedYear(index)}
                      >
                        {year}
                      </a>
                    ) : (
                      <a
                      className="text-gray-200 hover:text-blue-500 border-b-2 border-transparent hover:border-blue-500 pb-2"
                        onClick={() => setSelectedYear(index)}
                      >
                        {year}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="flex cursor-pointer ml-10 pd-10">
                {list_semester.map((semester, index) => (
                  <li className="mr-10" key={index}> 
                    {index === selectedSemester ? (
                      <a
                      className="text-green-200 border-b-2 border-green-500 pb-2"
                        onClick={() => setSelectedSemester(index)}
                      >
                        {semester}
                      </a>
                    ) : (
                      <a
                      className="text-gray-200 hover:text-green-500 border-b-2 border-transparent hover:border-green-500 pb-2"
                        onClick={() => setSelectedSemester(index)}
                      >
                        {semester}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 p-2 text-white">
              <CustomTable
                selectedYear={selectedYear}
                selectedSemester={selectedSemester}
              />
              {logoutMessage && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-300 opacity-80">
                  {logoutMessage}
                </div>
              )}
            </div>
          </main>
        </>
      ) : !loading ? (
        <>
          <NavbarLogin />
          <Login
            handleLogin={handleLogin}
            handleAuthorization={handleAuthorization}
          />
          <div
            className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/Images/bg.jpg')",
              zIndex: -1,
            }}
          ></div>
        </>
      ) : (
        <>
          <NavbarLogin />
          <h1 className="flex text-2xl font-medium items-center text-white justify-center">
            Loading ...
          </h1>
          <div
            className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/Images/bg.jpg')",
              zIndex: -1,
            }}
          ></div>
        </>
      )}
    </div>
  );
}
