import React, { useRef, useState } from "react";
import { sendSubscribeRequest } from "../../api/subscribeApi";

function SubscribeForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [submitResponse, setSubmitResponse] = useState(null);

    
    const submitButtonRef = useRef(null);

    function validateEmail() {
        return !!email && (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.trim());
    }

    function validateName() {
        return !!name && (/^[a-zA-Z\s]*$/).test(name.trim());
    }


    // useCallback
    const handleSubmit = async (e) => {

        e.preventDefault();

        let error_count = 0;

        setSubmitResponse(null);
        setErrors({});

        submitButtonRef.current.disabled = true;

        if (!validateEmail()) {
            setErrors({...errors, 'email': 'Invalid Email'});
            error_count += 1; 
        }
        
        if (!validateName()) {
            setErrors({...errors, 'name': 'Invalid Name'});
            error_count += 1; 
        }

        if ( !error_count ) {

            await sendSubscribeRequest({name, email})
                .then(response => {
                    setName('');
                    setEmail('');
                    setSubmitResponse({type: 'success', message: response.data.message})
                })
                .catch(error => {
                    setSubmitResponse({type: 'error', message: error.response.data.message})
                });
            
        }

        submitButtonRef.current.disabled = false;

        return;

    }

    return (
        <div className="subscribe-form">

            <form>
                <div className="title">
                    <h2>Subscribe to Our Newsletter</h2>
                </div>

                <div className="body">

                    {
                        submitResponse
                        &&
                        <div className={ submitResponse.type === 'success' ? "response-success response" : "response-error response" }>

                            { submitResponse.message ? <p>{ submitResponse.message }</p> : <p>Something went wrong.</p> }

                            <span type="button" className="close-button" onClick={() => setSubmitResponse(null)}> &times; </span>

                        </div>
                    }

                    <input id="name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="What's your name?" required />
                    {
                        errors.name 
                        &&
                        <span className="input-error">
                            <p>{ errors.name }</p>
                        </span>
                    }

                    <input id="email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
                    {
                        errors.email 
                        &&
                        <span className="input-error">
                            <p>{ errors.email }</p>
                        </span>
                    }

                </div>

                <div className="submit-buttons">
                    <button className="submit" ref={submitButtonRef} onClick={(e) => handleSubmit(e)}>Subscribe</button>
                </div>
            </form>

        </div>
    )
}

export default React.memo(SubscribeForm);
