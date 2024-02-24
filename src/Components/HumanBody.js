
import React, { useState } from 'react';
import FemaleFront from '../images/front.svg';
import FemaleBack from '../images/back.svg';
import Face from '../images/face.svg';
import MaleFront from '../images/male_front.svg'
import MaleBack from '../images/male_back.svg'



const HumanBody = ({addSelection,showOverlay}) => {
    const [currentSVG, setCurrentSVG] = useState(0);
    const [isMale, setIsMale] = useState(true);
    const [isButtonActive, setIsButtonActive] = useState(false);

    const switchSVG = () => {
        setCurrentSVG(currentSVG === 0 ? 1 : 0);
    };

    const switchToFace = () => {
        setCurrentSVG(2);
    };

    const showFrontBackButtons = () => {
        setCurrentSVG(0);
    };

    const switchGender = () => {
        setIsMale(!isMale); // Toggle between male and female
        setIsButtonActive(!isButtonActive);
    };

  

    const getSvgComponent = () => {
        let svg;
        if (isMale) {
            svg = currentSVG === 0 ? MaleFront : currentSVG === 1 ? MaleBack : Face;
        } else {
            svg = currentSVG === 0 ? FemaleFront : currentSVG === 1 ? FemaleBack : Face;
        }
        return <img src={svg} alt={`${isMale ? 'Male' : 'Female'} View`} />;
    };


    const handleBodyPartClick = (bodyPart) => {
        // Here we call addSelection, which was passed down as a prop from the MainComponent
        // We pass the bodyPart that was clicked to this function
        addSelection(bodyPart);
      };

    return (
        
        <div className='w-[full] h-[93vh] flex flex-col '>
        {showOverlay && (
        <div className="absolute inset-0 bg-black opacity-50 w-[55%] h-[94%] mt-[3.3%]" style={{ zIndex: 10 }}></div> // This div will act as the overlay
      )}
          
        
            {currentSVG===2 && ( <div className='w-full  flex items-center justify-end bg-grey pt-4 '>
            <h1
  id="genderSwitchButton"
  className="cursor-pointer px-4 py-2 rounded-md border-2 border-transparent active:border-black focus:outline-none whitespace-nowrap "
  onClick={showFrontBackButtons}
  onMouseDown={() => setIsButtonActive(true)}
  onMouseUp={() => setIsButtonActive(false)}
  onBlur={() => setIsButtonActive(false)}
>
    <span className='mr-2'>←</span>
<span className='underline'>View Full Body</span>
</h1>


            </div>)}
           
        <div className="flex justify-center items-center w-[full] h-[80vh] bg-grey ">
            
            <div className="relative">
                {getSvgComponent()}

   {currentSVG ===0 &&(
    <>
    <button
                    id="plusButton"
                    className={`absolute top-[3%] left-[55%] shadow-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>

                <button
                    id="plusButton"
                    className={`absolute top-[22%] left-[30%]  transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={() => handleBodyPartClick('Chest')}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>

                <button
                    id="plusButton"
                    className={`absolute top-[22%] left-[90%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                   <h1 className=' font-bold'>+</h1>
                </button>

                <button
                    id="plusButton"
                    className={`absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>

                <button
                    id="plusButton"
                    className={`absolute top-[43%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>

                <button
                    id="plusButton"
                    className={`absolute top-[47%] left-[91%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>


                
                <button
                    id="plusButton"
                    className={`absolute top-[58%] left-[34%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>

                <button
                    id="plusButton"
                    className={`absolute top-[78%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>
    </>
                           )}


{currentSVG ===1 &&(<>

    <button
                    id="plusButton"
                    className={`absolute top-[45%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>


                <button
                    id="plusButton"
                    className={`absolute top-[32%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                        currentSVG === 2 ? 'hidden' : 'block'
                    } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                    onClick={switchToFace}
                >
                    <h1 className=' font-bold'>+</h1>
                </button>

</>)}
                               
{currentSVG !==2 && (
    <> <button
    className="bg-white p-4 rounded-full shadow-md flex items-center justify-center absolute  bottom-[45%] left-[-80%]"
    type="button"
    aria-label="Arrow Button"
    onClick={switchSVG}
  >
   <img src='/images/redo.png' className='w-6'/>
  </button>



  <button
    className="bg-white p-4 rounded-full shadow-md flex items-center justify-center absolute  bottom-[45%] right-[-80%]"
    type="button"
    aria-label="Arrow Button"
    onClick={switchSVG}
  >
   <img src='/images/undo.png' className='w-6'/>
  </button></>
)}
               
               {currentSVG === 2 && (
                      <button
                      id="plusButton"
                      className={`absolute top-[32%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white  rounded-full ${
                          currentSVG === 2 ? 'block' : 'hidden'
                      } hover:bg-aqua hover:text-white hover:scale-110 transition-transform duration-300 text-aqua flex items-center justify-center w-5 h-5`}
                      onClick={switchToFace}
                  >
                      <h1 className=' font-bold'>+</h1>
                  </button>
                    )}
                
            </div>
        </div>
        {currentSVG !== 2 && (
              <div className='bg-grey w-full'>
              <h1
        id="genderSwitchButton"
        className="cursor-pointer px-4 py-2 rounded-md border-2 border-transparent active:border-black focus:outline-none whitespace-nowrap w-[170px] "
        onClick={switchGender}
        onMouseDown={() => setIsButtonActive(true)}
        onMouseUp={() => setIsButtonActive(false)}
        onBlur={() => setIsButtonActive(false)}
      >
      {isMale ? (
          <>
            <span className="female-symbol mr-2">♀</span>
            <span className="underline">Switch to Female</span>
          </>
        ) : (
          <>
            <span className="male-symbol mr-2">♂</span>
            <span className="underline">Switch to Male</span>
          </>
        )}
      </h1>
              </div>
        )}
      
      
        </div>
        
        
        
    );
};

export default HumanBody;

