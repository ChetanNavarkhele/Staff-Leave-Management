import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const [id, updateId] = useState("");
    const [password, updatePassword] = useState("");

    const userArray = [];
    const navigate = useNavigate();

    const proceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            // console.log('proceed further');
            fetch("http://localhost:8000/users/"+ id).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp);
                for (const key in resp){
                    console.log(key);
                    console.log(resp[key]);
                    userArray.push(resp[key]);
                    console.log(userArray);
                }
                const user = userArray.filter(user => user.id === id)
                sessionStorage.setItem("firstName", resp.firstName);
                sessionStorage.setItem("lastName", resp.lastName);
                if (Object.keys(userArray).length === 0) {
                    toast.error('Please enter valid username');
                } else {
                    const user = userArray.filter(user => user.id === id)
                    console.log(user);
                    if (user.password === password) {
                        toast.success('Success!');
                        user.designation === 'staff' ? navigate('/stafflogin') : navigate('/hodlogin');
                    } else {
                        toast.error('Please enter valid credentials')
                    }
                }

            })
        }
        let logObj = { id, password };
        sessionStorage.setItem("loginUser", JSON.stringify(logObj));
    }

    const validate = () => {
        let result = true;
        if (id === null || id === '') {
            result = false;
            toast.warning('Please enter Username');
        }
        if (password === null || password === '') {
            result = false;
            toast.warning('Please enter Password');
        }
        return result;
    }

    return (
        <div className='row'>
            <div className='offset-lg-3 col-lg-6'>
                <form onSubmit={proceedLogin} className='container'>
                    <div className='card'>
                        <div className='card-header'>
                            <h1>User Login</h1>
                        </div>
                        <div className='card-body'>
                            <div className='form-group mb-3'>
                                <label className='mb-3'>Username <span className='errmsg mb-2'>*</span></label>
                                <input value={id} onChange={e => updateId(e.target.value)} className='form-control'></input>
                            </div>
                            <div className='form-group mb-3'>
                                <label className='mb-3'>Password <span className='errmsg'>*</span></label>
                                <input value={password} onChange={e => updatePassword(e.target.value)} type='password' className='form-control'></input>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <button type='submit' className='btn btn-primary'>Login</button>
                            <br></br><br></br>
                            <span>Not Registerd Yet </span><Link className='btn btn-warning' to={'/register'}>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login