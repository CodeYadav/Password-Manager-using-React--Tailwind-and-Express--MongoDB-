import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useEffect } from 'react'
import '../App.css'
import eyeOpen from '../assets/eyeOpen.svg'
import eyeClose from '../assets/eyeClose.svg'
import copysvg from '../assets/copy.svg'
import deletesvg from '../assets/delete.svg'
import editsvg from '../assets/edit.svg'

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ url: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        setpasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        });
        navigator.clipboard.writeText(text);
    }

    const showPassword = () => {
        if (ref.current.src.includes(eyeClose)) {
            ref.current.src = eyeOpen
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = eyeClose
            passwordRef.current.type = "password"
        }
    }

    const savePassword = async () => {
        if (form.url.length > 3 && form.username.length > 3 && form.password.length > 3) {
            if (form.id) { // Only delete when form.id exists, i.e., during editing
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: form.id })
                });

                setpasswordArray(passwordArray.filter(item => item.id !== form.id)); // Remove the old password from the array
            }

            const newPassword = { ...form, id: form.id ? form.id : uuidv4() }; // Use existing ID if editing, otherwise generate new ID
            setpasswordArray([...passwordArray, newPassword]);

            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword)
            });

            // Reset the form after saving
            setform({ url: "", username: "", password: "" });
        } else {
            toast.error('Error: Password not saved!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });
        }
    };

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id));
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
        }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        setform({ ...passwordToEdit }); // Set form with the current values for editing
    };


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>

            <ToastContainer
                position="top-center"
                autoClose={700}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <ToastContainer />
            <div className="container md:max-w-7xl w-screen mx-auto my-2 md:p-4 p-2 bg-green-100 rounded h-[571px] overflow-auto">

                <div className="logo text-xl font-extrabold flex gap-1 justify-center items-center">
                    <div className='text-green-500'>&lt;</div>
                    <div>Pass</div>
                    <div className='text-green-500'>Code</div>
                    <div className='text-green-500'>&gt;</div>
                </div>
                <p className='text-lg font-extrabold text-center font-serif'>Password Manager</p>

                <div className="flex flex-col md:mx-4 mt-6 gap-2 items-center">
                    <input value={form.url} onChange={handleChange} type="text" className='rounded-3xl p-2 px-4 outline-green-500 w-full' placeholder='URL' name='url' />
                    <div className="flex md:flex-row flex-col gap-2 items-center w-full">
                        <input value={form.username} onChange={handleChange} type="text" className='rounded-3xl p-2 px-4 outline-green-500 md:w-3/5 w-full' placeholder='Username' name='username' />
                        <span className="relative md:w-2/5 w-full">
                            <input value={form.password} ref={passwordRef} onChange={handleChange} type="password" className='rounded-3xl p-2 px-4 outline-green-500 w-full' placeholder='Password' name='password' />
                            <img ref={ref} onClick={showPassword} src={eyeClose} alt="Show Password" className='w-6 absolute right-3 top-[10px] cursor-pointer' />
                        </span>
                    </div>

                    <button onClick={savePassword} className='bg-green-500 text-white font-bold text-lg p-1 my-2 rounded-full w-40 hover:scale-105 hover:bg-green-600'>
                        Save Password
                    </button>
                </div>

                <div className="md:mx-4 mt-6 flex-wrap">
                    <h1 className='md:px-5 py-2 px-1 font-extrabold font-serif md:text-lg text-sm underline'>Your Passwords</h1>
                    {passwordArray.length === 0 && <div className='md:px-5 py-2 px-1'> Add some passwords </div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full bg-[#0080002a] rounded overflow-hidden md:text-base text-xs">
                            <thead>
                                <tr className='bg-green-500 text-white'>
                                    <th className='text-start md:px-5 py-2 px-1'>URLs</th>
                                    <th className='text-start md:px-5 py-2 px-1'>Usernames</th>
                                    <th className='text-start md:px-5 py-2 px-1'>Passwords</th>
                                    <th className='text-start md:px-5 py-2 px-1'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index} className='border-b-2 border-green-100 hover:bg-green-200'>

                                        <td className='w-[40%] md:px-5 md:py-4 px-1 py-2'>
                                            <div className='flex items-center md:gap-3'>
                                                <a href={item.url} target='_blank'>{item.url}</a>
                                                <img src={copysvg} className='cursor-pointer w-5 md:block hidden' onClick={() => { copyText(item.url) }} />
                                            </div>
                                        </td>

                                        <td className='w-[30%] md:px-5 md:py-4 px-1 py-2'>
                                            <div className='flex items-center md:gap-3'>
                                                <span>{item.username}</span>
                                                <img src={copysvg} className='cursor-pointer w-5 md:block hidden' onClick={() => { copyText(item.username) }} />
                                            </div>
                                        </td>

                                        <td className='w-[25%] md:px-5 md:py-4 px-1 py-2'>
                                            <div className='flex items-center md:gap-3'>
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <img src={copysvg} className='cursor-pointer w-5 md:block hidden' onClick={() => { copyText(item.password) }} />
                                            </div>
                                        </td>

                                        <td className='w-[5%] md:px-5 md:py-4 px-1 py-2'>
                                            <div className='flex items-baseline md:gap-3 gap-1'>
                                                <img src={editsvg} className='cursor-pointer md:w-5 w-4' onClick={() => { editPassword(item.id) }} />
                                                <img src={deletesvg} className='cursor-pointer md:w-[17px] w-[13px]' onClick={() => { deletePassword(item.id) }} />
                                            </div>
                                        </td>

                                    </tr>
                                })}

                            </tbody>
                        </table>}
                </div>

            </div>

        </>
    )
}

export default Manager
