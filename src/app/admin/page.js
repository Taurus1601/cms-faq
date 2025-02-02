"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DropdownMenuRadioGroupDemo } from "@/component/langMenu";
import { Button } from "@/components/ui/button";
import { set } from "mongoose";

const Editor = dynamic(() => import("@/component/editor"), { ssr: false });
const Inlineeditor = dynamic(() => import("@/component/inlineEditor"), { ssr: false });

export default function Page() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("en");
  const [faqList, setFaqList] = useState([]);
  const [writeQuestion, setWriteQuestion] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [item , setItem] = useState(null);
  const [sonar, setSonar] = useState(false);
  
  useEffect(() => {
    fetch(`/api/faq?lang=${language}`)
      .then((response) => response.json())
      .then((data) => setFaqList(data.faqs || []))
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, [language, submit]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleSelectedFaq = (faq) => {
    setItem(faq.question);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setSonar(!sonar);
    setWriteQuestion(!writeQuestion);
    console.log(item);
    
     
  };

  useEffect(() => {
    if (item) {
      setQuestion(item.question);
    setAnswer(item.answer);
    setSonar(!sonar);
    if (writeQuestion==false){
    setWriteQuestion(!writeQuestion);}
    }
   
  }, [item]);

  const handleUpdate = async () => {
    if (item==null) return;

    try {
      const res = await fetch(`/api/faq?id=${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      if (res.ok) {
        
        setQuestion("");
        setAnswer("");
        setWriteQuestion(!writeQuestion);
      } else {
        alert("Error updating FAQ");
      }
    } catch (error) {
      console.log("Error updating FAQ:", error);
    }
    setSonar(!sonar);
    setSubmit(!submit);
    setItem(null);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/faq`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      
      setSubmit(!submit);
      if (res.ok) {
        setQuestion("");
        setAnswer("");
      } else {
        alert("Error creating FAQ");
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
  }

  const handleDelete = (id) => async () => {
    try {
      const res = await fetch(`/api/faq?id=${id}`, {
        method: "DELETE",
      });
      setSubmit(!submit);
      if (!res.ok) {
        console.error("Error deleting FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  return (
    <div className="mx-auto p-6 text-black rounded-lg flex flex-col">
      <nav className="relative">
        <h1 className="text-3xl font-bold text-center mt-1 -mb-20">Frequently Asked Questions</h1>
        <span className="absolute right-0 top-0">
          <DropdownMenuRadioGroupDemo onLanguageChange={handleLanguageChange} />
        </span>
      </nav>

      <div className="m-5 ml-20 p-10 relative">
        <div className="w-[70vw] h-64 overflow-y-auto border ml-10 border-gray-300 rounded-lg">
          {writeQuestion ? (
            <div className="p-24">
              <Inlineeditor onChange={setQuestion} content={question} />
            </div>
          ) : (
            <div className="p-7">
              {faqList.length > 0 ? (
                faqList.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-300 hover:bg-gray-100 p-4 cursor-pointer transition duration-300 ease-in-out relative"
                  >
                    <h3 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: faq.question }} ></h3>
                    <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                    <Button
                      variant="primary"
                      className="absolute right-20 top-7"
                      onClick={()=>setItem(faq)}
                      
                    >
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      className="absolute right-2 top-7"
                      onClick={handleDelete(faq._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No FAQs available</p>
              )}
            </div>
          )}
        </div>
        <Button onClick={() => setWriteQuestion(!writeQuestion)} className="absolute right-10">
          {writeQuestion ? "Cancel" : "Write a Question"}
        </Button>
      </div>

      <div className=" p-5 rounded-lg relative">
        <h1 className="text-2xl font-bold mb-4">Answer</h1>
        <Editor onChange={setAnswer} content={answer} />
        {item && (
         <Button onClick={handleUpdate} className="absolute right-12 -bottom-10">Update</Button>
        )}
        {!sonar && (
          <Button onClick={handleSubmit} className="absolute right-12 -bottom-10">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}