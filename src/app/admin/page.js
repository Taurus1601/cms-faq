"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DropdownMenuRadioGroupDemo } from "@/component/langMenu";
import { Button } from "@/components/ui/button";
const Editor = dynamic(() => import("@/component/editor"), { ssr: false });
const Inlineeditor = dynamic(() => import("@/component/inlineEditor"), {
  ssr: false,
});

export default function page() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("<p>Start writing...</p>");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("/api/faq", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ question, answer }),
  //   });

  //   if (res.ok) {
  //     alert("FAQ added successfully!");
  //   } else {
  //     alert("Error adding FAQ");
  //   }
  // }; const [language, setLanguage] = useState('en');
  const [language, setLanguage] = useState("en");
  const [faqList, setFaqList] = useState([]);
  const [writeQuestion, setWriteQuestion] = useState(false);

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
    <div className=" mx-auto p-6  text-black rounded-lg  flex flex-col">
      <nav className="relative">
        <h1 className="text-3xl font-bold text-center mt-1 -mb-20">
          Frequently Asked Questions
        </h1>
        <span className="absolute right-0 top-0">
          <DropdownMenuRadioGroupDemo onLanguageChange={handleLanguageChange} />
        </span>
      </nav>
      <div className="  m-5 ml-20 p-10 relative">
        <div
          className="w-[70vw] h-64 overflow-y-auto border ml-10
         border-gray-300 rounded-lg"
        >
          {writeQuestion ? (
            <div className="p-24 ">
              <Inlineeditor onChange={setQuestion}/>
            </div>
          ) : (
            <div className="p-7  ">
              {typeof faqList.faqs !== "undefined" &&
                faqList.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-300"
                  onClick={}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
        <Button
          onClick={() => setWriteQuestion(!writeQuestion)}
          className="absolute right-10"
        >
          {writeQuestion ? "Cancel" : "Write a Question"}
        </Button>
      </div>
      <div className="bg-red-500">
        <h2>{}</h2>
        <h1 className="text-2xl font-bold mb-4">Answer</h1>
        <Editor onChange={setAnswer} />
      </div>
    </div>
  );
}


