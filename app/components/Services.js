import React from 'react';
import { FaFeatherAlt } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";

const Services = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="text-center mb-10">
          <h1 className="sm:text-5xl text-2xl font-bold title-font text-black mb-4">Why Choose Us</h1>
          <p className="text-xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">The Reason Why You Choose Us Is Because We Are:</p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 gap-2">

          <div className="p-4 sm:w-1/3 flex flex-col text-center items-center  border-blue-500 rounded-lg border-4 mx-auto">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
              <FaFeatherAlt className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-gray-900 text-2xl title-font font-bold mb-3">Simple</h2>
              <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
            </div>
          </div>

          <div className="p-4 sm:w-1/3 flex flex-col text-center items-center  border-blue-500 rounded-lg border-4 mx-auto">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
              <RiSecurePaymentLine className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-gray-900 text-2xl title-font font-bold mb-3">Safe</h2>
              <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
            </div>
          </div>

          <div className="p-4 sm:w-1/3 flex flex-col text-center items-center  border-blue-500 rounded-lg border-4 mx-auto">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
              <FaRegHandshake className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-gray-900 text-2xl title-font font-bold mb-3">Secure</h2>
              <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Services;
