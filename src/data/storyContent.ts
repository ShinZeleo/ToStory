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

export const storyParagraphs: StoryParagraph[] = [
  {
    text: 'Di lereng Gunung Lokon, hiduplah masyarakat yang dipimpin oleh seorang pemburu tangguh bernama Makioholo. Ia dihormati karena keberanian dan kemampuannya mencari makan di hutan.',
  },
  {
    text: '"Selama hutan masih memberi, kita akan bertahan," katanya suatu hari sebelum berburu.',
    isQuote: true,
  },
  {
    text: 'Namun, kehidupan di sana tidak tenang. Gempa bumi sering terjadi, dan serangan dari anak-anak suku lain membuat warga resah.',
  },
  {
    text: '"Kita tidak bisa terus hidup dalam ketakutan," keluh seorang warga.',
    isQuote: true,
  },
  {
    text: 'Sebagian masyarakat pun pindah ke tempat bernama Kiniloutu. Meski lebih aman, masalah tetap ada. Makioholo dan para lelaki sering berburu ke hutan, sehingga kampung terasa tanpa pemimpin.',
    illustration: 'warriors',
    illustrationPosition: 'right',
  },
  {
    text: '"Dia jarang ada saat kita butuh," ujar salah satu pengikutnya.',
    isQuote: true,
  },
  {
    text: 'Perpecahan pun terjadi. Sebagian tetap setia, sementara yang lain memilih mencari tempat baru.',
  },
  {
    text: '"Kita akan membangun kehidupan yang lebih baik," kata seorang tokoh yang memimpin kelompok tersebut.',
    isQuote: true,
  },
  {
    text: 'Dalam perjalanan, mereka berhenti di sebuah tempat yang dipenuhi rumput. Seorang pria menebang kayu dengan kapak (tamako), namun tiba-tiba kapaknya terlepas dan terlempar.',
  },
  {
    text: '"Cepat cari!" serunya. Mereka pun menggaruk (kaskas) tanah dan rumput. Tak lama, dari tempat itu muncul mata air jernih.',
    illustration: 'digging',
    illustrationPosition: 'left',
  },
  {
    text: '"Ini tanda," kata sang tokoh. "Di sinilah kita menetap."',
    isQuote: true,
  },
  {
    text: 'Sejak itu, tempat tersebut dinamakan Kinaskas atau Kakaskasen, berasal dari kata "kaskas" menggaruk tanah yang justru menghadirkan sumber kehidupan. Dari situlah asal-usul Desa Kakaskasen 2 bermula.',
  },
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
