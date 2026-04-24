export interface StoryParagraph {
  text: string;
  illustration?: 'warriors' | 'digging';
  illustrationPosition?: 'left' | 'right';
  isQuote?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const storyTitle = 'Asal Usul Desa Kakaskasen';

export interface StorySceneData {
  paragraphs: { text: string; isQuote?: boolean }[];
  illustration?: 'warriors' | 'digging' | 'mountain' | 'village';
  align?: 'left' | 'right' | 'center';
}


export const storyScenes: StorySceneData[] = [
  {
    paragraphs: [
      { text: 'Di lereng Gunung Lokon yang hijau dan subur, hiduplah sebuah kelompok masyarakat yang bergantung sepenuhnya pada alam. Mereka dipimpin oleh seorang pemburu tangguh bernama Makioholo—seorang pria yang dihormati bukan hanya karena kekuatannya, tetapi juga karena keberaniannya menantang hutan demi kehidupan warganya.' },
      { text: 'Setiap kali ia hendak berburu, Makioholo selalu mengingatkan satu hal:' },
      { text: '“Selama hutan masih memberi, kita akan bertahan.”', isQuote: true }
    ],
    align: 'center',
    illustration: 'mountain'
  },
  {
    paragraphs: [
      { text: 'Namun, alam yang memberi kehidupan itu juga menyimpan ancaman.' },
      { text: 'Gempa bumi kerap mengguncang tanah tempat mereka berpijak. Di saat yang sama, serangan dari kelompok lain membuat suasana desa semakin tidak menentu. Ketakutan perlahan tumbuh di hati para warga.' },
      { text: '“Kita tidak bisa terus hidup dalam ketakutan,” keluh seorang warga dengan suara lirih.', isQuote: true }
    ],
    align: 'right',
    illustration: 'warriors'
  },
  {
    paragraphs: [
      { text: 'Akhirnya, sebagian masyarakat memutuskan untuk pergi. Mereka meninggalkan kampung halaman dan berpindah ke sebuah tempat bernama Kiniloutu, berharap menemukan kehidupan yang lebih aman.' },
      { text: 'Namun, harapan itu tidak sepenuhnya terwujud.' },
      { text: 'Makioholo dan para lelaki tetap sering pergi berburu ke hutan, meninggalkan kampung tanpa pemimpin. Waktu berlalu, dan rasa kecewa mulai muncul di antara mereka yang ditinggalkan.' },
      { text: '“Dia jarang ada saat kita butuh,” bisik salah satu pengikutnya.', isQuote: true }
    ],
    align: 'left',
    illustration: 'village'
  },
  {
    paragraphs: [
      { text: 'Perpecahan pun tak terhindarkan.' },
      { text: 'Sebagian tetap setia pada Makioholo, tetapi sebagian lainnya memilih jalan baru—mencari tempat yang benar-benar bisa mereka sebut rumah.' },
      { text: 'Dipimpin oleh seorang tokoh baru, mereka melanjutkan perjalanan. Menembus hutan, melintasi tanah yang belum pernah mereka kenal, hingga akhirnya mereka tiba di sebuah tempat yang dipenuhi rumput liar.' }
    ],
    align: 'center'
  },
  {
    paragraphs: [
      { text: 'Di sana, sebuah peristiwa kecil mengubah segalanya.' },
      { text: 'Seorang pria sedang menebang kayu dengan kapaknya. Namun tiba-tiba, kapak itu terlepas dari genggamannya dan terlempar jauh ke dalam semak.' },
      { text: '“Cepat cari!” serunya.', isQuote: true },
      { text: 'Mereka mulai menggaruk tanah dan rumput dengan tangan mereka—kaskas, begitu mereka menyebutnya.' }
    ],
    align: 'left',
    illustration: 'digging'
  },
  {
    paragraphs: [
      { text: 'Dan dari tanah yang mereka gali itu… sesuatu yang tak terduga terjadi.' },
      { text: 'Air jernih perlahan muncul dari dalam bumi.' },
      { text: 'Sebuah mata air.' },
      { text: 'Semua terdiam.' },
      { text: 'Tokoh yang memimpin mereka menatap sumber air itu dengan penuh keyakinan.' },
      { text: '“Ini tanda,” katanya pelan.', isQuote: true },
      { text: '“Di sinilah kita menetap.”', isQuote: true }
    ],
    align: 'center'
  },
  {
    paragraphs: [
      { text: 'Sejak saat itu, tempat tersebut dinamakan Kinaskas, yang kemudian dikenal sebagai Kakaskasen—berasal dari kata kaskas, yang berarti menggaruk tanah.' },
      { text: 'Sebuah tindakan sederhana…' },
      { text: 'yang justru menghadirkan sumber kehidupan.' },
      { text: 'Dan dari sanalah, kisah Desa Kakaskasen bermula.' }
    ],
    align: 'center',
    illustration: 'village'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'Apa alasan dibalik masyarakat yang tinggal di lereng Gunung Lokon terpecah belah?',
    options: [
      'Gempa bumi dan serangan oleh anak suku lain',
      'Gempa bumi saja',
      'Serangan penjajah',
      'Karena ada pemimpin baru',
    ],
    correctIndex: 0,
  },
  {
    question: 'Siapakah nama pemimpin masyarakat di lereng Gunung Lokon?',
    options: [
      'Makiowalu',
      'Makioholo',
      'Makiolele',
      'Makilokon',
    ],
    correctIndex: 1,
  },
  {
    question: 'Apa arti kata "kaskas" yang menjadi asal nama Kakaskasen?',
    options: [
      'Menggali lubang',
      'Mencari air',
      'Menggaruk tanah',
      'Memotong kayu',
    ],
    correctIndex: 2,
  },
  {
    question: 'Apa yang ditemukan saat masyarakat menggaruk tanah?',
    options: [
      'Emas dan permata',
      'Mata air jernih',
      'Gua besar',
      'Tanah subur',
    ],
    correctIndex: 1,
  },
  {
    question: 'Ke mana masyarakat pindah sebelum akhirnya ke Kakaskasen?',
    options: [
      'Kiniloutu',
      'Tomohon',
      'Tondano',
      'Manado',
    ],
    correctIndex: 0,
  },
];
