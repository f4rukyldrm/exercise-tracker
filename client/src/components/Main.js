import { useEffect, useState } from 'react'
import Prism from "prismjs";
import "../../node_modules/prismjs/themes/prism-tomorrow.css";
import CodeSection from './CodeSection';

function Main() {

    const [form, setForm] = useState({
        username: '',
        _id: '',
        description: '',
        duration: '',
        date: ''
    });

    const [output, setOutput] = useState('{}');
    const url = 'https://f4rukyldrm-exercise-tracker.onrender.com';

    useEffect(() => {
        Prism.highlightAll();
    }, [output]);

    const refactor = (request, data) => {
        if (data) {
            return `fetch('${url}/${request}', {
    method : 'POST',
    body : JSON.stringify(${JSON.stringify(data)}),
    headers: { "Content-type": "application/json" }
})
.then(response => response.json())
.then(json => console.log(json));`;
        } else {
            return `fetch('${url}/${request}')
    .then(response => response.json())
    .then(json => console.log(json));`;
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleExerciseSubmit = (e) => {
        e.preventDefault();

        fetch(url + `/api/users/${form._id}/exercises`, {
            method: 'POST',
            body: JSON.stringify({
                _id: form._id,
                description: form.description,
                duration: form.duration,
                date: form.date
            }),
            headers: { "Content-type": "application/json" }
        })
            .then(response => response.json())
            .then(json => setOutput(json));
    }

    const handleUserSubmit = (e) => {
        e.preventDefault();

        fetch(url + '/api/users/', {
            method: 'POST',
            body: JSON.stringify({ username: form.username }),
            headers: { "Content-type": "application/json" }
        })
            .then(response => response.json())
            .then(json => setOutput(json));
    }

    return (
        <main className="mx-auto w-4/5 h-full mt-[100px] mb-[50px]">
            <section className='mb-[150px] scroll-mt-[100px] flex flex-row items-center justify-around' id='demo'>
                <form onSubmit={handleUserSubmit} action="/api/users" method="post" className='w-1/4 h-[200px] px-7 bg-gray-50 border border-gray-500 rounded-lg flex flex-col justify-center gap-5'>
                    <h2 className='text-lg'>Create User</h2>
                    <input onChange={handleChange} value={form.username} type="text" name='username' placeholder='username *' className='bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ring-1 w-full p-2.5 outline-none border border-gray-300 rounded-md px-2' />
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5 rounded-md'>Submit</button>
                </form>
                <form onSubmit={handleExerciseSubmit} method="post" className='w-1/4 h-[400px] px-7 bg-gray-50 border border-gray-500 rounded-lg flex flex-col justify-center gap-5'>
                    <h2 className='text-lg'>Create Exercise</h2>
                    <input onChange={handleChange} value={form._id} type="text" name='_id' placeholder='_id *' className='bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ring-1 w-full p-2.5 outline-none border border-gray-300 rounded-md px-2' />
                    <input onChange={handleChange} value={form.description} type="text" name='description' placeholder='description *' className='bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ring-1 w-full p-2.5 outline-none border border-gray-300 rounded-md px-2' />
                    <input onChange={handleChange} value={form.duration} type="text" name='duration' placeholder='duration *' className='bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ring-1 w-full p-2.5 outline-none border border-gray-300 rounded-md px-2' />
                    <input onChange={handleChange} value={form.date} type="text" name='date' placeholder='date' className='bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ring-1 w-full p-2.5 outline-none border border-gray-300 rounded-md px-2' />
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5 rounded-md'>Submit</button>
                </form>
                <pre className='rounded-lg h-[500px] w-2/5 language-javascript'>
                    <code className='h-full w-full language-javascript block p-2'>{JSON.stringify(output).replace(/([{,])/g, '$1\n').replace(/}/, '\n}')}</code>
                </pre>

            </section>
            <section id='guide' className='scroll-mt-[150px]'>
                <h2 className='text-4xl mb-7'>Guide</h2>
                <p className='mb-16'>Below you'll find examples using Fetch API.</p>

                <CodeSection
                    title={'Create a new user'}
                    code={refactor('api/users', { username: 'user' })}
                    output={`{ "username": "user", "_id": "64be89f431dbf8ee298f0b3d" } `}
                />
                <CodeSection
                    title={'Create an exercise'}
                    code={refactor('api/users/:_id/exercises', { _id: "64be89f431dbf8ee298f0b3d", description: "exercise", duration: 60 })}
                    output={`{ "username": "user", "description": "exercise", "duration": 60, "date": "Mon Jul 24 2023", "_id": "64be89f431dbf8ee298f0b3d" } `}
                />
                <CodeSection
                    title={'Get users'}
                    code={refactor('api/users')}
                    output={`[{ "_id": "64be89f431dbf8ee298f0b3d", "username": "user" }]`}
                />
                <CodeSection
                    title={'Get exercise log of any user'}
                    code={refactor('api/users/:_id/logs?[from][&to][&limit]')}
                    output={`{ "username": "user", "count": 1, "_id": "64be89f431dbf8ee298f0b3d", "log": [{ "description": "exercise", "duration": 60, "date": "Mon Jul 24 2023" }] } `}
                />
            </section>
        </main>
    )
}

export default Main