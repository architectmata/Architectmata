"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

type Book={id:string;title:string;author:string;category:string;categories:string[];age:string;language:string;readingLevel:string;readingHistory?:string;learns:string;why:string;coverImage?:string};

const readingHistoryLabels: Record<string, string> = {
 "Read as a child": "Read as a child",
 "Read recently": "Read recently",
 "Reading together": "Reading together",
 "Future family read": "On our reading list",
 "To explore": "To explore"
};

function readingHistoryLabel(value?: string) {
 return value ? readingHistoryLabels[value] ?? value : "";
}

function whyHeading(readingHistory?: string) {
 if (readingHistory === "Future family read") return "Why it’s on our reading list";
 if (readingHistory === "To explore") return "Why it’s here";
 return "Why I recommend it";
}

export function ReadLibrary({books,unavailable}:{books:Book[];unavailable:boolean}){
 const [query,setQuery]=useState(""); const [category,setCategory]=useState("All");
 const categories=["All",...Array.from(new Set(books.flatMap(b=>b.categories).filter(Boolean)))];
 const shown=useMemo(()=>books.filter(b=>(category==="All"||b.categories.includes(category))&&`${b.title} ${b.author} ${b.categories.join(" ")} ${b.age} ${b.language} ${b.readingLevel} ${b.readingHistory ?? ""} ${readingHistoryLabel(b.readingHistory)} ${b.learns} ${b.why}`.toLowerCase().includes(query.toLowerCase())),[books,category,query]);
 return <section className="read-library">
  <div className="read-tools">
   <label><span className="sr-only">Search books</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search books, subjects or ages…"/></label>
   <div className="read-filters">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"active":""}>{c}</button>)}</div>
  </div>
  <p className="read-count">{shown.length} book{shown.length===1?"":"s"}</p>
  <div className="read-grid">{shown.map(book=><article className="read-card" key={book.id}>
   <div className="read-cover">{book.coverImage?<Image src={book.coverImage} alt={`Cover of ${book.title}`} fill sizes="(max-width: 720px) 100vw, 33vw" className="object-cover"/>:<span>{book.category}</span>}</div>
   <div className="read-card-copy"><p className="read-meta">{[book.category,book.age&&`Ages ${book.age}`,book.language,book.readingLevel].filter(Boolean).join(" · ")}</p>
   {book.readingHistory&&<span className="mt-2 inline-flex border border-terracotta/30 bg-terracotta/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-terracotta dark:border-marigold/30 dark:bg-marigold/10 dark:text-marigold">{readingHistoryLabel(book.readingHistory)}</span>}
   <h2>{book.title}</h2>
   {book.author&&<p className="read-meta">by {book.author}</p>}
   {book.learns&&<div><strong>What children notice</strong><p>{book.learns}</p></div>}
   {book.why&&<div><strong>{whyHeading(book.readingHistory)}</strong><p>{book.why}</p></div>}</div>
  </article>)}</div>
  {unavailable?<p className="read-empty">Book library temporarily unavailable.</p>:!shown.length&&<p className="read-empty">No books match those filters yet.</p>}
 </section>;
}
