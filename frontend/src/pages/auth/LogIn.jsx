import React, { useState } from 'react'
import { useLoginMutation } from '../../redux/api/UserApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [login, { isLoading, error }] = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();


            dispatch(setCredentials({ ...res }));
            toast.success("user login successfully");
            navigate("/");
        } catch (error) {
            console.log(error.data.message || error);
            toast.error(error.data.message || "Server error");
        }
    }
    return (
        <div>
            <form onSubmit={LoginHandler} >
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <button type='submit'> Login</button>
            </form>
        </div>
    )
}

export default LogIn
