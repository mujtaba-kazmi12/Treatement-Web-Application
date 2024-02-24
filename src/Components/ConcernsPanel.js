
// import React from 'react';

// const ConcernsPanel = ({ bodyPart, concerns, toggleConcern, selectedConcerns, goBack,addToConsultation }) => {
//   return (
//     <div className='p-6 bg-grey max-w-md '>
//       <button onClick={goBack} className='text-gray-600 mb-4 flex items-center'>
//         ← Your Selections
//       </button>
//       <h2 className='text-2xl font-semibold mb-4'>{bodyPart} Concerns</h2>
//       <div className='space-y-4'>
//         {concerns.map((concern) => (
//           <label key={concern} className='flex items-center p-2 rounded border border-gray-300 cursor-pointer'>
//             <input
//               type="checkbox"
//               checked={selectedConcerns.includes(concern)}
//               onChange={() => toggleConcern(concern)}
//               className=' checkbox-round form-checkbox h-5 w-5 text-blue-600 '
//               style={{ appearance: 'none', backgroundColor: selectedConcerns.includes(concern) ? '#47a89b' : 'transparent' }}
//             />
//             <span className='ml-2 text-sm font-medium text-gray-900'>{concern}</span>
//           </label>
//         ))}
//       </div>
//       <button className='mt-6 bg-gray-800 text-white py-2 px-4 rounded-lg w-full'
//        onClick={() => addToConsultation(selectedConcerns)}
//       >
//         Add to My Consultation ({selectedConcerns.length})
//       </button>
//     </div>
//   );
// };

// export default ConcernsPanel;

import React from 'react';

const ConcernsPanel = ({ bodyPart, concerns, toggleConcern, selectedConcerns, goBack, addToConsultation }) => {
  return (
    <div className='p-6 bg-grey max-w-md flex flex-col justify-between  h-[75vh]'>
        <>
        <button onClick={goBack} className='text-gray-600 mb-2 flex items-center'>
        ← Your Selections
      </button>
      <h2 className='text-2xl font-semibold '>{bodyPart} Concerns</h2>
      <div className='space-y-4'>
        {concerns.map((concern) => (
          <label key={concern} className='flex items-center p-2 rounded-3xl border border-gray-300 cursor-pointer'>
            <input
              type="checkbox"
              checked={selectedConcerns.includes(concern)}
              onChange={() => toggleConcern(concern)}
              className='form-checkbox rounded-full text-aqua border-gray-300 focus:ring-0' // Add focus:ring-0 to remove ring on focus
              style={{ 
                appearance: 'none', 
                height: '20px', 
                width: '20px',
                backgroundColor: selectedConcerns.includes(concern) ? '#47a89b' : 'transparent', // Use a proper color code here
                borderColor: 'lightgrey', // Use a proper color code here
                borderWidth: '2px'
              }}
            />
            <span className='ml-2 text-sm font-medium text-gray-900'>{concern}</span>
          </label>
        ))}
      </div></>
     
      <button className='mt-6 bg-gray-800 text-white py-2 px-4 rounded-lg w-full'
       onClick={() => addToConsultation(selectedConcerns)}
      >
        Add to My Consultation ({selectedConcerns.length})
      </button>
    </div>
  );
};

export default ConcernsPanel;

