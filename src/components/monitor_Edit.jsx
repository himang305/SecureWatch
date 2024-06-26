import React, { useState, useEffect } from "react";
import Navbar from "./navbar2";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Monitor_Edit() {
  //  const { email, token } = location.state || "";
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const decoded = jwtDecode(token);
  const user_Id = decoded.userId;
  console.log("user id = ", user_Id);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const targetMids = query.get("id");
  console.log("MID = ", targetMids);

  const [monitorName, setMonitorName] = React.useState("");
  const [riskCategory, setRiskCategory] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [contractName, setContractName] = React.useState("");
  const [network, setNetwork] = React.useState("");
  const [networkName, setNetworkName] = useState("");
  const [abi, setAbi] = React.useState("");
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      monitor_id: selectedMonitor.mid,
      name: monitorName || selectedMonitor.name,
      network: network || selectedMonitor.network,
      address: address || selectedMonitor.address,
      alert_type: 1,
      abi: abi || selectedMonitor.abi,
    };
    console.log("Data is:", data);
    try {
      const response = await axios.post(
        "https://139-59-5-56.nip.io:3443/update_monitor",
        data
      );
      // console.log("API response:", response.data);
      // console.log("monitor name is", monitorName);
      // console.log("Risk category is:", riskCategory);
      // console.log("contract name is", contractName);
      // console.log("netwprk name is", network);
      // console.log(" address is:", address);
      // console.log(" ABI  is:", abi);
      // console.log(" user id is", user_Id);

      toast.success("Monitor created successfully!", {
        autoClose: 500,
        onClose: () => {
          navigate("/event_Edit", {
            state: {
              name: monitorName || selectedMonitor.name,
              network: network || selectedMonitor.network,
              address: address || selectedMonitor.address,
              rk: riskCategory,
              abi: abi || selectedMonitor.abi,
              m_id: selectedMonitor.mid,
              email: email,
              token: token,
            },
          });
        },
      });

      console.log("response is", response.data);
    } catch (error) {
      console.error("API request failed:", error); // Handle error
      toast.error("Failed to create monitor. Please try again!", {
        autoClose: 500,
      });
    }
  };

  const [value, setValue] = useState(10);
  const [moniter, setMoniter] = useState([]);

  const setMoniters = async (moniterss) => {
    console.log("called setMoniters ", moniterss);
    if (!moniterss || !Array.isArray(moniterss.monitors) || moniterss.monitors.length === 0) {
      console.log("Monitors array is empty");
      setLoading(false); 
      return;
    }
    console.log("targetMids = ", targetMids );
    const _selectedMonitor = moniterss.monitors.find((monitor) => monitor.mid == targetMids);
    console.log("select monitor = ", _selectedMonitor );

    if (_selectedMonitor) {
      setSelectedMonitor(_selectedMonitor);
      setLoading(false); // Update loading state to indicate data is loaded
    } else {
      console.log(`Monitor with mid ${targetMids} not found`);
      setLoading(false); // Update loading state to indicate no matching monitor found
    }
  };


  useEffect(() => {

  

    const fetchMoniter = async () => {
      let data;
      try {
        console.log("called fetchMoniter ");

        const res = await fetch("https://139-59-5-56.nip.io:3443/get_monitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_Id,
          }),
        });
        data = await res.json();
      } catch (error) {
        console.error("Error fetching monitor data:", error);
      } finally {
        setMoniter(data);
        setMoniters(data);

      }
    };
    
    fetchMoniter();
  }, [user_Id, value]);

  // console.log("monitor isa:", moniter);


 
  // console.log("Selected Monitor:", selectedMonitor);
  // console.log("name is:", selectedMonitor.name);

  // {
  //   selectedMonitor.network === 80002
  //     ? "Amoy"
  //     : selectedMonitor.network === 1
  //     ? "Ethereum Mainnet"
  //     : selectedMonitor.network === 11155111
  //     ? "Sepolia Testnet"
  //     : selectedMonitor.network === 137
  //     ? "Polygon Mainnet"
  //     : "Unknown";
  // }

  if (loading) {
    return (
      <div className="text-center mt-20 text-4xl font-medium text-black">
        Loading Monitor Details...
      </div>
    );
  }

  return (
    <div
      className="font-poppin pt-2 bg-white min-h-full2"
      style={{ backgroundColor: "#FCFFFD" }}
    >
     
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar email={email} />
      {selectedMonitor && (
      <div className="w-5/6  lg:w-5/6 mx-auto mt-20 flex justify-center flex-col md:flex-row md:gap-10 lg:gap-20 ">
        <div className="w-full md:w-1/4 ">
          <div className="flex">
            <div>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_173_1147)">
                  <path
                    d="M22.6223 15.9674H9.3152"
                    stroke="#7D7D7D"
                    stroke-width="1.88191"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.9688 22.621L9.3152 15.9674L15.9688 9.31387"
                    stroke="#7D7D7D"
                    stroke-width="1.88191"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_173_1147">
                    <rect
                      width="22.5829"
                      height="22.5829"
                      fill="white"
                      transform="translate(15.9688 31.9368) rotate(-135)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div
              className="text-base text-[#7D7D7D] my-auto"
              style={{ color: "black" }}
            >
              Back to Monitors
            </div>
          </div>
          <div className="text-3xl font-medium mt-3" style={{ color: "black" }}>
            Edit Monitor
          </div>
          <div
            className="mt-10 flex gap-2 px-4 py-3 rounded-2xl"
            style={{ border: "1px solid #0CA851" }}
          >
            <div className="my-auto">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_173_1156)">
                  <path
                    d="M18.3327 9.23333V10C18.3317 11.797 17.7498 13.5456 16.6738 14.9849C15.5978 16.4241 14.0854 17.4771 12.3621 17.9866C10.6389 18.4961 8.79707 18.4349 7.11141 17.8122C5.42575 17.1894 3.98656 16.0384 3.00848 14.5309C2.0304 13.0234 1.56584 11.2401 1.68408 9.44693C1.80232 7.6538 2.49702 5.94694 3.66458 4.58089C4.83214 3.21485 6.41 2.26282 8.16284 1.86679C9.91568 1.47076 11.7496 1.65195 13.391 2.38333"
                    stroke="#0CA851"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3333 3.33325L10 11.6749L7.5 9.17492"
                    stroke="#0CA851"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_173_1156">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="my-auto" style={{ color: "black" }}>
              General Information
            </div>
            <div className="my-auto ml-auto">
              <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.832031"
                  y="26"
                  width="26"
                  height="26"
                  rx="2.92308"
                  transform="rotate(-90 0.832031 26)"
                  fill="#0CA851"
                />
                <path
                  d="M11.5469 18.647L16.6175 13.5763L11.5469 8.50571"
                  stroke="white"
                  stroke-width="1.23515"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            className="mt-10 flex gap-2 px-4 py-3 rounded-2xl"
            style={{ border: "1px solid #CACACA" }}
          >
            <div className="my-auto">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_173_1156)">
                  <path
                    d="M18.3327 9.23333V10C18.3317 11.797 17.7498 13.5456 16.6738 14.9849C15.5978 16.4241 14.0854 17.4771 12.3621 17.9866C10.6389 18.4961 8.79707 18.4349 7.11141 17.8122C5.42575 17.1894 3.98656 16.0384 3.00848 14.5309C2.0304 13.0234 1.56584 11.2401 1.68408 9.44693C1.80232 7.6538 2.49702 5.94694 3.66458 4.58089C4.83214 3.21485 6.41 2.26282 8.16284 1.86679C9.91568 1.47076 11.7496 1.65195 13.391 2.38333"
                    stroke="#0CA851"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3333 3.33325L10 11.6749L7.5 9.17492"
                    stroke="#0CA851"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_173_1156">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="my-auto" style={{ color: "black" }}>
              {" "}
              Events
            </div>
            <div className="my-auto ml-auto">
              <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5059 18.6469L16.5765 13.5763L11.5059 8.50562"
                  stroke="black"
                  stroke-width="1.69021"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            className="mt-10 flex gap-2 px-4 py-3 rounded-2xl"
            style={{ border: "1px solid #CACACA" }}
          >
            <div className="my-auto">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_173_1156)">
                  <path
                    d="M18.3327 9.23333V10C18.3317 11.797 17.7498 13.5456 16.6738 14.9849C15.5978 16.4241 14.0854 17.4771 12.3621 17.9866C10.6389 18.4961 8.79707 18.4349 7.11141 17.8122C5.42575 17.1894 3.98656 16.0384 3.00848 14.5309C2.0304 13.0234 1.56584 11.2401 1.68408 9.44693C1.80232 7.6538 2.49702 5.94694 3.66458 4.58089C4.83214 3.21485 6.41 2.26282 8.16284 1.86679C9.91568 1.47076 11.7496 1.65195 13.391 2.38333"
                    stroke="#0CA851"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3333 3.33325L10 11.6749L7.5 9.17492"
                    stroke="#0CA851"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_173_1156">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="my-auto" style={{ color: "black" }}>
              Functions
            </div>
            <div className="ml-auto my-auto">
              <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5059 18.6469L16.5765 13.5763L11.5059 8.50562"
                  stroke="black"
                  stroke-width="1.69021"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            className="mt-10 flex gap-2 px-4 py-3 rounded-2xl"
            style={{ border: "1px solid #CACACA" }}
          >
            <div className="my-auto">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_173_1156)">
                  <path
                    d="M18.3327 9.23333V10C18.3317 11.797 17.7498 13.5456 16.6738 14.9849C15.5978 16.4241 14.0854 17.4771 12.3621 17.9866C10.6389 18.4961 8.79707 18.4349 7.11141 17.8122C5.42575 17.1894 3.98656 16.0384 3.00848 14.5309C2.0304 13.0234 1.56584 11.2401 1.68408 9.44693C1.80232 7.6538 2.49702 5.94694 3.66458 4.58089C4.83214 3.21485 6.41 2.26282 8.16284 1.86679C9.91568 1.47076 11.7496 1.65195 13.391 2.38333"
                    stroke="#0CA851"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3333 3.33325L10 11.6749L7.5 9.17492"
                    stroke="#0CA851"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_173_1156">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="my-auto" style={{ color: "black" }}>
              Alerts
            </div>
            <div className="my-auto ml-auto">
              <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5059 18.6469L16.5765 13.5763L11.5059 8.50562"
                  stroke="black"
                  stroke-width="1.69021"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-1/2 pb-20">
          <form onSubmit={handleSubmit}>
            <div className="font-medium text-xl" style={{ color: "black" }}>
              Name
            </div>
            <div
              className="text-lg text-[#989898] mt-1"
              style={{ color: "black" }}
            >
              Give your monitor a name to make it easier to identify it. Only
              for display purposes.
            </div>
            <input
              style={{ backgroundColor: "white" }}
              type="text"
              name="name"
              placeholder={selectedMonitor.name}
              onChange={(e) => setMonitorName(e.target.value)}
              className="outline-none border-2 border-[#4C4C4C] w-full rounded-xl p-2 py-3 mt-1 "
            />
            <div
              className="font-medium mt-5 text-lg"
              style={{ color: "black" }}
            >
              Risk Category
            </div>
            <select
              style={{ backgroundColor: "white" }}
              name="category"
              id="category"
              placeholder={selectedMonitor.c}
              // value={formData.category}

              onChange={(e) => setRiskCategory(e.target.value)}
              className="outline-none border-2 border-[] py-3 rounded-xl  w-full px-3"
            >
              <option
                value="none"
                selected
                disabled
                hidden
                className="text-xl font-medium"
              >
                None
              </option>
              <option
                value="governance"
                className="text-[13px] text-[#959595] "
              >
                Governance
              </option>
              <option
                value="access control"
                className="text-[13px] text-[#959595]"
              >
                Access Control
              </option>
              <option
                value="suspicious activity"
                className="text-[13px] text-[#959595]"
              >
                Suspicious Activity
              </option>
              <option value="financial" className="text-[13px] text-[#959595]">
                Financial
              </option>
              <option value="technical" className="text-[13px] text-[#959595]">
                Technical
              </option>
            </select>

            <div
              className="text-lg font-medium mt-5"
              style={{ color: "black" }}
            >
              Contract Name
            </div>
            <input
              style={{ backgroundColor: "white" }}
              type="text"
              placeholder="Enter text"
              onChange={(e) => setContractName(e.target.value)}
              className="outline-none border-2 border-[] py-3 rounded-xl  w-full px-"
            />
            {/* #4C4C4C */}
            <div
              className="text-lg font-medium mt-5"
              style={{ color: "black" }}
            >
              Network
            </div>
            <select
              style={{ backgroundColor: "white" }}
              name="category"
              id="category"
              // value={formData.category}

              onChange={(e) => {
                const selectedIndex = e.target.options.selectedIndex;
                setNetwork(e.target.value);
                setNetworkName(e.target.options[selectedIndex].text);
              }}
              className="outline-none border-2 border-[] py-3 rounded-xl  w-full px-3"
            >
              <option
                value="none"
                selected
                disabled
                hidden
                className="text-xl font-medium"
              >
                {selectedMonitor.network === 80002
                  ? "Amoy"
                  : selectedMonitor.network === 1
                  ? "Ethereum Mainnet"
                  : selectedMonitor.network === 11155111
                  ? "Sepolia Testnet"
                  : selectedMonitor.network === 137
                  ? "Polygon Mainnet"
                  : "Unknown"}
              </option>
              <option value="1" className="text-[13px] text-[#959595] ">
                Ethereum Mainnet
              </option>
              <option value="11155111" className="text-[13px] text-[#959595]">
                Sepolia Testnet
              </option>
              <option value="137" className="text-[13px] text-[#959595]">
                Polygon Mainnet
              </option>
              <option value="80002" className="text-[13px] text-[#959595]">
                Amoy
              </option>
            </select>
            <div
              className="text-lg font-medium mt-5 "
              style={{ color: "black" }}
            >
              Address
            </div>
            <input
              type="text"
              style={{ backgroundColor: "white" }}
              name="address"
              value={address} // Bind input to state
              onChange={(e) => setAddress(e.target.value)}
              placeholder={selectedMonitor.address}
              className="w-full mt-1 outline-none rounded-xl border-2 border-[#4C4C4C]"
            />
            <div
              className="text-lg font-medium mt-5"
              style={{ color: "black" }}
            >
              ABI
            </div>
            <div
              className="text-lg text-[#989898] mt-1 "
              style={{ color: "black" }}
            >
              Paste your Contract's ABI code here
            </div>
            <textarea
              style={{ backgroundColor: "white" }}
              name="abi"
              id=""
              cols="30"
              rows="10"
              // value={formData.abi}
              value={abi} // Bind textarea to state
              placeholder={selectedMonitor.abi}
              onChange={(e) => setAbi(e.target.value)}
              className="w-full mt-1 outline-none rounded-xl border-2 border-[]"
            ></textarea>
            <div className="text-center">
              <button
                type="submit"
                className="mt-6 px-6 py-3 bg-[#28AA61] text-white rounded-lg"
              >
                Update Monitor
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
  );
}

export default Monitor_Edit;
