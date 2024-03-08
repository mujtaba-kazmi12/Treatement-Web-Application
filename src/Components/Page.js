import React from 'react';
import { useLocation } from 'react-router-dom'; // Continue to use useLocation

const Page = () => {
  const location = useLocation(); // Access the location object

  // Function to parse query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message'); // Retrieve the 'message' query parameter

  return (
    <div>
      {message ? <h1>{message}</h1> : <h1>No message specified</h1>} {/* Display the message if available */}
    </div>
  );
}

export default Page;
