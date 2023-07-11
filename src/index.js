import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { AuthProvider } from "./context/AuthProvider";

//step2
import { BrouwerRouter, Routes, Route } from 'react-router-dom'

ReactDOM.render(
    //step 1
    // <React.StrictMode>

    //     <AuthProvider>
    //         <App/>
    //     </AuthProvider>

    // </React.StrictMode>,

    <React.StrictMode>
        <BrouwerRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>

            </AuthProvider>
        </BrouwerRouter>
    </React.StrictMode>,

    document.getElementById('root')
)