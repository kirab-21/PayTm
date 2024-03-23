import { useState } from 'react';
import { Warning } from '../components/Warning';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';

import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return <div className='bg-slate-300 h-screen flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                  <Header label={"Sign Up"}/>
                  <SubHeading label={"Enter Details to create an account!"}/>
                  <InputBox onChange={(e) =>{
                        setFirstName(e.target.value);
                    }} placeholder="Enter First Name" label={"First Name"} />
                    <InputBox onChange={(e) =>{
                        setLastName(e.target.value);
                    }} placeholder="Enter Last Name" label={"Last Name"} />
                    <InputBox onChange={(e) =>{
                        setUserName(e.target.value);
                    }} placeholder="Enter your Email" label={"Email"} />
                    <InputBox onChange={(e) =>{
                        setPassword(e.target.value);
                    }} placeholder="Enter Password" label={"Password"} />

                    <div className='pt-4'>
                        <Button onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                userName,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")
                        }} label={"Sign up"}/> 
                    </div>
                    <Warning label={"Already have an account?"} buttonText={"Sign In"} to={"./signin"}/>
                </div>
            </div>
         </div>

}