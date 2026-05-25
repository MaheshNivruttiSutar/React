import startupImg from '../../assets/startup.png'

function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:w-5/12 lg:w-5/12">
                        <img
                            src={startupImg}
                            alt="image"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-6/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            React development is carried out by passionate developers
                        </h2>
                        <p className="mt-6 text-gray-600">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
                            accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
                            aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
                        </p>
                        <p className="mt-4 text-gray-600">
                            Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
                            Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
                        </p>
                        <button className="mt-6 px-6 py-3 bg-orange-700 text-white rounded-lg hover:bg-orange-800 font-medium">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About