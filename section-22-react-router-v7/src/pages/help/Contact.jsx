import { Form } from 'react-router-dom'
import { useActionData } from 'react-router-dom'

function Contact() {

    const data = useActionData()

    return (
        <div className="contact" action="/help/contact">
            <h3>Contact Us</h3>
            <Form method="post">
                <label>
                    <span>Your Email:</span>
                    <input type="email" name="email" required />
                </label>
                <label>
                    <span>Your message:</span>
                    <textarea name="message" required></textarea>
                </label>
                <button>Submit</button>

                {data && data.error && <p>{data.error}</p>}
            </Form>
        </div>
    )
}

export default Contact
