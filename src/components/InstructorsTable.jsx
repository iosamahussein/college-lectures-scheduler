"use client";
import React, { useState, useEffect } from "react";

const InstructorsTable  = ({ api }) => {
  const [tableData, setTableData] = useState([[]]);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const handleDelete = async (name) => {
    try {
      const response = await fetch("api/" + api, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        setDeleteStatus(!deleteStatus);
      }
    } catch (error) {
      console.error("Failed to send data");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/" + api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.data !== undefined) {
          setTableData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [api, deleteStatus]);

  const head_table = [
    "name",
    "course",
    "courseCode",
    "availability",
    "phoneNumber",
    "email",
    "delete",
  ];

  const Header_Name = [
    "Name",
    "Course",
    "Course Code",
    "Availability",
    "Phone Number",
    "Email",
    "Delete",
  ];

  return (
    <div className="fixed px-4 ml-6 w-11/12">
      <div className="flex overflow-y-scroll max-h-[600px]">
        <table className="table-auto border-collapse border border-gray-800 w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              {Header_Name.map((name, index) => (
                <th
                  key={index}
                  className="py-2 px-4 border border-gray-300 text-center"
                >
                  {name === "Delete" ? "" : name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="py-2 px-4 border border-gray-300 text-gray-900 text-center">
            {tableData.map((row, index) => (
              <tr key={index}>
                {head_table.map((name, index) => (
                  <td
                    key={index}
                    className="py-2 px-4 border border-gray-300 text-center"
                  >
                    {Array.isArray(row[name])
                      ? row[name].map((item, index) => (
                          <div key={index}>{item}</div>
                        ))
                      : row[name]}
                    {name === "delete" && (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => handleDelete(row.name)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorsTable ;
