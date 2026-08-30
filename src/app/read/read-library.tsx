"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

type Book={title:string;author?:string;category:string;age:string;language?:string;learns:string;why:string;coverImage?:string;reviewedByArchitectmata?:boolean};
export function ReadLibrary({books}:{books:Book[]}){
 const [query,setQuery]=useState("");
 const shown=useMemo(()=>books.filter(b=>`${b.title} ${b.author??""} ${b.category} ${b.age} ${b.language??""} ${b.learns} ${b.why}`.toLowerCase().includes(query.toLowerCase())),[books,query]);
 return <section className="read-library">
  <div className="read-tools">
   <label><span className="sr-only">Search books</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search books, subjects or ages…"/></label>
  </div>
  <p className="read-count">{shown.length} recommendation{shown.length===1?"":"s"}</p>
  <div className="read-list">{shown.map(book=><article className="read-list-item" key={book.title}>
   <div className="read-book-heading">{book.coverImage&&<div className="read-book-cover"><Image src={book.coverImage} alt={`Cover of ${book.title}`} fill sizes="(max-width: 719px) 88px, 112px" className="object-cover"/></div>}<div><p className="read-meta">{[book.category,book.age&&`Ages ${book.age}`,book.language].filter(Boolean).join(" · ")}</p>{book.reviewedByArchitectmata?<span className="mt-2 inline-block border border-[#a54b32]/35 px-2 py-1 text-[.65rem] font-semibold uppercase tracking-[.12em] text-[#a54b32] dark:border-[#d99b22]/40 dark:text-[#d99b22]">Reviewed by Architectmata</span>:null}<h2>{book.title}</h2>{book.author&&<p className="read-author">by {book.author}</p>}</div></div>
   <div className="read-list-notes">
    {book.learns&&<div><strong>What children notice</strong><p>{book.learns}</p></div>}
    {book.why&&<div><strong>Why I recommend it</strong><p>{book.why}</p></div>}
   </div>
  </article>)}</div>
  {!shown.length&&<p className="read-empty">No books match that search yet.</p>}
 </section>;
}
