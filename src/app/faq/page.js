"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
import { DropdownMenuRadioGroupDemo } from "@/component/langMenu";

export default function AccordionDemo() {
  const [faqList, setFaqList] = useState([]);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    fetch(`/api/faq?lang=${language}`)
      .then((response) => response.json())
      .then((data) => setFaqList(data))
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, [language]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    console.log(newLanguage);
  };

  return (
    <div className="container mx-auto">
      <nav className="relative ">
        <h1 className="text-4xl font-bold text-center mt-16 -mb-20">
          Frequently Asked Questions
        </h1>
        <span className="absolute right-0 top-0">
          <DropdownMenuRadioGroupDemo onLanguageChange={handleLanguageChange} />
        </span>
      </nav>
      <div className="flex flex-col justify-center m-20 p-10">
        <Accordion type="single" collapsible className="w-full ">
          {typeof faqList.faqs !== "undefined" &&
            faqList.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger ><div dangerouslySetInnerHTML={{ __html: faq.question }}></div></AccordionTrigger>
                <AccordionContent ><div dangerouslySetInnerHTML={{ __html: faq.answer }}></div></AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
