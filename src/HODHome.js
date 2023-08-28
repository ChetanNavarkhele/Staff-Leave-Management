import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


const HODHome = () => {

    const firstName = sessionStorage.getItem("firstName");
    const lastName = sessionStorage.getItem("lastName");

    // const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    const [leaveData, setLeaveData] = useState([]);
    // const [approvedStatus, setApprovedStatus] = useState("Pending");

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/ChetanNavarkhele/Staff-Leave-Management/leaves").then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setLeaveData(resp);
        }).catch((err) => {
            toast.error('Login Failed Due To :' + err.message);
        });
    }, [])

    const handleLogout = () => {
        sessionStorage.clear();
    }

    const handleApprove = (e) => {
        console.log(e.target.id);

        fetch("https://my-json-server.typicode.com/ChetanNavarkhele/Staff-Leave-Management/leaves/" + e.target.id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",

            // Fields that to be updated are passed
            body: JSON.stringify({
                status: "Approved"
            })
        }).then(function (response) {
            // console.log(response);
            return response.json();
        }).then(function (data) {
            console.log(data);
        });

        fetch("https://my-json-server.typicode.com/ChetanNavarkhele/Staff-Leave-Management/leaves").then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setLeaveData(resp);
            window.location.reload();
        }).catch((err) => {
            toast.error('Login Failed Due To :' + err.message);
        });
    };
    // PatchRequest();

    const handleReject = (e) => {
        console.log(e.target.id);

        fetch("https://my-json-server.typicode.com/ChetanNavarkhele/Staff-Leave-Management/leaves/" + e.target.id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",

            // Fields that to be updated are passed
            body: JSON.stringify({
                status: "Rejected"
            })
        }).then(function (response) {
            // console.log(response);
            return response.json();
        }).then(function (data) {
            console.log(data);
        });

        fetch("https://my-json-server.typicode.com/ChetanNavarkhele/Staff-Leave-Management/leaves").then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            setLeaveData(resp);
            window.location.reload();
        }).catch((err) => {
            toast.error('Login Failed Due To :' + err.message);
        });
    };

    const element = document.querySelectorAll("#status");
    console.log(element);
    if (element.textContent !== "" && element.textContent === "Approved") {
        element.classList.add("approve");
    } else if (element.textContent !== "" && element.textContent === "Rejected") {
        element.classList.add("reject");
    }

    return (<div>
        <div>
            <div>
                <div className='header'>
                    <Link to={'/'}>Welcome, {firstName} {lastName}</Link>
                    <Link style={{ float: 'right' }} to={'/login'} onClick={handleLogout}>Logout</Link>
                </div>
            </div>
            <div>

                {leaveData.length === 0 ? <div className='row text-center'>
                    <div className='container offset-lg-3 col-lg-6'>
                        <h1>No leave request available</h1>
                    </div>
                </div>
                    : null
                }
                {leaveData.length !== 0 ? <div style={{ margin: "30px 30px 15px" }}>
                    <h3>Leave Details of Staff</h3>
                </div>
                    : null
                }
                {leaveData.length !== 0 ? leaveData.map((mapleave) => {
                    return <div style={{ display: "inline-block", flexDirection: "row" }}>
                        <div className="card" style={{ width: "18rem", margin: "20px" }}>
                            <div className="card-body">
                                <h5 className="card-title">Staff: {mapleave.firstName} {mapleave.lastName}</h5>
                                <h5 className="card-title">Leave from {mapleave.startDate} to {mapleave.endDate}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Number of Days: {mapleave.days}</h6>
                                <h5 className="card-title">Reason:</h5>
                                <p className="card-text">{mapleave.reason}</p>
                                <h5 className="card-title">Status:</h5>
                                <p className="card-text">{mapleave.status}</p>
                                <button id={mapleave.id} onClick={handleApprove} style={{ margin: "0 15px 0 0", width: "40%" }} type='button' className='btn btn-success'>Approve</button>
                                <button id={mapleave.id} onClick={handleReject} style={{ margin: "0 0 0 20px", width: "40%" }} type='button' className='btn btn-danger'>Reject</button>
                            </div>
                        </div>
                    </div>
                })
                    : null
                }
            </div>
        </div>
    </div>
    )
}

export default HODHome