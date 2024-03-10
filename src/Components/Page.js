
import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
// Dummy data with multiple conditions and treatments
const conditionsData = [
  {
    name: "Excess Hair",
    bodyPart: "Chest",
    treatments: [
      {
        category: "Aesthetic",
        name: "Laser Hair Removal",
        description: "Laser Hair Removal uses the most innovative technology to safely and effectively reduce unwanted facial and body hair."
      },
      {
        category: "Aesthetic",
        name: "Intense Pulsed Light",
        description: "Intense Pulsed Light (IPL) treatments can reduce hair growth, targeting the pigment in the hair."
      },
      {
        category: "Aesthetic",
        name: "Electrolysis",
        description: "Electrolysis is a method of hair removal that involves inserting a fine probe into the hair follicle and applying an electric current."
      },
     
    ],
  },
  {
    name: "Skin Elasticity",
    bodyPart: "Face",
    treatments: [
      {
        category: "Skincare",
        name: "Collagen Induction Therapy",
        description: "Collagen Induction Therapy, also known as microneedling, promotes skin rejuvenation by stimulating collagen production."
      },
      {
        category: "Skincare",
        name: "Ultherapy",
        description: "Ultherapy uses ultrasound technology to strengthen the skin from within, for a non-invasive lift of the brow, neck, and under-chin areas."
      },
      {
        category: "Skincare",
        name: "Thermage",
        description: "Thermage treatments use radiofrequency technology to tighten and smooth the skin."
      },
    ],
  },
  // ... other conditions
];

const TreatmentCard = ({ category, name, description }) => (
  <div className="flex flex-col items-stretch bg-white shadow-lg rounded-lg p-4 m-2 w-64 h-80">
    <div className="bg-gray-100 text-xs uppercase font-semibold text-gray-700 p-2 inline-block rounded-full mb-4">{category}</div>
    <h3 className="font-bold mb-2">{name}</h3>
    <p className="text-gray-600 text-sm flex-grow mb-4">{description}</p>
    <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300 ease-in-out">
      Learn More
    </button>
  </div>
);

const ConditionSection = ({ condition }) => (
  <div className="flex flex-col md:flex-row md:items-start mb-10">
    <div className="md:w-1/4">
      <h2 className="text-2xl font-bold">{condition.name}</h2>
      <p className="text-md text-gray-800">{condition.bodyPart}</p>
      <p className="text-sm text-gray-600 mt-1 mb-6 md:mb-0">These are the treatments we recommend.</p>
    </div>
    <div className="md:flex-1">
      <div className="flex flex-wrap justify-start items-stretch -m-2">
        {condition.treatments.map((treatment, index) => (
          <TreatmentCard key={index} {...treatment} />
        ))}
      </div>
    </div>
  </div>
);

const ConditionLayout = () => {
  const location = useLocation();

  const [apiData, setApiData] = useState(null); // State to store the API response

  // Function to parse query parameters from the URL
  
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectionsEncoded = queryParams.get('selections');

    if (selectionsEncoded) {
      // Append 'selections' query parameter directly to the URL
      const apiEndpoint = `https://health-app-backend-ten.vercel.app/getTreatments?selections=${selectionsEncoded}`;

      const fetchData = async () => {
        try {
          const response = await fetch(apiEndpoint, {
            method: 'POST', // Keeping the method as POST
            headers: {
              // Adjust headers as needed. This could be minimal if the API does not require a body.
            },
            // No body is included since the data is sent through the URL
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setApiData(data); // Process the response data as needed
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [location.search]);
  return(
    <>
    <Navbar/>
    <div className="container mx-auto px-6 py-8 mt-5">
    {conditionsData.map((condition, index) => (
      <ConditionSection key={index} condition={condition} />
    ))}
  </div></>
    
  )
  

    }


export default ConditionLayout;
