import { NextResponse } from "next/server";
import faq from "@/lib/models/faq";
import connectDB from "@/lib/db";
import translate from "google-translate-api-x";

async function translateText(text, lang) {
  try {
    const res = await translate(text, { to: lang });
    return res.text; 
  } catch (err) {
    console.error(`Translation failed for ${lang}:`, err);
   
  }
}

export async function GET(request) {
    await connectDB();
  
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";
    const faqs = await faq.find();
    //   console.log(res.text); //=> I speak English
  
    //   console.log(searchParams);
    return NextResponse.json({
     faqs: faqs.map((faq) => {
        return {
            question: faq.question[lang] || faq.question["en"],
            answer: faq.answer[lang] || faq.answer["en"],
        };
        }),
    });
  }
  
export async function POST(request) {
  await connectDB();
  const { question, answer } = await request.json();

  const newFaq = new faq({
    question: { en: question },
    answer: { en: answer },
  });

  try {
    newFaq.question.hi = await translateText(question, "hi");
    newFaq.answer.hi = await translateText(answer, "hi");

    newFaq.question.bn = await translateText(question, "bn");
    newFaq.answer.bn = await translateText(answer, "bn");

    await newFaq.save();
    return NextResponse.json(newFaq);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}