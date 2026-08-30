const localBookCovers: Record<string, string> = {
  "a dragon on the roof": "/images/books/A dragon on the roof.jpeg",
  "aambe kevha yenar": "/images/books/aambe kevhan yenar.JPG",
  "aambe kevhan yenar": "/images/books/aambe kevhan yenar.JPG",
  "aggobai dhaggobai": "/images/books/Aggobai Dhaggobai.jpeg",
  "bachada": "/images/books/Bachada.jpeg",
  "bokya satbande": "/images/books/Bokya Satbande.JPG",
  "bokya satbande bhag 1": "/images/books/Bookya Satbande bhag 1.jpeg",
  "bookya satbande bhag 1": "/images/books/Bookya Satbande bhag 1.jpeg",
  "champak": "/images/books/Champak.JPG",
  "chandoba": "/images/books/Chandoba.JPG",
  "discovering architecture": "/images/books/Discovering Architecture.jpeg",
  "faster fene": "/images/books/Faster Fene.JPG",
  "ghadyalache gupit": "/images/books/Ghadyalache Gupit.jpeg",
  "goshtirup ramdas": "/images/books/Goshtirup Ramdas.jpeg",
  "gulachi dhep": "/images/books/Gulachi Dhep.jpeg",
  "how to eat a book": "/images/books/how to eat a book.jpeg",
  "khodkar fuga": "/images/books/Khodkar Fuga.JPG",
  "know your forts": "/images/books/Know your forts.jpeg",
  "meghan chi rangit duniya": "/images/books/Meghan chi rangit Duniya.JPG",
  "moru": "/images/books/Moru.jpeg",
  "piyuchi wahi": "/images/books/Piyuchi wahi.JPG",
  "ranadhuranga bajirao": "/images/books/Ranadhuranga Bajirao.jpeg",
  "ravivar cha bazar": "/images/books/Ravivar cha Bazar.JPG",
  "sahas katha sancha": "/images/books/Sahas katha sancha.JPG",
  "sakkhe shejari": "/images/books/Sakkhe Shejari.jpeg",
  "shivrayanchya katha": "/images/books/shivrayanchya katha.jpeg",
  "shriram katha": "/images/books/Shriram katha.JPG",
  "su sutka": "/images/books/Su sutka.jpeg",
  "the pricklemans go wild": "/images/books/the pricklemans go wild.jpeg",
  "virdhawal": "/images/books/Virdhawal.JPG",
  "whats inside": "/images/books/whats inside.jpeg",
  "yasmeen lari": "/images/books/Yasmeen Lari.jpeg",
  "zhunzhar chatrapati sambhaji": "/images/books/Zhunzhar chatrapati Sambhaji.jpeg"
};

function normalizeBookTitle(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .toLowerCase();
}

export function getLocalBookCover(title: string) {
  return localBookCovers[normalizeBookTitle(title)];
}
