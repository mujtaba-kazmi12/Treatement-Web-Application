import React from 'react';
import Navbar from './Navbar';
import { useLocation,useNavigate } from 'react-router-dom';
const ContactForm = () => {
    // Form submission handler
    const location = useLocation();
    const consultationConcerns = location.state?.consultationConcerns;
    console.log(consultationConcerns)
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Extracting form data
        const formData = new FormData(event.target);
        const firstName = formData.get('firstName');
        const toEmail = formData.get('email');
    
        // Preparing the query parameters for the selections only
        const queryParams = new URLSearchParams({
            selections: JSON.stringify(consultationConcerns), // Encode the consultationConcerns array as a JSON string
        });
    
        // Preparing the body with firstName, toEmail, and the static string
        const body = {
            firstName,
            toEmail,
            email_string: "lol", // Including the static string as part of the body
        };
    
        try {
            const response = await fetch(`https://health-app-backend-ten.vercel.app/getTreatments?${queryParams.toString()}`, {
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
            }
        } catch (error) {
            console.error('Error making the request:', error);
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

    <button type="submit" className="w-full bg-black text-white p-3 rounded hover:bg-gray-700">
        Get My Results
    </button>
</form>
        </div>
        </>
        
    );
};

export default ContactForm;
