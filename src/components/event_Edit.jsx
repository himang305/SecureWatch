import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbar2";
import Select from 'react-select'

function Event_Edit() {
  const navigate = useNavigate();
  const location = useLocation();

  const [options, setOptions] = useState([]);
  const [foundedEvents, setFoundedEvents] = useState([]);
  const [selectedValues, setSelectedValues] = useState([])
  const [totalEvents, setTotalEvents] = useState([])
  console.log("Selected values:", selectedValues.length);

  const { name, email, m_id, token, network, abi, address, rk,alert_data,alert_type } = location.state || "";
  const [networkState, setNetworkState] = useState(network || "");
  const [addressState, setAddressState] = useState(address || "");
  const [riskCategoryState, setRiskCategoryState] = useState(rk || "");
  const [eventOperators, setEventOperators] = useState({});
  const [abiState, setAbiState] = useState(abi || "");
  const [eventInputs, setEventInputs] = useState({});
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




  useEffect(() => {
    if (!location.state || !location.state.abi) {
      console.error("ABI is not provided");
      return;
    }

    let parsedAbi;
    try {
      parsedAbi = JSON.parse(location.state.abi);
    } catch (error) {
      console.error("Failed to parse ABI:", error);
      return;
    }

    const events = parsedAbi.filter((item) => item.type === "event");
    setFoundedEvents(
      events.map((event) => ({
        name: event.name,
        inputs: event.inputs
          .map((input) => `${input.name}: ${input.type}`)
          .join(", "),
      }))
    );
  }, [
    location.state,
    networkState,
    addressState,
    riskCategoryState,
    abiState,
  ]);

  useEffect(() => {
    const parsedOptions = foundedEvents.map((event) => ({
      label: `${event.name} `,
      value: event.name,
    }));
    // (${event.inputs})
    console.log("Parsed options are:", parsedOptions);
    setTotalEvents(parsedOptions)
  }, [foundedEvents])



  useEffect(() => {
    const fetchMonitorEvents = async () => {
      try {
        if (!m_id) {
          console.warn('m_id is not set');
          return;
        }
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
        const events = data.monitors || [];

        // Initialize options
        const newOptions = events.map(event => ({
          label: event.name,
          value: event.name,
        }));
        setOptions(newOptions);

        // Initialize eventInputs and eventOperators
        const newEventInputs = {};
        const newEventOperators = {};

        events.forEach(event => {
          const parsedArgs = parseArguments(event.arguments);
          newEventInputs[event.name] = parsedArgs;

          if (parsedArgs.value) {
            const operatorMatch = parsedArgs.value.match(/^(<|>|==)::/);
            if (operatorMatch) {
              newEventOperators[event.name] = operatorMatch[0];
            }
          }
        });

        setEvents(events);
        setEventInputs(newEventInputs);
        setEventOperators(newEventOperators);

        // Select previously updated events
        const previouslySelected = Object.keys(newEventInputs);
        setSelectedValues(previouslySelected);

      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchMonitorEvents();
  }, [m_id]);


  useEffect(() => {
    console.log("Events are:", events);
    console.log("Event Inputs are:",eventInputs);
    console.log("Event Operators are:",eventOperators);
    console.log("Selected values:", selectedValues);
  }, [events, eventInputs, eventOperators, selectedValues]);

  const parseArguments = (argumentsString) => {
    try {
      const cleanString = argumentsString.startsWith('"') && argumentsString.endsWith('"')
        ? argumentsString.slice(1, -1)
        : argumentsString;
      const unescapedString = cleanString.replace(/\\(.)/g, "$1");
      return JSON.parse(unescapedString);
    } catch (error) {
      console.error("Failed to parse arguments:", error);
      return {};
    }
  };

  const handleInputChange = (eventName, inputName, value) => {
    setEventInputs(prevInputs => ({
      ...prevInputs,
      [eventName]: {
        ...prevInputs[eventName],
        [inputName]: value
      }
    }));
  };



  const handleOperatorChange = (eventName,inputName, value) => {
    setEventInputs(prevInputs => ({
      ...prevInputs,
      [eventName]: {
        ...prevInputs[eventName],
        [inputName]: value.concat(/^\d/.test(prevInputs[eventName][inputName]) ? prevInputs[eventName][inputName] : prevInputs[eventName][inputName].startsWith('<') || prevInputs[eventName][inputName].startsWith('>') ? prevInputs[eventName][inputName].substring(3) : prevInputs[eventName][inputName].substring(4))        
      }
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setSelectedValues(values);
  };

  // Ensure ABI data is correctly parsed
  const abiData = JSON.parse(abiState || '[]');
  const abiEventsMap = abiData.reduce((acc, e) => {
    acc[e.name] = e;
    return acc;
  }, {});




  const navigationState = {
    monitorName: name,
    network: networkState,
    address: addressState,
    rk: riskCategoryState,
    m_id: m_id,
    email: email,
    token: token,
    alert_data: alert_data,
    alert_type: alert_type,
  };

  const handleSubmit = async () => {
    try {
      const errors = [];
      const processingEvents = [];
      const successStatus = new Map(); // Track success status for each event
      let hasChanges = false;
  
      // Helper function to validate inputs
      const validateInputs = (eventType, inputs) => {
        const requiredFields = Object.keys(inputs).filter(field => inputs[field] !== undefined && inputs[field] !== null);
        const incompleteFields = requiredFields.filter(field => !inputs[field]);
  
        if (incompleteFields.length > 0) {
          errors.push({
            eventType,
            message: `${eventType} inputs are incomplete. Please fill in all required fields.`
          });
          return false;
        }
        return true;
      };
  
      // Helper function to send requests
      const sendRequest = async (url, method, data) => {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`Error fetching data from ${url}`);
        }
        return response.json(); // Return response JSON for further processing
      };
  
      // Helper function to prepare event data
      const prepareEventData = (eventType, inputs) => {
        const cleanedValue = (inputs.value || "")
        return {
          name: eventType,
          arguments: {
            ...inputs,
            value: cleanedValue,
          },
        };
      };
  
      // Fetch existing events from the monitor
      const fetchEventsFromMonitor = async (monitorId) => {
        const response = await fetch('https://139-59-5-56.nip.io:3443/get_event', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mid: monitorId }),
        });
        if (!response.ok) {
          throw new Error('Error fetching event data');
        }
        return response.json(); // Return response JSON for further processing
      };
  
      // Fetch events from monitor
      const monitorEventsResponse = await fetchEventsFromMonitor(m_id);
  
      // Log the entire response to verify structure
      console.log("Fetched monitor events response:", monitorEventsResponse);
  
      // Extract the monitorEvents array from the response
      const monitorEvents = monitorEventsResponse.monitors || []; // Default to empty array if missing
  
      // Check if monitorEvents is an array
      if (Array.isArray(monitorEvents)) {
        // Create a map of existing events by their ID for quick lookup
        const eventMap = new Map(monitorEvents.map(event => [event.id, event]));
  
        // Log the eventMap to verify its content
        console.log("Event map:", Array.from(eventMap.entries()));
  
        // Process each selected event dynamically
        for (const eventType of selectedValues) {
          const inputs = eventInputs[eventType] || {};
  
          // Log inputs to verify data
          console.log(`Processing eventType: ${eventType}`);
          console.log(`Inputs for ${eventType}:`, inputs);
  
          // Validate inputs
          if (!validateInputs(eventType, inputs)) {
            continue;
          }
  
          // Prepare request data
          const eventData = prepareEventData(eventType, inputs);
          console.log(`Prepared event data for ${eventType}:`, eventData);
          
         
  
          // Check if the event ID exists in the fetched monitor events
          const eventId = inputs.id;
  
          // Debugging logs
          console.log(`Event ID to check: ${eventId}`);
  
          // Find the existing event based on ID or fallback to name
          let existingEvent = eventId ? eventMap.get(eventId) : null;
  
          if (!existingEvent && eventId === undefined) {
            // If no event found by ID and ID is undefined, try to find by name (fallback method)
            const normalizedEventType = eventType.trim().toLowerCase();
            existingEvent = monitorEvents.find(event => event.name.trim().toLowerCase() === normalizedEventType);
          }
  
          console.log(`Existing event:`, existingEvent);
          console.log("Existing event arugments:", existingEvent?.arguments);
          console.log("xisting event arugments value:", eventData.arguments.value);
          
          if(eventData.arguments.value=="" || eventData.arguments.value=== undefined || eventData.arguments.value=== null){
            console.warn("Invalid value field, please enter the valid value for all fields.");
              toast.error("Invalid value field, please enter the valid value for all fields.");
              return false;
          }

          if (eventData.arguments.value) {
            const operators = ['<', '>', '=']; // Define the valid operators
            const operator = eventData.arguments.value.charAt(0); // Get the first character of the value
          // <:: >:: ==::
            if (!operators.includes(operator)) {
              console.warn("Invalid value field in argsObject.");
              toast.error("Please choose a valid operator (<, >, =) for each value field.");
              return false; // Exit if the value field is invalid
            }
          
            // Function to check if a character is a digit
            const isDigit = (char) => /\d/.test(char);
          
            // Check if the value is valid based on the operator
            if (operator === '<' || operator === '>') {
              const thirdChar = eventData.arguments.value.charAt(3);
              if (!isDigit(thirdChar)) {
                console.warn("Invalid number after operator in argsObject.");
                toast.error("Please enter a valid number after the operator for all value field.");
                return false; // Exit if the value field is invalid
              }
            } else if (operator === '=') {
              const fourthChar = eventData.arguments.value.charAt(4);
              if (!isDigit(fourthChar)) {
                console.warn("Invalid number after operator in argsObject.");
                toast.error("Please enter a valid number after the operator for all value field.");
                return false; // Exit if the value field is invalid
              }
            }
          }
  
          // Check for valid existing event and process accordingly
          if (existingEvent) {
            // If event is found and the name matches, update it
            if (existingEvent.name.trim().toLowerCase() === eventType.trim().toLowerCase()) {
              console.log(`Updating existing event: ${eventType} with ID: ${existingEvent.id}`);
              
              const requestData = { id: existingEvent.id, ...eventData };
  
              processingEvents.push(
                sendRequest("https://139-59-5-56.nip.io:3443/update_event", "POST", requestData)
                  .then(response => {
                    console.log(`${eventType} updated successfully!`, response);
                    successStatus.set(eventType, true); // Mark as successful
                    hasChanges = true;
                  })
                  .catch(error => {
                    console.error(`Error updating ${eventType}:`, error);
                    errors.push({
                      eventType,
                      message: `Failed to update ${eventType} event. Please try again!`
                    });
                    successStatus.set(eventType, false); // Mark as failed
                  })
              );
            } else {
              console.log(`Event name mismatch: '${eventType}' does not match '${existingEvent.name}'. Skipping.`);
              successStatus.set(eventType, false); // Mark as failed
            }
          } else {
            // If event is not found, add it
            console.log(`Adding new event: ${eventType}`);
            const requestData = { mid: m_id, ...eventData };
  
            processingEvents.push(
              sendRequest("https://139-59-5-56.nip.io:3443/add_event", "POST", requestData)
                .then(response => {
                  console.log(`${eventType} added successfully!`, response);
                  successStatus.set(eventType, true); // Mark as successful
                  hasChanges = true;
                })
                .catch(error => {
                  console.error(`Error adding ${eventType}:`, error);
                  errors.push({
                    eventType,
                    message: `Failed to add ${eventType} event. Please try again!`
                  });
                  successStatus.set(eventType, false); // Mark as failed
                })
            );
          }
        }
  
        // Wait for all event requests to complete
        await Promise.all(processingEvents);
  
        // Display success and error toasts
        const allSuccessful = Array.from(successStatus.values()).every(status => status);
  
        if (allSuccessful) {
          // Display success toasts
          selectedValues.forEach(eventType => {
            if (successStatus.get(eventType)) {
              toast.success(`${eventType} event processed successfully!`);
            }
          });
          toast.success("Event updated successfully!", {
            autoClose: 500,
            onClose: () => {
              navigate("/alert_edit", { state: navigationState });
            },
          });
          // Redirect after success toasts are shown
          
        } else {
          // Display validation errors for incomplete inputs
          toast.error("Faild to update event. Please try again!");
          errors.forEach(({ eventType, message }) => toast.error(message));
        }
      } else {
        console.error("monitorEvents is not an array or is missing.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again!");
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
  const copyMessage = () => {
    navigator.clipboard.writeText(addressState);
    toast.success("Address Copied successfully!");
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

        <div className="sm:ml-5 md:ml-10 lg:ml-40 ">
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

        <div className="w-[90%] sm:w-80 lg:w-[500px] mx-auto mt-5 mb-5 md:mt-0 md:mb-0  h-[500px] flex flex-col justify-start items-center md:overflow-y-auto  lg:pt-10">
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="font-medium text-lg" style={{ color: "black" }}>
              Choose the Signature Name
            </div>

            <div className="my-auto   min-w-full">
              <div className="flex flex-col gap-4 m-3">
                <Select
                  isMulti
                  options={totalEvents}
                  defaultValue={options}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
          </div>


          <div className="w-full  max-h-[400px] p-5 overflow-y-auto mb-2 edit-event mt-2">
                {selectedValues.length === 0 ? (
                  <p>No events selected.</p>
                ) : (
                  selectedValues.map(eventName => {
                    const abiEvent = abiEventsMap[eventName];
                    if (!abiEvent) {
                      console.warn(`ABI Event not found for: ${eventName}`);
                      return null;
                    }
                    console.log("abiEvent", abiEvent);

                    return (
                      <div key={eventName}>
                        <div className="mt-3 text-black font-medium mb-3">{eventName} :</div>
                        <div className="flex flex-col gap-3">
                          {abiEvent.inputs.map(input => (
                            <div>
                            <input
                              key={input.name}
                              className="w-full rounded-lg p-2 outline-none border border-[#4C4C4C]"
                              style={{ backgroundColor: "white" }}
                              placeholder={`${input.name}: ${input.type}`}
                              value={eventInputs[eventName]?.[input.name] || ""}
                              required
                              onChange={(e) => handleInputChange(eventName, input.name, e.target.value)}
                            />
                            {input.name === 'value' && ( <div className="flex gap-3">
                              <select
                                className="w-full py-2 bg-white border rounded-lg border-black mt-5"
                                onChange={(e) => handleOperatorChange(eventName, input.name ,e.target.value)}
                                required
                                // value={eventInputs[eventName]?.[input.name].slice(0,1) || ""}
                              >
                                <option hidden value="default">Select operator</option>
                                <option value="<::">&lt;</option>
                                <option value=">::">&gt;</option>
                                <option value="==::">==</option>
                              </select>
                            </div>)}
                          
                          </div>
                          )
                          )}
                          {/* {abiEvent.inputs.some(input => input.name === 'value') && (
                            <div className="flex gap-3">
                              <select
                                className="w-full py-2 bg-white border rounded-lg border-black"
                                onChange={(e) => handleOperatorChange(eventName, e.target.value)}
                                required
                                value={eventOperators[eventName] || ""}
                              >
                                <option hidden value="default">uint</option>
                                <option value="<::">&lt;</option>
                                <option value=">::">&gt;</option>
                                <option value="==::">==</option>
                              </select>
                            </div>
                          )} */}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

          <button
            className="py-3 w-full bg-[#28AA61]  rounded-lg text-white mt-5"
            onClick={handleSubmit}
          >
            Save Monitor
          </button>
        </div>

        <div className="mt-4 md:mt-0 border border-[#0CA851] mx-auto shadow-md p-4 md:p-10 rounded-xl mb-3 md:mb-0">
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
                {addressState.slice(0, 6) + "..." + addressState.slice(-4)}
              </div>
              <button onClick={copyMessage}>
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
              </button>
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
    </div >
  );
}

export default Event_Edit;
