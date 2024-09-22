import React from "react";

const FAQs = () => {
  const faqData = [
    {
      question: "What is your shipping policy?",
      answer:
        "We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You will receive a tracking number via email once your order has shipped. You can track your order on our website.",
    },
    {
      question: "What is your return policy?",
      answer:
        "You can return products within 30 days of purchase for a full refund. Please ensure items are unopened and in their original packaging.",
    },
    {
      question: "Do you offer same-day delivery?",
      answer:
        "Yes, we offer same-day delivery for orders placed before noon in select areas. Please check our delivery page for availability.",
    },
    {
      question: "How do I contact customer service?",
      answer:
        "You can contact us through our Contact Us page or by emailing support@groceriesmarketplace.com.",
    },
    {
      question: "Are your products organic?",
      answer:
        "We offer a wide range of organic products. Look for the 'organic' label on the product page.",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-md p-5 transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-green-800">
              {faq.question}
            </h2>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
