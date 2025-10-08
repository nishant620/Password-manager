import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false); // visible initially

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      if (form.id) {
        //  Update existing password
        await fetch(`http://localhost:3000/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        toast.success("✅ Password updated successfully!", { autoClose: 1500 });
      } else {
        // Add new password
        const newEntry = { ...form };
        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });
        toast.success("✅ Password saved successfully!", { autoClose: 1500 });
      }

      setform({ site: "", username: "", password: "" });
      getPasswords(); // refresh list
    } else {
      toast.error("⚠️ Please fill all fields correctly!", { autoClose: 1500 });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  //  Reusable copy function with toast
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard!", { autoClose: 1500 });
  };

  const handleEdit = (id) => {
    const itemToEdit = passwordArray.find((item) => item.id === id);
    setform(itemToEdit);
    const updated = passwordArray.filter((item) => item.id !== id);
    setpasswordArray(updated);
    toast.info("✏️ Edit mode activated", { autoClose: 1500 });
  };

  const handleDelete = async (id) => {
    const c = confirm("Do you really want to delete this password?");
    if (c) {
      const res = await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setpasswordArray(passwordArray.filter((item) => item.id !== id));
        toast.error("🗑️ Password deleted!", { autoClose: 1500 });
      } else {
        toast.error("Failed to delete password!", { autoClose: 1500 });
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        {" "}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>{" "}
      </div>
      <div className="p-3 md:mycontainer min-h-[88.5vh]">
        <h1 className="text-4xl text font-bold  text-center">
          <span className="text-green-500">&lt;</span>
          Pass<span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-6 md:gap-8 items-center w-full max-w-3xl mx-auto">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-3 sm:p-4"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row w-full justify-between gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-2 md:p-3"
              type="text"
              name="username"
            />
            <div className="relative w-full">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-2 md:p-3"
                type={passwordVisible ? "text" : "password"}
                name="password"
              />
              <span
                className="absolute right-3 top-2.5 md:top-3 cursor-pointer"
                onClick={togglePassword}
              >
                <img
                  className="p-1 w-6"
                  src={passwordVisible ? "icons/eye.png" : "icons/hide.png"}
                  alt="Toggle visibility"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300
            rounded-full px-6 sm:px-8 py-2 sm:py-3 w-fit border border-green-900 text-sm sm:text-base"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-1">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto rounded-md overflow-hidden mb-10 text-sm sm:text-base">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white text-center w-32">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="ml-2 cursor-pointer hover:text-blue-400"
                            onClick={() => handleCopy(item.site)}
                          />
                        </td>
                        <td className="py-2 border border-white text-center w-32">
                          {item.username}
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="ml-2 cursor-pointer hover:text-blue-400"
                            onClick={() => handleCopy(item.username)}
                          />
                        </td>
                        <td className="py-2 border border-white text-center w-32">
                          {"*".repeat(item.password.length)}
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="ml-2 cursor-pointer hover:text-blue-400"
                            onClick={() => handleCopy(item.password)}
                          />
                        </td>
                        {/* Actions table */}
                        <td className="py-2 border border-white text-center w-32">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-blue-600 hover:text-blue-800 mx-6"
                          >
                            <FontAwesomeIcon icon={faEdit} title="Edit" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 mx-6"
                          >
                            <FontAwesomeIcon icon={faTrash} title="Delete" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
