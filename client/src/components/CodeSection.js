function CodeSection({ code, output, title }) {

    return (
        <section className='mt-16'>
            <h3 className='text-2xl mb-5 font-bold'>{title}</h3>

            <pre className='rounded-lg'>
                <code className='language-javascript block p-2'>{code}</code>
            </pre>
            <p className='my-5'>👇 Output</p>
            <pre className='rounded-lg'>
                <code className='language-javascript block p-2'>{output}</code>
            </pre>
        </section>)
}

export default CodeSection