import { useState, useEffect } from "react";
import Select from "react-select";

const InfoForm = ({ selectedInstructor }) => {
  const [status, setStatus] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  if (status !== "") {
    setTimeout(() => {
      setStatus("");
    }, 1000);
  }
  const [instructorsInfo, setInstructorsInfo] = useState({
    name: "",
    email: "",
    course: [],
    courseCode: [],
    availability: [],
    phoneNumber: "",
  });

  const daysOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
  ];

  const handleCourseCodeChange = (selectedOptions) => {
    setInstructorsInfo((prevInfo) => ({
      ...prevInfo,
      courseCode: selectedOptions.map((option) => option.value),
      course: selectedOptions.map((option) => option.label),
    }));
  };

  const handleCourseChange = (selectedOptions) => {
    setInstructorsInfo((prevInfo) => ({
      ...prevInfo,
      course: selectedOptions.map((option) => option.value),
      courseCode: selectedOptions.map((option) => option.label),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue =
      name === "phoneNumber" ? value.replace(/[^0-9+]/g, "") : value;
    setInstructorsInfo({ ...instructorsInfo, [name]: sanitizedValue });
  };

  const handleDaysChange = (selectedOptions) => {
    setInstructorsInfo((prevInfo) => ({
      ...prevInfo,
      availability: selectedOptions.map((option) => option.value),
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/tablesData?id=" + "courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.data !== undefined) {
          setSubjectData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const optionsSubject = subjectData.map((item) => ({
    value: item["Subject name"],
    label: item["Subject code"],
  }));
  const optionsSubjectCode = subjectData.map((item) => ({
    value: item["Subject code"],
    label: item["Subject name"],
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(instructorsInfo)) {
      if (value === "" || value.length === 0) {
        setStatus("Please fill all fields");
        return;
      }
    }
    try {
      const api =
        selectedInstructor == "Professor" ? "Professors" : "Engineers";
      const response = await fetch("/api/" + api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instructorsInfo),
      });

      if (response.ok) {
        setInstructorsInfo({
          name: "",
          email: "",
          course: [],
          courseCode: [],
          availability: [],
          phoneNumber: "",
        });
        setStatus("Saved");
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 mx-auto px-6 py-6 bg-white shadow-md rounded-md h-full overflow-y-scroll max-h-[550px]"
    >
      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {selectedInstructor} Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={instructorsInfo.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="w-1/2 ml-2">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={instructorsInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={instructorsInfo.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="w-1/2 ml-2">
          <label
            htmlFor="availability"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Availability Days
          </label>
          <Select
            className="text-black"
            isMulti
            options={daysOptions}
            value={daysOptions.filter((option) =>
              instructorsInfo.availability.includes(option.value)
            )}
            onChange={handleDaysChange}
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <label
            htmlFor="courseCode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Name
          </label>
          <Select
            className="text-black"
            isMulti
            options={optionsSubjectCode}
            value={optionsSubjectCode.filter((option) =>
              instructorsInfo.courseCode.includes(option.value)
            )}
            onChange={handleCourseCodeChange}
          />
        </div>

        <div className="w-1/2 ml-2">
          <label
            htmlFor="course"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Code
          </label>
          <Select
            className="text-black"
            isMulti
            options={optionsSubject}
            value={optionsSubject.filter((option) =>
              instructorsInfo.course.includes(option.value)
            )}
            onChange={handleCourseChange}
          />
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <button
          type="submit"
          className="w-5/12 justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </div>
      {status !== "" &&
        (status === "Saved" ? (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-300 opacity-80">
            {status}
          </div>
        ) : (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-red-500 text-white rounded-lg shadow-lg transition-opacity duration-300 opacity-80">
            {status}
          </div>
        ))}
    </form>
  );
};

export default InfoForm;
