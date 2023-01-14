import {en} from '../en/en';

export const id: typeof en = {
  header: {
    placeholder: 'Mencari',
    subscribe: 'Langganan',
    tabs: {
      dns: 'DNS',
      webmasters: 'WEB',
      webmastersShort: 'WEB',
    } as Record<string, string>,
    liveStreams: 'Siaran langsung',
    addStream: 'Tambahkan arus Anda',
    navbar: {
      other: 'Lainnya',
    },
  },
  layout: {
    noMatchesFound: {
      title: 'Tidak ditemukan kecocokan',
      description:
        'Maaf, tidak ada kecocokan yang ditemukan untuk pencarian Anda',
    },
    chatIsLoading: 'Obrolan sedang dimuat',
    chatButtons: {
      hide: 'Bersembunyi',
      adv: 'Lanjut',
      chat: 'Mengobrol',
      tgChat: 'Obrolan tg',
    } as Record<string, string>,
    liveStreams: 'Streaming langsung',
  },
  footer: {
    'football-live-stream': 'Sepak bola',
    basketball: 'Bola basket',
    tennis: 'Tenis',
    'american-football': 'Sepak Bola Amerika',
  } as Record<string, string>,
  forWebMastersPage: {
    breadCrumbs: 'Tambahkan Arus Anda',
    title: 'Tautan Streaming Video Langsung untuk Webmaster!',
    putStream: 'Tempatkan Widget Aliran Olahraga kami di situs web Anda.',
    copyPaste: 'Cukup salin/tempel kode ini ke halaman Anda:',
    copyPasteGenerated: 'Salin/tempel kode yang dihasilkan ke halaman Anda:',
    seeExample: 'Klik di sini untuk melihat contoh (Tampilan Standar)',
    customize:
      'Jika Anda perlu menyesuaikan tata letak Anda, gunakan formulir di bawah ini\n:',
    allSports: 'Semua olahraga',
    settings: {
      sports: 'Olahraga:',
      showLive: 'Tampilkan langsung:',
      timeZone: 'Zona waktu:',
    },
    preview: 'Pratinjau:',
  },
  dnsPage: {
    headerSpan:
      'Untuk mengubah pengaturan DNS di Windows 10 menggunakan Panel Kontrol, gunakan langkah-langkah ini:',
    olList1: {
      1: 'Buka Panel Kontrol.',
      2: 'Klik Jaringan dan Internet.',
      3: 'Klik Jaringan dan Pusat Berbagi.',
      4: 'Klik opsi Ubah pengaturan adaptor di panel kiri.',
      5: `Klik kanan antarmuka jaringan yang menghubungkan Windows 10 ke internet, dan pilih opsi Properties.<br/>
          Kiat cepat: Anda akan tahu adaptor mana yang terhubung ke jaringan karena tidak ada label "Nonaktif" atau "Kabel jaringan dicabut".`,
      6: 'Pilih dan centang opsi Internet Protocol Version 4 (TCP/IPv4).',
      7: 'Klik tombol Properti.',
      8: 'Pilih opsi Gunakan alamat server DNS berikut.',
      9: `Ketikkan alamat DNS "pilihan" dan "alternatif" Anda.<br />
          Jika Anda ingin menggunakan Cloudflare, Google Public DNS, atau Cisco OpenDNS, Anda dapat menggunakan pengaturan ini:`,
    } as Record<string, string>,
    ulList: {
      1: 'Cloudflare: 1.1.1.1 and 1.0.0.1',
      2: 'Google Public DNS: 8.8.8.8 and 8.8.4.4',
      3: 'Google Public DNS: 8.8.8.8 and 8.8.4.4',
      4: 'OpenDNS: 208.67.222.222 and 208.67.220.220',
    } as Record<string, string>,
    olList2: {
      10: '(Opsional) Klik tombol Lanjutan',
      11: 'Klik tab DNS.',
      12: 'Klik tombol Tambah.',
      13: 'Tentukan alamat server DNS alternatif.',
      14: 'Klik tombol Tambah.',
      15: 'Klik tombol OK.',
      16: 'Klik tombol Tutup.',
    } as Record<string, string>,
  },
  developmentPage: {
    breadCrumbs: 'Dalam Pengembangan',
    title: 'Halaman dalam pengembangan',
    description:
      'Maaf, halaman ini sedang dalam pengembangan. Anda akan segera dapat menambahkan aliran Anda, terima kasih!',
  },
  matchPage: {
    link: 'Tautan',
    players: {
      flash: 'Kilatan',
      youtube: 'Youtube',
    } as Record<string, string>,
    timer: {
      afterCountDays: 'Dalam {{dayN}} hari',
    },
  },
  gamePage: {
    topMatches: {
      title: 'Pertandingan Teratas',
      vs: 'vs',
    },
    noData: 'Tidak ada data',
    live: 'Hidup',
    watch: 'Menonton',
    scrollToTop: 'Gulir ke atas',
    loadMore: 'Muat lebih banyak',
    allCompetitions: 'Semua kompetisi',
    favourites: {
      title: 'Favorit',
      clearAll: 'Bersihkan semua',
    },
  },
  worldCupPage: {
    buttons: {
      groups: 'Grup',
      knockOut: 'Pukulan knockout',
    } as Record<string, string>,
    groupsHeader: {
      P: 'B',
      W: 'M',
      D: 'S',
      L: 'K',
      goals: 'Sasaran',
      points: 'Poin',
    } as Record<string, string>,
    knockOutFormulations: {
      '1/8': '1/8',
      '1/4': '1/4',
      '1/2': '1/2',
      quarterfinals: 'Perempat final',
      semifinals: 'Semifinal',
      final: 'Terakhir',
    } as Record<string, string>,
    title: 'Streaming Langsung Piala Dunia',
    breadCrumbs: 'Streaming Langsung Piala Dunia 2022',
  },
  monthList: {
    default: {
      0: 'Januari',
      1: 'Februari',
      2: 'Berbaris',
      3: 'April',
      4: 'Mungkin',
      5: 'Juni',
      6: 'Juli',
      7: 'Agustus',
      8: 'September',
      9: 'Oktober',
      10: 'November',
      11: 'Desember',
    } as Record<string, string>,
    short: {
      0: 'Jan',
      1: 'Feb',
      2: 'Ber',
      3: 'Apr',
      4: 'Mun',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Okt',
      10: 'Nov',
      11: 'Des',
    } as Record<string, string>,
    dayOfWeek: {
      0: 'se',
      1: 'sl',
      2: 'ra',
      3: 'ka',
      4: 'ju',
      5: 'sa',
      6: 'mi',
    } as Record<string, string>,
    dayOfWeekFull: {
      0: 'Senin',
      1: 'Selasa',
      2: 'Rabu',
      3: 'Kamis',
      4: 'Jumat',
      5: 'Sabtu',
      6: 'Minggu',
    } as Record<string, string>,
  },
};
