import { NextResponse } from "next/server";
import faq from "@/lib/models/faq";
import connectDB from "@/lib/db";
import translate from "google-translate-api-x";
import mongoose from "mongoose";
import redis from "@/lib/redis";

async function translateText(text, lang) {
  try {
    const res = await translate(text, { to: lang });
    return res.text;
  } catch (err) {
    console.error(`Translation failed for ${lang}:`, err);
    return null; // Fallback to English
  }
}

// Cache invalidation helper function
async function invalidateCacheForLanguages() {
  const languages = ["en", "hi", "bn"];
  const cacheKeys = languages.map(lang => `faqs:${lang}`);
  await redis.del(...cacheKeys);
}

// GET request to fetch FAQs
export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";

  const cacheKey = `faqs:${lang}`;

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    const faqs = await faq.find();
    const formattedFaqs = faqs.map((faq) => ({
      _id: faq._id,
      question: faq.question[lang] || faq.question["en"],
      answer: faq.answer[lang] || faq.answer["en"],
    }));

    await redis.set(cacheKey, JSON.stringify({ faqs: formattedFaqs }), { EX: 3600 });

    return NextResponse.json({ faqs: formattedFaqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

// POST request to add a new FAQ
export async function POST(request) {
  await connectDB();
  const { question, answer } = await request.json();

  const newFaq = new faq({
    _id: new mongoose.Types.ObjectId(),
    question: { en: question },
    answer: { en: answer },
  });

  try {
    newFaq.question.hi = await translateText(question, "hi");
    newFaq.answer.hi = await translateText(answer, "hi");

    newFaq.question.bn = await translateText(question, "bn");
    newFaq.answer.bn = await translateText(answer, "bn");

    await newFaq.save();

    await invalidateCacheForLanguages();

    return NextResponse.json(newFaq);
  } catch (error) {
    console.error("Error saving new FAQ:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT request to update an existing FAQ
export async function PUT(request) {
  await connectDB();
  const { question, answer } = await request.json();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const faqs = await faq.findById(id);
    if (!faqs) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    faqs.question.en = question;
    faqs.answer.en = answer;
    faqs.question.hi = await translateText(question, "hi");
    faqs.answer.hi = await translateText(answer, "hi");
    faqs.question.bn = await translateText(question, "bn");
    faqs.answer.bn = await translateText(answer, "bn");

    await faqs.save();

    await invalidateCacheForLanguages();

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE request to remove an FAQ
export async function DELETE(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const faqs = await faq.findByIdAndDelete(id);
    if (!faqs) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    await invalidateCacheForLanguages();

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}