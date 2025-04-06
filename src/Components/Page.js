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
    <button className="bg-strella text-white text-sm px-4 py-2 rounded hover:bg-opacity-90 transition-colors duration-300">
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
            Recommended based on your unique concern: <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold',color: '#b59449' }} >{treatment.name}</Typography>
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
                  <Typography variant="h6" component="div" gutterBottom sx={{color: '#b59449' }}>
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const selectionsParam = searchParams.get('selections');
        
        if (!selectionsParam) {
          setError('No consultation data found. Please start a new consultation.');
          setIsLoading(false);
          return;
        }
        
        try {
          // Parse the selections directly from the parameter
          const parsedSelections = JSON.parse(selectionsParam);
          console.log('Parsed selections:', parsedSelections);
          
          // Using the same direct encoding approach as in FormSubmit.js
          const encodedSelections = encodeURIComponent(JSON.stringify(parsedSelections));
          const apiUrl = `https://treatment-backend.vercel.app/getTreatments?selections=${encodedSelections}`;
          
          console.log('Fetching from API URL:', apiUrl);
          
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Origin': window.location.origin
            },
            mode: 'cors',
            credentials: 'omit',
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            setError(errorData.error || 'Error fetching treatment data');
            setIsLoading(false);
            return;
          }

          const data = await response.json();
          console.log('API Response:', data);
          setConditionsData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message || 'Failed to fetch treatment data');
        } finally {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error parsing selections:', error);
        setError('Error parsing consultation data');
      }
    };

    fetchTreatments();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-8 mt-5 flex justify-center items-center">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-strella mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2">Loading your personalized treatments...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-8 mt-5">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Sorry, we encountered an error: {error}</p>
            <p className="mt-2">Please try again or contact support.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-8 mt-5">
        {conditionsData && conditionsData.length > 0 ? (
          conditionsData.map((condition) => (
            <ConditionSection key={condition.concern} condition={condition} />
          ))
        ) : (
          <div className="text-center py-10">
            <p>No treatment recommendations found. Please try a different consultation.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ConditionLayout;
