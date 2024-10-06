import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between md:px-14 px-3 py-3 bg-green-100 items-center'>

            <div className="logo text-xl font-extrabold flex gap-1 justify-center items-center">
                <div className='text-green-500'>&lt;</div>
                <div>Pass</div>
                <div className='text-green-500'>Code</div>
                <div className='text-green-500'>&gt;</div>
            </div>

            <ul className='font-semibold font-serif'>
                <li>
                    <a
                        href="https://github.com/CodeYadav"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-green-500 text-black rounded-md hover:bg-green-600"
                    >
                        <svg
                            className="w-5 h-5 mr-1"
                            fill="black"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 0C5.373 0 0 5.373 0 12a12 12 0 008.205 11.387c.6.113.82-.261.82-.579v-2.035c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.204.083 1.837 1.236 1.837 1.236 1.07 1.834 2.805 1.305 3.49.998.108-.774.42-1.305.763-1.604-2.665-.306-5.466-1.333-5.466-5.931 0-1.31.468-2.382 1.235-3.221-.124-.306-.535-1.538.118-3.206 0 0 1.008-.323 3.301 1.229a11.537 11.537 0 016.004 0c2.291-1.552 3.3-1.229 3.3-1.229.654 1.668.243 2.9.119 3.206.768.839 1.234 1.911 1.234 3.221 0 4.607-2.805 5.621-5.476 5.92.43.371.814 1.102.814 2.222v3.293c0 .319.218.694.825.577A12.004 12.004 0 0024 12c0-6.627-5.373-12-12-12z"
                                clipRule="evenodd"
                            />
                        </svg>
                        GitHub
                    </a>

                </li>
            </ul>

        </nav>
    )
}

export default Navbar
