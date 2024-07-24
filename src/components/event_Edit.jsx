import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbar2";
import Select from 'react-select'

function Event_Edit() {
  const navigate = useNavigate();
  const location = useLocation();

  const options = [
    { value: 'Approval', label: 'Approval' },
    { value: 'Transfer', label: 'Transfer' },
  ]
  const [foundedEvents, setFoundedEvents] = useState([]);
  const [selectedValues, setSelectedValues] = useState([])
  console.log("Founded events:", foundedEvents);
  console.log("Selected values:", selectedValues);

  const { name, email, m_id, token, network, abi, address, rk } = location.state || "";
  const [networkState, setNetworkState] = useState(network || "");
  const [addressState, setAddressState] = useState(address || "");
  const [riskCategoryState, setRiskCategoryState] = useState(rk || "");
  const [abiState, setAbiState] = useState(abi || "");
  const mid = m_id;

  const [disp1, setDisp1] = useState("none");
  const [disp2, setDisp2] = useState("none");
  const handleToggle1 = (e) => {
    if (e.target.checked) setDisp1("block");
    else setDisp1("none");
  };
  const handleToggle2 = (e) => {
    if (e.target.checked) setDisp2("block");
    else setDisp2("none");
  };

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState({});
  const [transferOperator, setTransferOperator]=useState("")
  const [approvalOperator, setApprovalOperator] = useState("");
  const [transferInputs, setTransferInputs] = useState({ from: "", to: "", value: "" });
  const [approvalInputs, setApprovalInputs] = useState({ owner: "", spender: "", value: "" });
  console.log("Transfer operator is:",transferOperator);
  console.log("Approval operator is:",approvalOperator);

//useEffect for fetch the Previous events
  useEffect(() => {
    const fetchMonitorEvents = async () => {
      try {
        const res = await fetch("https://139-59-5-56.nip.io:3443/get_event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mid: m_id }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setEvents(data.monitors);

        data.monitors.forEach(event => {
          if (event.name === 'Transfer') {
            // setSelectedValues(selectedValues => [...selectedValues, "Transfer"]);
            setSelectedValues(selectedValues => {
              if (!selectedValues.includes("Transfer")) {
                return [...selectedValues, "Transfer"];
              }
              return selectedValues;
            });
            setFoundedEvents(foundedEvents =>
              {
                if (!foundedEvents.includes("Transfer")) {
                  return [...foundedEvents, "Transfer"];
                }
                return foundedEvents;
              });

            // Parse and set Transfer inputs
            const parsedArgs = parseArguments(event.arguments);
            
            let operator = ''
            let value = parsedArgs.value;

            if (value) {
              // Extract the operator from the beginning of the value along with "::"
              const operatorMatch = value.match(/^(<|>|==)::/);
              if (operatorMatch) {
                operator = operatorMatch[0]; // Keep the operator with "::"
                // console.log("Prev operator is:", operator);
                value = value.replace(/^(<|>|==)::/, ''); // Remove the operator with "::" from value
              }
            }

            setTransferInputs({
              from: parsedArgs.from || '',
              to: parsedArgs.to || '',
              value: value || ''
            });
            setTransferOperator(operator);

          } else if (event.name === 'Approval') {
            setSelectedValues(selectedValues => {
              if (!selectedValues.includes("Approval")) {
                return [...selectedValues, "Approval"];
              }
              return selectedValues;
            });
            setFoundedEvents(foundedEvents =>
              {
                if (!foundedEvents.includes("Approval")) {
                  return [...foundedEvents, "Approval"];
                }
                return foundedEvents;
              }
            );
            // setSelectedValues(selectedValues => [...selectedValues, "Approval"]);
            // Parse the arguments and extract values
            const parsedArgs = parseArguments(event.arguments);
            // console.log("parsed args are:",parsedArgs);

            // Extract operator from value if present
            let operator = ''
            let value = parsedArgs.value;

            if (value) {
              // Extract the operator from the beginning of the value along with "::"
              const operatorMatch = value.match(/^(<|>|==)::/);
              if (operatorMatch) {
                operator = operatorMatch[0]; // Keep the operator with "::"
                // console.log("Prev operator is:", operator);
                value = value.replace(/^(<|>|==)::/, ''); // Remove the operator with "::" from value
              }
            }

            setApprovalInputs({
              owner: parsedArgs.owner || '',
              spender: parsedArgs.spender || '',
              value: value || '' // Updated value without the operator
            });
            setApprovalOperator(operator);

          }
        });

        // Helper function to handle various JSON formats
function parseArguments(argumentsString) {
  let parsedArgs;

  try {
    // Remove leading and trailing quotes if present
    const cleanString = argumentsString.startsWith('"') && argumentsString.endsWith('"')
      ? argumentsString.slice(1, -1)
      : argumentsString;
    // Attempt to unescape the string
    const unescapedString = cleanString.replace(/\\(.)/g, "$1");

    // Parse the unescaped string
    parsedArgs = JSON.parse(unescapedString);

  } catch (error) {
    console.error("Failed to parse arguments:", error);
    parsedArgs = {};
  }

  return parsedArgs;
}
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchMonitorEvents();
  }, [m_id]);


  useEffect(() => {
    console.log("events are", events);
  }, [events]);

  useEffect(()=>{
    console.log("Transfer inputs are:",transferInputs);
    console.log("Approval inputs are:",approvalInputs);

  },[transferInputs,approvalInputs])


  const navigationState = {
    monitorName: name,
    network: networkState,
    address: addressState,
    rk: riskCategoryState,
    m_id: m_id,
    email: email,
    token: token,
  };

  const handleSubmit = async () => {
  

    // Check if either 'Transfer' or 'Approval' is selected
    if (!selectedValues.includes('Transfer') && !selectedValues.includes('Approval')) {
      console.error("No actions selected.");
      toast.error("Please select at least one action.");
      return;
    }
    try{

      if(selectedValues.includes('Transfer') && selectedValues.includes('Approval') && foundedEvents.includes('Transfer') && foundedEvents.includes('Approval')){
        
      //prevent from empty values
      if (!transferInputs.from || !transferInputs.to || !transferInputs.value || !transferOperator || transferOperator === "default") {
        console.error("Transfer inputs are incomplete.");
        toast.error("Please fill out all transfer fields.");
        return;
      }
      if (!approvalInputs.owner || !approvalInputs.spender || !approvalInputs.value || !approvalOperator|| approvalOperator === "default") {
        console.error("Approval inputs are incomplete.");
        toast.error("Please fill out all approval fields.");
        return;
      }

      // Fetch data from both APIs in parallel
      const [transferRes, approvalRes] = await Promise.all([
        fetch("https://139-59-5-56.nip.io:3443/update_event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: events.find((event) => event.name === "Transfer").id,
            name: "Transfer",
            arguments: JSON.stringify({
              from: transferInputs.from,
              to: transferInputs.to,
              value: transferOperator + transferInputs.value
            }),
          }),
        }),
        fetch("https://139-59-5-56.nip.io:3443/update_event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: events.find((event) => event.name === "Approval").id,
            name: "Approval",
            arguments: JSON.stringify({
              owner: approvalInputs.owner,
              spender: approvalInputs.spender,
              value: approvalOperator + approvalInputs.value
            }),
          }),
        }),
      ]);
      // if all response was sucess then show success toast, if any error occured then thow error toast
      if (transferRes.ok && approvalRes.ok) {
        toast.success("Events Updated successfully!", {
          autoClose: 500,
          onClose: () => {
            navigate("/alert_edit", { state: navigationState });
          },
        });
      } else {
        throw new Error('Error fetching data');
        toast.error("Failed to update Events. Please try again!");
      }

      }
      else if(!foundedEvents.includes('Approval') && !foundedEvents.includes('Transfer') && selectedValues.includes('Approval') && selectedValues.includes('Transfer')){
        if (!transferInputs.from || !transferInputs.to || !transferInputs.value || !transferOperator || transferOperator === "default") {
          console.error("Transfer inputs are incomplete.");
          toast.error("Please fill out all transfer fields.");
          return;
        }
        if (!approvalInputs.owner || !approvalInputs.spender || !approvalInputs.value || !approvalOperator|| approvalOperator === "default") {
          console.error("Approval inputs are incomplete.");
          toast.error("Please fill out all approval fields.");
          return;
        }
        const [transferRes, approvalRes] = await Promise.all([
          fetch("https://139-59-5-56.nip.io:3443/add_event", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Transfer",
              mid: m_id,
              arguments: JSON.stringify({
                from: transferInputs.from,
                to: transferInputs.to,
                value: transferOperator + transferInputs.value
              }),
            }),
          }),
          fetch("https://139-59-5-56.nip.io:3443/add_event", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Approval",
              mid: m_id,
              arguments: JSON.stringify({
                owner: approvalInputs.owner,
                spender: approvalInputs.spender,
                value: approvalOperator + approvalInputs.value
              }),
            }),
          }),
        ]);
        if (transferRes.ok && approvalRes.ok) {
          toast.success("Events Updated successfully!", {
            autoClose: 500,
            onClose: () => {
              navigate("/alert_edit", { state: navigationState });
            },
          });
        } else {
          throw new Error('Error fetching data');
          toast.error("Failed to update Events. Please try again!");
        }
      }
      else if(selectedValues.includes('Transfer') && !selectedValues.includes('Approval') && foundedEvents.includes('Transfer') ){

        if (!transferInputs.from || !transferInputs.to || !transferInputs.value || !transferOperator || transferOperator === "default") {
          console.error("Transfer inputs are incomplete.");
          toast.error("Please fill out all transfer fields.");
          return;
        }
        const transferRes = await fetch("https://139-59-5-56.nip.io:3443/update_event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: events.find((event) => event.name === "Transfer").id,
            name: "Transfer",
            arguments: JSON.stringify({
              from: transferInputs.from,
              to: transferInputs.to,
              value: transferOperator + transferInputs.value
            }),
          }),
        });
        if (transferRes.ok) {
          toast.success("Events Updated successfully!", {
            autoClose: 500,
            onClose: () => {
              navigate("/alert_edit", { state: navigationState });
            },
          });
        } else {
          throw new Error('Error fetching data');
          toast.error("Failed to update Events. Please try again!");
        }
      }
      else if(  selectedValues.includes('Transfer') && !selectedValues.includes('Approval') && !foundedEvents.includes('Transfer')){
        if (!transferInputs.from || !transferInputs.to || !transferInputs.value || !transferOperator || transferOperator === "default") {
          console.error("Transfer inputs are incomplete.");
          toast.error("Please fill out all transfer fields.");
          return;
        }
        const transferRes = await fetch("https://139-59-5-56.nip.io:3443/add_event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Transfer",
            mid: m_id,
            arguments: JSON.stringify({
              from: transferInputs.from,
              to: transferInputs.to,
              value: transferOperator + transferInputs.value
            }),
          }),
        });
        if (transferRes.ok) {
          toast.success("Events Updated successfully!", {
            autoClose: 500,
            onClose: () => {
              navigate("/alert_edit", { state: navigationState });
            },
          });
        } else {
          throw new Error('Error fetching data');
          toast.error("Failed to update Events. Please try again!");
        }
      }
      else if(selectedValues.includes('Approval') && !selectedValues.includes('Transfer') && foundedEvents.includes('Approval')){
        if (!approvalInputs.owner || !approvalInputs.spender || !approvalInputs.value || !approvalOperator|| approvalOperator === "default") {
          console.error("Approval inputs are incomplete.");
          toast.error("Please fill out all approval fields.");
          return;
        }
        const approvalRes = await fetch("https://139-59-5-56.nip.io:3443/update_event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: events.find((event) => event.name === "Approval").id,
            name: "Approval",
            arguments: JSON.stringify({
              owner: approvalInputs.owner,
              spender: approvalInputs.spender,
              value: approvalOperator + approvalInputs.value
            }),
          }),
        });
        if (approvalRes.ok) {
          toast.success("Events Updated successfully!", {
            autoClose: 500,
            onClose: () => {
              navigate("/alert_edit", { state: navigationState });
            },
          });
        } else {
          throw new Error('Error fetching data');
          toast.error("Failed to update Events. Please try again!");
        }
      }
      else if( selectedValues.includes('Approval') && !selectedValues.includes('Transfer') && !foundedEvents.includes('Approval') ){
        if (!approvalInputs.owner || !approvalInputs.spender || !approvalInputs.value || !approvalOperator|| approvalOperator === "default") {
          console.error("Approval inputs are incomplete.");
          toast.error("Please fill out all approval fields.");
          return;
        }
        const approvalRes = await fetch("https://139-59-5-56.nip.io:3443/add_event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Approval",
            mid: m_id,
            arguments: JSON.stringify({
              owner: approvalInputs.owner,
              spender: approvalInputs.spender,
              value: approvalOperator + approvalInputs.value
            }),
          }),
        });
        if (approvalRes.ok) {
          toast.success("Events Updated successfully!", {
            autoClose: 500,
            onClose: () => {
              navigate("/alert_edit", { state: navigationState });
            },
          });
        } else {
          throw new Error('Error fetching data');
          toast.error("Failed to update Events. Please try again!");
        }
      }
      else if(selectedValues.includes('Transfer') && selectedValues.includes('Approval') && !foundedEvents.includes('Transfer') && foundedEvents.includes('Approval')){
        if (!transferInputs.from || !transferInputs.to || !transferInputs.value || !transferOperator || transferOperator === "default") {
          console.error("Transfer inputs are incomplete.");
          toast.error("Please fill out all transfer fields.");
          return;
        }
        if (!approvalInputs.owner || !approvalInputs.spender || !approvalInputs.value || !approvalOperator|| approvalOperator === "default") {
          console.error("Approval inputs are incomplete.");
          toast.error("Please fill out all approval fields.");
          return;
        }
        const [transferRes, approvalRes] = await Promise.all([
          fetch("https://139-59-5-56.nip.io:3443/add_event", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Transfer",
              mid: m_id,
              arguments: JSON.stringify({
                from: transferInputs.from,
                to: transferInputs.to,
                value: transferOperator + transferInputs.value
              }),
            }),
          }),
          fetch("https://139-59-5-56.nip.io:3443/update_event", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: events.find((event) => event.name === "Approval").id,
              name: "Approval",
              arguments: JSON.stringify({
                owner: approvalInputs.owner,
                spender: approvalInputs.spender,
                value: approvalOperator + approvalInputs.value
              }),
            }),
          }),
        ]);
        if (transferRes.ok && approvalRes.ok) {
          toast.success("Events Updated successfully!", {
            autoClose: 500,
            onClose: () => {
              navigate("/alert_edit", { state: navigationState });
            },
          });
        } else {
          throw new Error('Error fetching data');
          toast.error("Failed to update Events. Please try again!");
        }
      }
      else if (selectedValues.includes('Transfer') && selectedValues.includes('Approval') && foundedEvents.includes('Transfer') && !foundedEvents.includes('Approval')) {
        if (!transferInputs.from || !transferInputs.to || !transferInputs.value || !transferOperator || transferOperator === "default") {
          console.error("Transfer inputs are incomplete.");
          toast.error("Please fill out all transfer fields.");
          return;
        }
        if (!approvalInputs.owner || !approvalInputs.spender || !approvalInputs.value || !approvalOperator|| approvalOperator === "default") {
          console.error("Approval inputs are incomplete.");
          toast.error("Please fill out all approval fields.");
          return;
        }
        const [transferRes, approvalRes] = await Promise.all([
          fetch("https://139-59-5-56.nip.io:3443/update_event", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: events.find((event) => event.name === "Transfer").id,
              name: "Transfer",
              arguments: JSON.stringify({
                from: transferInputs.from,
                to: transferInputs.to,
                value: transferOperator + transferInputs.value
              }),
            }),
          }),
          fetch("https://139-59-5-56.nip.io:3443/add_event", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Approval",
              mid: m_id,
              arguments: JSON.stringify({
                owner: approvalInputs.owner,
                spender: approvalInputs.spender,
                value: approvalOperator + approvalInputs.value
              }),
            }),
          }),
        ]);
        if (transferRes.ok && approvalRes.ok) {
          toast.success("Events Updated successfully!", {
            autoClose: 500,
            onClose: () => {
              navigate("/alert_edit", { state: navigationState });
            },
          });
        } else {
          throw new Error('Error fetching data');
          toast.error("Failed to update Events. Please try again!");
        }
      }
    }catch (error) {
      console.error("Error sending event data:", error);
      toast.error("Failed to update Event. Please try again!");
    }
  };


  if (
    !events ||
    !Array.isArray(events)
  ) {
    return (
      <div
        className="font-poppin pt-2 bg-white min-h-full"
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
        <div className="w-full mx-auto mt-10 md:mt-20 flex items-center justify-center flex-col gap-7  flex-wrap md:flex-row md:gap-10 lg:gap-20">

          <div className="">
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
              onClick={() => {
                navigate("/function", { state: { email, mid, token } });
              }}
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
              onClick={() => {
                navigate("/alerts", { state: { email, mid, token } });
              }}
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

          <div className="">
            <div className="font-medium text-lg" style={{ color: "black" }}>
              {loading ? (<span className="loading loading-spinner text-green-800"></span>) : "No Events Found"}
            </div>
          </div>

          <div className="border border-[#0CA851] shadow-md p-5 rounded-xl">
            <div className="text-lg font-medium" style={{ color: "black" }}>
              Monitor Summary
            </div>
            <div className="flex gap-2">
              <div>
                <div
                  className="text-center font-medium"
                  style={{ color: "black" }}
                >
                  Networks
                </div>
                <div className="text-white bg-[#0CA851] rounded-md p-2 text-[13px]">
                  {/* {networkState} */}
                  {networkState === 80002
                    ? "Amoy"
                    : networkState === 1
                      ? "Ethereum Mainnet"
                      : networkState === 11155111
                        ? "Sepolia Testnet"
                        : networkState === 137
                          ? "Polygon Mainnet"
                          : "Unknown"}
                </div>
              </div>
              <div>
                <div
                  className="text-center font-medium"
                  style={{ color: "black" }}
                >
                  Risk Category
                </div>
                <div className=" bg-[#E9E9E9] rounded-md p-2 text-[13px]">
                  {rk}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-medium" style={{ color: "black" }}>
                Contracts
              </div>
              <div className="flex gap-1">
                <div className=" bg-[#E9E9E9] rounded-md p-2 text-[13px]">
                  {addressState}
                </div>
                <div className="my-auto">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_179_2771)">
                      <path
                        d="M15.1074 7.65955H8.35742C7.52899 7.65955 6.85742 8.33112 6.85742 9.15955V15.9095C6.85742 16.738 7.52899 17.4095 8.35742 17.4095H15.1074C15.9358 17.4095 16.6074 16.738 16.6074 15.9095V9.15955C16.6074 8.33112 15.9358 7.65955 15.1074 7.65955Z"
                        stroke="#434343"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.85742 12.1595H3.10742C2.7096 12.1595 2.32807 12.0015 2.04676 11.7202C1.76546 11.4389 1.60742 11.0574 1.60742 10.6595V3.90955C1.60742 3.51172 1.76546 3.13019 2.04676 2.84889C2.32807 2.56758 2.7096 2.40955 3.10742 2.40955H9.85742C10.2552 2.40955 10.6368 2.56758 10.9181 2.84889C11.1994 3.13019 11.3574 3.51172 11.3574 3.90955V4.65955"
                        stroke="#434343"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_179_2771">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0.107422 0.909546)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-medium" style={{ color: "black" }}>
                Event Conditions
              </div>
              {/* {Object.keys(selectedEvents).length > 0 ? (
              <ul>
                {Object.entries(selectedEvents).map(
                  ([eventName, eventData]) => {
                    const argTypes = eventDetails
                      .find((e) => e.name === eventName)
                      .inputs.split(", ")
                      .map((arg) => arg.split(": ")[1]) // Extract only the types
                      .join(", "); // Join types with commas

                    return (
                      <li key={eventName} className="text-[13px]">
                        {eventName} ({argTypes})
                      </li>
                    );
                  }
                )}
              </ul>
            ) : (
              <div className="text-[13px]">No events selected</div>
            )} */}
            </div>
            <div className="mt-3">
              <div className="font-medium" style={{ color: "black" }}>
                Function Conditions
              </div>
              <div
                className="text-[13px]"
                style={{ display: `${disp1 == "none" ? "block" : "none"}` }}
              >
                None
              </div>
              <div style={{ display: disp1 }}>
                <div className="text-[13px]">approve(address,uint256)</div>
                <div className="text-[13px]">
                  decreaseAllowance(address,uint256)
                </div>
                <div className="text-[13px]">
                  increaseAllowance(address,uint256)
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-medium" style={{ color: "black" }}>
                Alerts
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-[13px]" style={{ color: "black" }}>
                  Marked as
                </div>
                <div className=" bg-[#E9E9E9] rounded-md py-1 px-2 text-[13px]">
                  Medium Severity
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      className="font-poppin pt-2 bg-white min-h-full"
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
      <div className="w-full mx-auto mt-10 md:mt-20 flex items-center justify-center flex-col gap-7  flex-wrap md:flex-row md:gap-10 lg:gap-20">

        <div className="">
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
            onClick={() => {
              navigate("/function", { state: { email, mid, token } });
            }}
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
            onClick={() => {
              navigate("/alerts", { state: { email, mid, token } });
            }}
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

        <div className="">
          <div className="font-medium text-lg" style={{ color: "black" }}>
            Choose the Signature Name
          </div>
          <div className="my-auto ml-auto">
            <div className="flex flex-col  gap-4 m-3">
              <Select 
                options={options}
                defaultValue={options.filter((option) => selectedValues.includes(option.value))}
                isMulti
                onChange={(selectedOptions) => {
                  const values = selectedOptions.map((option) => option.value);
                  setSelectedValues(values);
                }}

              />
            </div>

            <div className="mt-5">

              {selectedValues.includes('Transfer') && (
                <>
                  <div className="mt-3 text-black font-medium mb-3">Transfer :</div>
                  <div className="flex flex-col gap-3">
                    <input
                      className="w-full rounded-lg p-2 outline-none border border-[#4C4C4C]"
                      style={{ backgroundColor: "white" }}
                      placeholder="from:address"
                      value={transferInputs.from || ""}
                      required
                      onChange={(e) => {
                        setTransferInputs({ ...transferInputs, from: e.target.value });
                      }}
                    />
                    <input
                      className="w-full rounded-lg p-2 outline-none border border-[#4C4C4C]"
                      style={{ backgroundColor: "white" }}
                      placeholder="to:address"
                      value={transferInputs.to || ""}
                      required
                      onChange={(e) => {
                        setTransferInputs({ ...transferInputs, to: e.target.value });
                      }}
                    />
                     <div className="flex gap-3">
                      <select
                        className="w-[50%] bg-white border rounded-lg border-black"
                        onChange={(e) => {
                          setTransferOperator(e.target.value);
                        }}
                        required
                        value={transferOperator || ""}
                      >
                        <option hidden selected={transferOperator=='' || transferOperator==undefined || transferOperator==null}>uint</option>
                        <option  value="<::" selected={transferOperator=="<::"}>&lt;</option>
                        <option  value=">::" selected={transferOperator==">::"}>&gt;</option>
                        <option  value="==::" selected={transferOperator=="==::"}>==</option>
                      </select>
                      <input
                        className="w-[50%] rounded-lg p-2 outline-none border border-[#4C4C4C]"
                        style={{ backgroundColor: "white" }}
                        placeholder="uint256"
                        value={transferInputs.value || ""}
                        required
                        onChange={(e) => {
                          setTransferInputs({ ...transferInputs, value: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedValues.includes('Approval') && (
                <>
                  <div className="mt-3 text-black font-medium mb-3">Approval :</div>
                  <div className="flex flex-col gap-3">
                    <input
                      className="w-full rounded-lg p-2 outline-none border border-[#4C4C4C]"
                      style={{ backgroundColor: "white" }}
                      placeholder="Owner:address"
                      value={approvalInputs.owner || ""}
                      required
                      onChange={(e) => {
                        setApprovalInputs({ ...approvalInputs, owner: e.target.value });
                      }}
                    />
                    <input
                      className="w-full rounded-lg p-2 outline-none border border-[#4C4C4C]"
                      style={{ backgroundColor: "white" }}
                      placeholder="Spender:address"
                      value={approvalInputs.spender || ""}
                      required
                      onChange={(e) => {
                        setApprovalInputs({ ...approvalInputs, spender: e.target.value });
                      }}
                    />
                    <div className="flex gap-3">
                      <select
                        name=""
                        id=""
                        className="w-[50%] bg-white border rounded-lg border-black"
                        onChange={(e) => {
                          setApprovalOperator(e.target.value);
                        }}
                        required
                        value={approvalOperator||""}
                      >
                        <option hidden selected={approvalOperator=='' || approvalOperator==undefined || approvalOperator==null}>uint</option>
                        <option  value="<::" selected={approvalOperator=="<::"}>&lt;</option>
                        <option  value=">::" selected={approvalOperator==">::"}>&gt;</option>
                        <option  value="==::" selected={approvalOperator== "==::" }>==</option>
                      </select>
                      <input
                        className="w-[50%] rounded-lg p-2 outline-none border border-[#4C4C4C]"
                        style={{ backgroundColor: "white" }}
                        placeholder="uint256"
                        value={approvalInputs.value || ""}
                        required
                        onChange={(e) => {
                          setApprovalInputs({ ...approvalInputs, value: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

            </div>

          </div>
          <button
            className="py-3 w-full bg-[#28AA61]  rounded-lg text-white mt-5"
            onClick={handleSubmit}
          >
            Save Monitor
          </button>
        </div>

        <div className="border border-[#0CA851] shadow-md p-5 rounded-xl">
          <div className="text-lg font-medium" style={{ color: "black" }}>
            Monitor Summary
          </div>
          <div className="flex gap-2">
            <div>
              <div
                className="text-center font-medium"
                style={{ color: "black" }}
              >
                Networks
              </div>
              <div className="text-white bg-[#0CA851] rounded-md p-2 text-[13px]">
                {/* {networkState} */}
                {networkState === 80002
                  ? "Amoy"
                  : networkState === 1
                    ? "Ethereum Mainnet"
                    : networkState === 11155111
                      ? "Sepolia Testnet"
                      : networkState === 137
                        ? "Polygon Mainnet"
                        : "Unknown"}
              </div>
            </div>
            <div>
              <div
                className="text-center font-medium"
                style={{ color: "black" }}
              >
                Risk Category
              </div>
              <div className=" bg-[#E9E9E9] rounded-md p-2 text-[13px]">
                {rk}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-medium" style={{ color: "black" }}>
              Contracts
            </div>
            <div className="flex gap-1">
              <div className=" bg-[#E9E9E9] rounded-md p-2 text-[13px]">
                {addressState}
              </div>
              <div className="my-auto">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_179_2771)">
                    <path
                      d="M15.1074 7.65955H8.35742C7.52899 7.65955 6.85742 8.33112 6.85742 9.15955V15.9095C6.85742 16.738 7.52899 17.4095 8.35742 17.4095H15.1074C15.9358 17.4095 16.6074 16.738 16.6074 15.9095V9.15955C16.6074 8.33112 15.9358 7.65955 15.1074 7.65955Z"
                      stroke="#434343"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.85742 12.1595H3.10742C2.7096 12.1595 2.32807 12.0015 2.04676 11.7202C1.76546 11.4389 1.60742 11.0574 1.60742 10.6595V3.90955C1.60742 3.51172 1.76546 3.13019 2.04676 2.84889C2.32807 2.56758 2.7096 2.40955 3.10742 2.40955H9.85742C10.2552 2.40955 10.6368 2.56758 10.9181 2.84889C11.1994 3.13019 11.3574 3.51172 11.3574 3.90955V4.65955"
                      stroke="#434343"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_179_2771">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(0.107422 0.909546)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-medium" style={{ color: "black" }}>
              Event Conditions
            </div>
            {/* {Object.keys(selectedEvents).length > 0 ? (
              <ul>
                {Object.entries(selectedEvents).map(
                  ([eventName, eventData]) => {
                    const argTypes = eventDetails
                      .find((e) => e.name === eventName)
                      .inputs.split(", ")
                      .map((arg) => arg.split(": ")[1]) // Extract only the types
                      .join(", "); // Join types with commas

                    return (
                      <li key={eventName} className="text-[13px]">
                        {eventName} ({argTypes})
                      </li>
                    );
                  }
                )}
              </ul>
            ) : (
              <div className="text-[13px]">No events selected</div>
            )} */}
          </div>
          <div className="mt-3">
            <div className="font-medium" style={{ color: "black" }}>
              Function Conditions
            </div>
            <div
              className="text-[13px]"
              style={{ display: `${disp1 == "none" ? "block" : "none"}` }}
            >
              None
            </div>
            <div style={{ display: disp1 }}>
              <div className="text-[13px]">approve(address,uint256)</div>
              <div className="text-[13px]">
                decreaseAllowance(address,uint256)
              </div>
              <div className="text-[13px]">
                increaseAllowance(address,uint256)
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-medium" style={{ color: "black" }}>
              Alerts
            </div>
            <div className="flex gap-1 items-center">
              <div className="text-[13px]" style={{ color: "black" }}>
                Marked as
              </div>
              <div className=" bg-[#E9E9E9] rounded-md py-1 px-2 text-[13px]">
                Medium Severity
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Event_Edit;
