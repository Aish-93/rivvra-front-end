import React,{useState} from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Faq =() =>{

    const faqs =[
        { question:"What apps and module will get the access after suscription?",
            answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
        },
        { question:"How much is the free trail period?",
            answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
        },
        { question:"What after trail period is over?",
            answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
        },
        { question:"What all plans do I have",
            answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
        },
        { question:"Is multi-company is available?",
            answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
        },
        { question:"How much is the free trail period?",
            answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
        },
        { question:"What after trail period is over?",
            answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }
    return(
        
<div className="bg-gray-100 py-10 px-4 md:px-16 lg:px-32">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {activeIndex === index ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>
            {activeIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
        
    )
};

export default Faq;