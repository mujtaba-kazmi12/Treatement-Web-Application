
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from './Navbar';

// const TreatmentCard = ({ name, description }) => (
//   <div className="flex flex-col items-stretch bg-white shadow-lg rounded-lg p-4 m-2 w-64 h-80">
//     <h3 className="font-bold mb-2">{name}</h3>
//     <p className="text-gray-600 text-sm flex-grow mb-4">{description}</p>
//     <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300 ease-in-out">
//       Learn More
//     </button>
//   </div>
// );

// const ConditionSection = ({ condition }) => (
//   <div className="flex flex-col md:flex-row md:items-start mb-10">
//     <div className="md:w-1/4">
//       <h2 className="text-2xl font-bold">{condition.concern}</h2>
//       <p className="text-md text-gray-800">{condition.bodyParts}</p>
//       <p className="text-sm text-gray-600 mt-1 mb-6 md:mb-0">These are the treatments we recommend.</p>
//     </div>
//     <div className="md:flex-1">
//       <div className="flex flex-wrap justify-start items-stretch -m-2">
//         {condition.treatments.map((treatment, index) => (
//           <TreatmentCard key={index} {...treatment} />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const ConditionLayout = () => {
//   const location = useLocation();

//   const [conditionsData, setConditionsData] = useState([]); // Changed state to hold fetched conditions data

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const selectionsEncoded = queryParams.get('selections');

//     if (selectionsEncoded) {
//       const apiEndpoint = `https://health-app-backend-ten.vercel.app/getTreatments?selections=${selectionsEncoded}`;

//       const fetchData = async () => {
//         try {
//           const response = await fetch(apiEndpoint, {
//             method: 'POST', 
//             headers: {
//               // Define necessary headers
//             },
//           });

//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }

//           const data = await response.json();
//           setConditionsData(data); // Set the fetched data
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };

//       fetchData();
//     }
//   }, [location.search]);

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-6 py-8 mt-5">
//         {conditionsData.map((condition, index) => (
//           <ConditionSection key={index} condition={condition} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default ConditionLayout;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TreatmentCard = ({ treatment, onClick }) => (
  <div onClick={() => onClick(treatment)} className="cursor-pointer flex flex-col items-stretch bg-white shadow-lg rounded-lg p-4 m-2 w-64 h-80">
    <h3 className="font-bold mb-2">{treatment.name}</h3>
    <p className="text-gray-600 text-sm flex-grow mb-4">{treatment.description}</p>
    <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300 ease-in-out">
      Learn More
    </button>
  </div>
);

const TreatmentDetailsDrawer = ({ treatment, isOpen, onClose }) => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!treatment) return null;

  const drawerWidth = isXsScreen ? '100%' : '800px';

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="p-10" style={{ width: drawerWidth }} role="presentation">
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', }}>
      <IconButton onClick={onClose}>
            <ChevronRightIcon />
          </IconButton>
      </div>
      
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'20px'}}>
          <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
            Recommended based on your unique concern: <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold',color: '#1a9383' }} >{treatment.name}</Typography>
          </Typography>
         
        </div>
        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold',marginTop:'40px' }}>
          In Addition It Treats
        </Typography>
        <Grid container spacing={2}>
          {treatment.additionalTreatments.map((addTreatment, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Typography sx={{ textAlign: 'center', padding: '8px 0', border: '1px solid #ddd', borderRadius: '4px'}}>
                {addTreatment}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" component="div" gutterBottom sx={{ marginTop: '20px',fontWeight: 'bold', marginTop:'50px' }}>
          The Process
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(treatment.treatmentProcess).map(([key, value], index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card variant="outlined" sx={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', marginBottom: '8px' }} gutterBottom>
                    {key.replace(/#/g, '')}
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom sx={{color: '#1a9383' }}>
                    {value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Drawer>
  );
};

const ConditionSection = ({ condition }) => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTreatmentClick = (treatment) => {
    setSelectedTreatment(treatment);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start mb-10">
      <div className="md:w-1/4">
        <h2 className="text-2xl font-bold">{condition.concern}</h2>
        <p className="text-md text-gray-800">{condition.bodyParts}</p>
        <p className="text-sm text-gray-600 mt-1 mb-6 md:mb-0">These are the treatments we recommend.</p>
      </div>
      <div className="md:flex-1">
        <div className="flex flex-wrap justify-start items-stretch -m-2">
          {condition.treatments.map((treatment) => (
            <TreatmentCard key={treatment.name} treatment={treatment} onClick={handleTreatmentClick} />
          ))}
        </div>
      </div>
      <TreatmentDetailsDrawer treatment={selectedTreatment} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

const ConditionLayout = () => {
  const location = useLocation();
  const [conditionsData, setConditionsData] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectionsEncoded = queryParams.get('selections');

    if (selectionsEncoded) {
      const apiEndpoint = `https://health-app-backend-ten.vercel.app/getTreatments?selections=${selectionsEncoded}`;
      
      const fetchData = async () => {
        try {
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Include any other necessary headers
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setConditionsData(data); // Assuming this API call returns an array of conditions
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [location.search]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-8 mt-5">
        {conditionsData.map((condition) => (
          <ConditionSection key={condition.concern} condition={condition} />
        ))}
      </div>
    </>
  );
};

export default ConditionLayout;
