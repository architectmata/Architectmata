"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

type Book={title:string;category:string;age:string;learns:string;why:string;coverImage?:string};
export function ReadLibrary({books}:{books:Book[]}){
 const [query,setQuery]=useState(""); const [category,setCategory]=useState("All");
 const categories=["All",...Array.from(new Set(books.map(b=>b.category).filter(Boolean)))];
 const shown=useMemo(()=>books.filter(b=>(category==="All"||b.category===category)&&`${b.title} ${b.category} ${b.age} ${b.learns} ${b.why}`.toLowerCase().includes(query.toLowerCase())),[books,category,query]);
 return <section className="read-library">
  <div className="read-tools">
   <label><span className="sr-only">Search books</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search books, subjects or ages…"/></label>
   <div className="read-filters">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"active":""}>{c}</button>)}</div>
  </div>
  <p className="read-count">{shown.length} recommendation{shown.length===1?"":"s"}</p>
  <div className="read-grid">{shown.map(book=><article className="read-card" key={book.title}>
   <div className="read-cover">{book.coverImage?<Image src={book.coverImage} alt={`Cover of ${book.title}`} fill sizes="(max-width: 720px) 100vw, 33vw" className="object-cover"/>:<span>{book.category}</span>}</div>
   <div className="read-card-copy"><p className="read-meta">{book.category} · Ages {book.age}</p><h2>{book.title}</h2>
   {book.learns&&<div><strong>What children notice</strong><p>{book.learns}</p></div>}
   {book.why&&<div><strong>Why I recommend it</strong><p>{book.why}</p></div>}</div>
  </article>)}</div>
  {!shown.length&&<p className="read-empty">No books match those filters yet.</p>}
 </section>;
}
