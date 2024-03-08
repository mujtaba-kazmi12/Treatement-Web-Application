
import React from 'react';
import { useNavigate } from 'react-router-dom';
const SelectionsPanel = ({ consultationConcerns, clearSelections, finishConsultation }) => {
  const navigate = useNavigate();
  const handleFinishConsultation = () => {
    navigate('/form', { state: { consultationConcerns } });
    
  };
  // Check to see if we have any selections
  const hasSelections = consultationConcerns.length > 0;

  return (
    <div className='p-6 bg-grey max-w-md'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold'>Your Selections ({consultationConcerns.length})</h2>
        {hasSelections && (
          <button onClick={() => clearSelections()} className='text-sm text-gray-500 hover:text-gray-700'>
            Clear All
          </button>
        )}
      </div>

      {hasSelections ? (
        <div className='my-4 flex flex-col justify-between h-[72vh] '>
          {/* Iterate over the consultationConcerns and display them along with their body parts */}
          {consultationConcerns.map((entry, index) => (
            <div key={index} className='mb-6'>
            <h3 className='text-lg font-semibold mb-1'>{entry.bodyPart}</h3>
            <div className='w-full border-b border-gray-400'></div>
            <div className='flex flex-wrap gap-2 mt-3'>
              {entry.concerns.map((concern, concernIndex) => (
                <div key={concernIndex} className='flex items-center border border-gray-300 bg-gray-100 rounded-xl p-2 my-1'>
                  <span className='text-gray-800 mr-2'>{concern}</span>
                  <button onClick={() => clearSelections(entry.bodyPart, concern)} className='rounded-full bg-red-200 text-red-600 px-2'>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

        
          ))}
          <button
            onClick={handleFinishConsultation}
            className='mt-6 bg-gray-800 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full'
          >
            Finish Consultation
          </button>
        </div>
      ) : (
        <div className='mt-[4vh]'>
        <p className='text-gray-600'>You haven't selected any concerns.</p>
        <p className='text-gray-600 mt-[3vh]'>Start by clicking on a body part on the model.</p>
        </div>
        
      )}
    </div>
  );
};

export default SelectionsPanel;

