import React, { useEffect} from 'react';

const EsewaPaymentComponent = ({ amt, num }) => {
    
    
    
    const path = "https://uat.esewa.com.np/epay/main";
    const params = {
        amt: amt,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: amt,
        pid: num,
        scd: "EPAYTEST",
        su: "http://localhost:3000/success",
        fu: "http://localhost:3000/donate"
    };

    const post = (path, params) => {
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    };

    useEffect(() => {
        
        
        post(path, params);
    }, []);
    
    return (
        <div>
            {/* components or elements */}
        </div>
    );
};

export default EsewaPaymentComponent;
