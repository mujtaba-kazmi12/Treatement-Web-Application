import React, { useState } from 'react';
import Navbar from './Navbar';
import { useLocation,useNavigate } from 'react-router-dom';
const ContactForm = () => {
    // Add loading state
    const [isLoading, setIsLoading] = useState(false);
    
    // Form submission handler
    const location = useLocation();
    const consultationConcerns = location.state?.consultationConcerns;
    console.log(consultationConcerns)
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Set loading to true when starting the API call
        setIsLoading(true);
    
        // Extracting form data
        const formData = new FormData(event.target);
        const firstName = formData.get('firstName');
        const toEmail = formData.get('email');
    
        // Make sure consultationConcerns exists and is properly structured
        if (!consultationConcerns || !Array.isArray(consultationConcerns) || consultationConcerns.length === 0) {
            console.error('Invalid or empty consultationConcerns', consultationConcerns);
            setIsLoading(false);
            alert('Missing consultation data. Please go back and try again.');
            return;
        }

        // Ensure each object in the array has the correct format
        const validConsultationData = consultationConcerns.map(item => ({
            bodyPart: item.bodyPart,
            concerns: Array.isArray(item.concerns) ? item.concerns : []
        }));
    
        // Preparing the query parameters for the selections only
        const selectionsJson = JSON.stringify(validConsultationData);
        console.log('Sending to API:', selectionsJson);
        
        const queryParams = new URLSearchParams();
        queryParams.append('selections', selectionsJson);
    
        // Preparing the body with firstName, toEmail, and the static string
        const body = {
            firstName,
            toEmail,
            email_string: `https://treatement.vercel.app/page?${queryParams.toString()}`, // Including the static string as part of the body
        };
    
        try {
            console.log('API URL:', `https://treatment-backend.vercel.app/getTreatments?${queryParams.toString()}`);
            console.log('Request body:', body);
            
            const response = await fetch(`https://treatment-backend.vercel.app/getTreatments?${queryParams.toString()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body), // Send the firstName, toEmail, and email_string in the request body
            });
    
            if (response.ok) {
                const results = await response.json();
                // Handle success, possibly navigate to a results page or display in current component
                console.log(results);
                navigate(`/page?${queryParams.toString()}`);
            } else {
                // Handle HTTP error responses
                console.error('Server error:', response.statusText);
                // Set loading back to false if there's an error
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error making the request:', error);
            // Set loading back to false if there's an error
            setIsLoading(false);
        }
    };
    

    return (
        <>
        <Navbar/>
        <div className="flex flex-col items-center justify-center h-[93vh] bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg min-w-full md:min-w-0">
    <h2 className="text-2xl font-semibold text-center mb-6">Almost done! 🎉</h2>
    <p className="text-sm text-center mb-8">Enter your contact information to instantly receive your customized virtual consultation!</p>
    
    <div className="mb-4">
        <label htmlFor="firstName" className="sr-only">First Name</label>
        <input type="text" id="firstName" name="firstName" placeholder="First Name" className="w-full p-2 border border-gray-300 rounded" required />
    </div>
    
    <div className="mb-4">
        <label htmlFor="lastName" className="sr-only">Last Name</label>
        <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="w-full p-2 border border-gray-300 rounded" required />
    </div>
    
    <div className="mb-4">
        <label htmlFor="email" className="sr-only">Email</label>
        <input type="email" id="email" name="email" placeholder="name@email.com" className="w-full p-2 border border-gray-300 rounded" required />
    </div>
    
    <div className="mb-4">
        <label htmlFor="phone" className="sr-only">Phone</label>
        <input type="tel" id="phone" name="phone" placeholder="(____) ____-____" className="w-full p-2 border border-gray-300 rounded" required />
    </div>
    
    <div className="flex items-center mb-6">
        <input type="checkbox" id="newsletter" name="newsletter" className="mr-2" />
        <label htmlFor="newsletter" className="text-sm">Sign up for our newsletter</label>
    </div>

    <button 
        type="submit" 
        className="w-full bg-strella text-white p-3 rounded hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center"
        disabled={isLoading}
    >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            </>
        ) : (
            "Get My Results"
        )}
    </button>
</form>
        </div>
        </>
        
    );
};

export default ContactForm;
