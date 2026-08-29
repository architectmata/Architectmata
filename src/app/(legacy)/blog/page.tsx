import {PageHero,Newsletter} from '@/components/ui';import BlogFilter from '@/components/blog-filter';
export const metadata={title:'Journal'};
export default function Blog(){return <><PageHero eyebrow="The journal" title="Notes on raising curious people." intro="Essays, practical ideas, field notes, and reading lists at the meeting point of childhood, place, design, and attention." accent="bg-sky"/><section className="px-5 py-20 md:px-10"><div className="mx-auto max-w-7xl"><BlogFilter/></div></section><Newsletter/></>}
