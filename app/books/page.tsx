import {PageHero,Newsletter} from '@/components/ui';import BookLibrary from '@/components/book-library';
export const metadata={title:'Children’s Books'};
export default function Books(){return <><PageHero eyebrow="The bookshelf" title="Books for curious eyes and open minds." intro="Honest, useful reviews of children’s books about buildings, nature, science, art, language, and the wide world." accent="bg-sun"/><section className="px-5 py-20 md:px-10"><div className="mx-auto max-w-7xl"><BookLibrary/></div></section><Newsletter/></>}
