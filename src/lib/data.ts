export const nav=[['Observe','/observe'],['Read','/read'],['Explore','/travel'],['Create','/art-classes'],['About','/about']] as const;
export type Book={title:string;author?:string;category:string;age:string;language?:string;color:string;summary:string;learn:string;why:string;image?:string};
export const books:Book[]=[
 {title:'What Can You Do with a Rock?',category:'Nature',age:'3–8',color:'bg-sky',image:'/images/field-notes/what-can-you-do-with-a-rock.jpg',summary:'A poetic invitation to collect, sort, build with, and wonder about rocks.',learn:'Observation, imaginative play, geology, and the stories held by ordinary things.',why:'It begins with something children already love to pocket and turns it into a world of questions.'},
 {title:'Iggy Peck, Architect',category:'Architecture',age:'4–8',color:'bg-sun',summary:'A joyful story about a child who cannot stop building.',learn:'Creative problem-solving, structure, and perseverance.',why:'It makes architecture feel playful, possible, and close at hand.'},
 {title:'The Little Island',category:'Nature',age:'4–9',color:'bg-sky',summary:'A lyrical portrait of an island through seasons and change.',learn:'Habitats, tides, seasons, and belonging.',why:'A beautiful invitation to observe one place very closely.'},
 {title:'चिंटू आणि निसर्ग',category:'Marathi Books',age:'5–9',color:'bg-rose',summary:'A warm Marathi story of curiosity in the natural world.',learn:'Marathi vocabulary, observation, and care for nature.',why:'It connects language, family, and place with gentleness.'},
 {title:'The Most Magnificent Thing',category:'STEM',age:'4–8',color:'bg-clay',summary:'A young maker learns from frustration and iteration.',learn:'Design thinking, resilience, and prototyping.',why:'It shows children that making includes mistakes.'},
 {title:'A House Is a House for Me',category:'Picture Books',age:'3–7',color:'bg-moss',summary:'An imaginative tour through the many meanings of home.',learn:'Classification, habitats, and spatial imagination.',why:'Its wordplay starts wonderful conversations about shelter.'},
 {title:'The Wild Robot',category:'Chapter Books',age:'7–11',color:'bg-sky',summary:'A robot learns to survive—and belong—on a wild island.',learn:'Ecology, adaptation, empathy, and community.',why:'A generous bridge between technology and the living world.'}];
export const posts=[
 {title:'How to Look at a Building With a Child',category:'Architecture',date:'June 18, 2026',excerpt:'Five open-ended questions that turn any neighborhood walk into a small architecture lesson.'},
 {title:'Our Tide Pool Field Kit',category:'Travel',date:'May 30, 2026',excerpt:'What we pack, what we leave behind, and how we practice looking without taking.'},
 {title:'Why Children Need Beautiful Nonfiction',category:'Books',date:'May 08, 2026',excerpt:'On visual literacy, real questions, and books that trust young readers.'},
 {title:'Making Maps From Memory',category:'Art',date:'April 22, 2026',excerpt:'A studio prompt that brings drawing, storytelling, and place together.'}];
export const destinations=[
 {name:'Rockies in Winter',place:'Alberta',tags:['Frozen lakes','Mountain forms','Family field note'],color:'bg-sky',image:'/images/field-notes/manasi-mountain-field-note.jpg'},
 {name:'Seven Magic Mountains',place:'Nevada',tags:['Public art','Color','Desert landscape'],color:'bg-clay',image:'/images/field-notes/manasi-seven-magic-mountains.jpg'},
 {name:'Olympic National Park',place:'Washington',tags:['Tide pools','Junior Ranger','Rainforest'],color:'bg-sun'}];
export const resources=[
 {title:'Look at a Building',type:'Observation sheet',meta:'2 pages · PDF'},
 {title:'Museum Explorer Bingo',type:'Activity card',meta:'1 page · PDF'},
 {title:'Family Field Trip Planner',type:'Travel planner',meta:'4 pages · PDF'},
 {title:'Architecture Books for Ages 4–10',type:'Booklist',meta:'3 pages · PDF'},
 {title:'Neighborhood Shape Hunt',type:'Scavenger hunt',meta:'2 pages · PDF'},
 {title:'My Place Journal',type:'Mini booklet',meta:'8 pages · PDF'}];
