import {Form} from '@remix-run/react';
import DatePicker from '~/components/DatePicker';
export default function Index() {
    return (
        <Form>
            <div className='flex pt-14 md:pt-24 justify-center md:justify-end md:pr-20 '>
                <div className='p-4 w-80 border rounded'>
                    <h1 className='text-[25px]'>
                        Create an account to continue!
                    </h1>
                    <label htmlFor='name'>Username</label>
                    <div className='relative w-full mb-3'>
                        <input
                            type='text'
                            id='name'
                            className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='yourname'
                        />
                    </div>
                    <DatePicker id='dateOfBirth' label='Birthday' />
                    <label htmlFor='password'>Password</label>
                    <div className='relative w-full mb-3'>
                        <input
                            type='password'
                            id='password'
                            className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='******'
                        />
                    </div>
                    <div className='text-center'>
                        <button
                            className='rounded bg-blue-400 border border-blue-700 text-white px-2 py-0.5 hover:bg-blue-500'
                            type='submit'
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </Form>
    );
}
