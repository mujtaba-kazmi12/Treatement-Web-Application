
import React, { useState } from 'react';
import HumanBody from './HumanBody';
import SelectionsPanel from './SelectionPart';
import Navbar from './Navbar';
import ConcernsPanel from './ConcernsPanel';
const MainComponent = () => {
    const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [consultationConcerns, setConsultationConcerns] = useState([]);
  
  // This is just an example list of concerns. You would fetch or define these based on the body part selected.
  

  
  const addSelection = (bodyPart) => {
    setSelectedBodyParts([...selectedBodyParts, bodyPart]); // This now adds to selectedBodyParts
    setSelectedBodyPart(bodyPart); // Set the current body part here if needed
  };

const concerns = {
    Chest: ['Excess Hair', 'Cherry Angiomas', 'Acne', 'Acne Scarring' , 'Wrinkles' ,'Unwanted Hair' ,'Sagging Skin'],
    Arms: ['Excess Hair', 'Loose Skin', 'Acne', 'Acne Scarring' , 'Excess Fat' ,'Wrinkles' ,'Unwanted Hair','Sagging Skin'],
    Abdomen: ['Muffin Top', 'Ecxess Fat'],
    Intimate: ['Excess Hair ', 'Unwanted Hair'],
    Hands: ['Crepey, Aging Skin', 'Brown Spots','Red Spots','Cherry Angiomas','Wrinkles'],
    Thighs: ['Excess Hair', 'Loose Skin','Unwanted Hair','Sagging Skin'],
    Legs: ['Excess Hair', 'Loose Skin','Unwanted Hair','Sagging Skin'],
    Back: ['Excess Hair', 'Acne','Acne Scarring','Excess Fat','Unwanted Hair'],
    Buttocks: ['Excess Hair'],
    Face:['Excess Hair','Hyperpigmentation','Freckles','Fine Lines','Dry Skin','Dark Circles','Crepey, Aging Skin','Combination Skin','Clogged Pores','Brown Spots','Sunspots','11s','Large Pores','Facial Folds','Cherry Angiomas','Loose Skin','Drooping Forehead','Acne','Acne Scarring','Sagging Eyelids','Puffy Eyes','Excess Fat','Crows Feet','Bags Under Eyes'],

     
  };

  const toggleConcern = (concern) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };





  
const addToConsultation = (concerns) => {
    if (Array.isArray(concerns) && concerns.length > 0) {
      const newEntry = {
        bodyPart: selectedBodyPart,
        concerns: [...concerns]
      };
      setConsultationConcerns(prev => [...prev, newEntry]);
      // Reset states to default to trigger showing the SelectionsPanel
      setSelectedBodyPart(null);
      setSelectedConcerns([]);
    } else {
      console.error('No concerns to add to consultation');
    }
  };
  


  const goBack = () => {
    setSelectedBodyPart(null); // Reset the selected body part
  };



const clearSelections = (bodyPart, concern) => {
    if (bodyPart && concern) {
      // Remove a specific concern from a specific body part
      setConsultationConcerns(consultationConcerns.map(entry =>
        entry.bodyPart === bodyPart
          ? { ...entry, concerns: entry.concerns.filter(c => c !== concern) }
          : entry
      ).filter(entry => entry.concerns.length > 0));
    } else {
      // Clear all concerns if no specific one is provided
      setConsultationConcerns([]);
    }
  };

  const finishConsultation = () => {
    // Logic to handle the end of the consultation, for example:
    alert('Consultation finished!'); // Replace with a more suitable action
  };
  return (
   
    

    <>
    <Navbar />
    <div className='flex flex-col md:flex-row min-h-[92vh] bg-grey'>
      <div className='w-[100%] mt-5 md:w-[55%] md:mt-0'>
        
        <HumanBody addSelection={addSelection} 
        showOverlay={selectedBodyPart !== null}
        />
        
      </div>
      <div className='w-px bg-gray-300 min-h-full'></div>
      <div className='w-[100%] md:w-[45%] px-[3%] py-[2%]'>
        {selectedBodyPart ? (
          <ConcernsPanel
          bodyPart={selectedBodyPart}
          concerns={concerns[selectedBodyPart] || []}
          toggleConcern={toggleConcern}
          selectedConcerns={selectedConcerns}
          goBack={goBack}
          addToConsultation={addToConsultation}
        />
        ) : (
          <SelectionsPanel selectedBodyParts={selectedBodyParts}
          consultationConcerns={consultationConcerns}
          clearSelections={clearSelections}
          finishConsultation={finishConsultation}
          />
        )}
      </div>
    </div>
  </>
   
  );
};

export default MainComponent;
