import { redirect } from 'react-router-dom'

export const contactAction = async ({ request }) => {
    console.log("Request received", request)
    const data = await request.formData()
    const submission = {
        email: data.get('email'),
        message: data.get('message')
    }
    console.log(submission)
    //send post request
    if (submission.message.length < 10) {
        return { error: 'Message must be at least 10 characters long' }
    }
    return redirect('/')
}