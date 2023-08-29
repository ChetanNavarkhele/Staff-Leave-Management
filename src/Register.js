import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [designation, setDesignation] = useState("hod");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [department, setDepartment] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const isValidate = () => {
        let isProceed = true;
        let errorMsg = 'Please enter value in ';
        if (designation === null || designation === '') {
            isProceed = false;
            errorMsg += 'Designation '
        }
        if (firstName === null || firstName === '') {
            isProceed = false;
            errorMsg += 'First Name '
        }
        if (lastName === null || lastName === '') {
            isProceed = false;
            errorMsg += 'Last Name '
        }
        if (email === null || email === '') {
            isProceed = false;
            errorMsg += 'Email '
        }
        if (contact === null || contact === '') {
            isProceed = false;
            errorMsg += 'Contact '
        }
        if (department === null || department === '') {
            isProceed = false;
            errorMsg += 'Department '
        }
        if (id === null || id === '') {
            isProceed = false;
            errorMsg += 'Username '
        }
        if (password === null || password === '') {
            isProceed = false;
            errorMsg += 'Password '
        }

        if (!isProceed) {
            toast.warning(errorMsg);
        }
        return isProceed;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let regObj = { designation, firstName, lastName, email, contact, department, id, password };
        // console.log(regObj);
        if (isValidate()) {
            fetch("http://my-json-server.typicode.com/ChetanNavarkhele/leave-database/users", {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                     Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(regObj)
            }).then((res) => {
                toast.success('Registered Successfully.');
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed:' + err.message);
            });
        }
    }

    const handleAvailability = (e) => {
        console.log(e.target.value);
        fetch("http://my-json-server.typicode.com/ChetanNavarkhele/leave-database/users").then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            if (e.target.value === '' || e.target.value === null) {
                toast.error('Username can not be empty')
            }
            let findUser = resp.filter(user => user.id === e.target.value);
            console.log(findUser);
            if (findUser.length !== 0) { toast.error('This username has already been taken') };
        }).catch((err) => {
            toast.error('Login Failed Due To :' + err.message);
        });
    }

    return (
        <div>
            <div className='offset-lg-3 col-lg-6'>
                <form className='container' onSubmit={handleSubmit}>
                    <div className='card'>
                        <div className='card-header'>
                            <h1>User Registration</h1>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-6 mb-4'>
                                    <div className='form-group'>
                                        <label>Designation <span className='errmsg'>*</span></label>
                                        <input type='radio' checked={designation === 'hod'} onChange={e => setDesignation(e.target.value)} value='hod' name='designation' className='app-check'></input>
                                        <label className='mr-2'>HOD</label>
                                        <input type='radio' checked={designation === 'staff'} onChange={e => setDesignation(e.target.value)} value='staff' name='designation' className='app-check'></input>
                                        <label>Staff</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label className='mb-2'>First Name <span className='errmsg'>*</span></label>
                                        <input value={firstName} onChange={e => setFirstName(e.target.value)} className='form-control mb-2'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label className='mb-2'>Last Name <span className='errmsg'>*</span></label>
                                        <input value={lastName} onChange={e => setLastName(e.target.value)} className='form-control mb-2'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label className='mb-2'>Email <span className='errmsg'>*</span></label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} type='email' className='form-control mb-2'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label className='mb-2'>Contact <span className='errmsg'>*</span></label>
                                        <input value={contact} onChange={e => setContact(e.target.value)} type='number' className='form-control mb-2'></input>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label className='mb-3'>Department <span className='errmsg'>*</span></label>
                                        <select value={department} onChange={e => setDepartment(e.target.value)} className='form-control mb-4'>
                                            <option>Select Department</option>
                                            <option value='sales' >Sales</option>
                                            <option value='marketing' >Marketing</option>
                                            <option value='finance' >Finance</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label className='mb-2'>Username <span className='errmsg'>*</span></label>
                                        <input value={id} onBlur={handleAvailability} onChange={e => setId(e.target.value)} className='form-control mb-2'></input>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label className='mb-2'>Password <span className='errmsg'>*</span></label>
                                        <input value={password} onChange={e => setPassword(e.target.value)} type='password' className='form-control mb-2'></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <button type='submit' className='btn btn-primary'>Register</button>
                            <br></br><br></br>
                            <span>If Already Registerd </span><Link className='btn btn-success' to={'/login'}>Login</Link>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Register