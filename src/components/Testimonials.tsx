/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO of Company A",
    text: "This service has transformed the way we operate. Highly recommend!",
    image:
      "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600", // Adjust the path as needed
  },
  {
    name: "Jane Smith",
    role: "Manager at Company B",
    text: "Incredible support and amazing quality. Our team is thrilled!",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600", // Adjust the path as needed
  },
  {
    name: "Mike Johnson",
    role: "Freelancer",
    text: "I've never experienced such efficiency and professionalism.",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600", // Adjust the path as needed
  },
];

const TestimonialSection = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-green-400 to-blue-500">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          What Our Clients Say
        </h2>
        <div className="flex flex-wrap justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="max-w-xs mx-4 mb-8 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={400}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
