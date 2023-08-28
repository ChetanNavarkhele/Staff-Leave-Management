import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


const StaffHome = () => {

    const firstName = sessionStorage.getItem("firstName");
    const lastName = sessionStorage.getItem("lastName");

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    console.log(loginUser);

    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [days, setDays] = useState('');
    const [username, setUsername] = useState(loginUser.id);
    const [data, setData] = useState('');
    const [status, setStatus] = useState('Pending');


    const navigate = useNavigate();
    // console.log(loginUser);

    useEffect(() => {
        const calculateDays = () => {
            const diff = ((new Date(endDate)).getTime() - (new Date(startDate)).getTime()) / (1000 * 60 * 60 * 24) + 1;
            setDays(diff);
        };
        calculateDays();
    }, [startDate && endDate]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(()=>{
    //     const getLeaveData = localStorage.getItem("leaveData");
    //     if (getLeaveData) {
    //         setLeaveData(JSON.parse(getLeaveData));
    //       }
    // }, [])

    useEffect(() => {
        fetch("http://localhost:8000/leaves").then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp.filter((leave)=> leave.username === loginUser.id));
            setData(resp.filter((leave)=> leave.username === loginUser.id));     
        }).catch((err) => {
            toast.error('Login Failed Due To :' + err.message);
        });
    }, [])

    const handleLeave = () => {
        setShow(false);
        const leaveObj = { username, startDate, endDate, days, reason, status, firstName, lastName}
        fetch("http://localhost:8000/leaves", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(leaveObj)
        }).then((res) => {
            toast.success('Submitted Leave Successfully.');
            window.location.reload();
        }).catch((err) => {
            toast.error('Failed:' + err.message);
        });
    }

    const handleLogout = () => {
        sessionStorage.clear();
    }

    return (
        <div>
            <div>
                <div className='header'>
                    <Link to={'/'}>Welcome, {firstName} {lastName}</Link>
                    <Link style={{ float: 'right' }} to={'/login'} onClick={handleLogout}>Logout</Link>
                </div>
            </div>
            <div>
                {data.length !== 0 ? <div style={{ margin: "30px 30px 15px" }}>
                    <h3>Total leaves applied: {data.length}</h3>
                    <h3>Approved: {data.filter((leave)=> leave.status === "Approved").length}</h3>
                    <h3>Rejected: {data.filter((leave)=> leave.status === "Rejected").length}</h3>
                </div>
                    : null
                }
                {data.length === 0
                    ? <div className='row text-center'>
                        <div className='container offset-lg-3 col-lg-6'>
                            <h1>Not applied any leave yet</h1>
                        </div>
                    </div>
                    : data.map((mapleave) => {
                        return <div style={{ display: "inline-block", flexDirection: "row" }}>
                            <div className="card" style={{ width: "16rem", margin: "20px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Leave from {mapleave.startDate} to {mapleave.endDate}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Number of Days: {mapleave.days}</h6>
                                    <h5 className="card-title">Reason:</h5>
                                    <p className="card-text">{mapleave.reason}</p>
                                    <h5 className="card-title">Status:</h5>
                                    <p className="card-text">{mapleave.status}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
                <Button variant="warning" onClick={handleShow} style={{ fontWeight:"600", display: "block", margin: "20px auto" }}>
                    Apply Leave
                </Button>

                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Leave Details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <label style={{ width: "20%" }} className='mb-3'>From Date <span className='errmsg mb-2'>: </span></label>
                            <input type='date' pattern="\d{2}-\d{2}-\d{4}" value={startDate} onChange={e => setStartDate(e.target.value)} className='form-control mb-2'></input>
                        </div>
                        <div>
                            <label style={{ width: "20%" }} className='mb-3'>To Date <span className='errmsg mb-2'>: </span></label>
                            <input type='date' value={endDate} onChange={e => setEndDate(e.target.value)} className='form-control mb-2'></input>
                        </div>
                        <div className='form-group'>
                            <label className='mb-2'>Number of Days <span className='errmsg'>*</span></label>
                            <input value={startDate && endDate ? days : 0} className='form-control mb-2'></input>
                        </div>
                        <div className='form-group'>
                            <label className='mb-2'>Reason <span className='errmsg'>*</span></label>
                            <input value={reason} onChange={e => setReason(e.target.value)} className='form-control mb-2'></input>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="warning" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleLeave}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default StaffHome