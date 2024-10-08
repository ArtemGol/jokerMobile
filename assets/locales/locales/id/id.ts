import {en} from '../en/en';

export const id: typeof en = {
  bottomMenu: {
    matches: 'Cocok',
    leagues: 'Liga',
    favourites: 'Favorit',
  },
  matchesPage: {
    noInternetConnection: 'Tidak ada koneksi internet',
    topMatchesTitle: 'Pertandingan Teratas',
    vs: 'VS',
    live: 'Hidup',
    noDataTitle: 'Tidak ada acara hari ini',
    noDataDescription: 'Kembalilah besok atau pilih olahraga lain',
    showNextDayEvents: 'Tampilkan acara hari berikutnya',
    modal: {
      title: 'Ditambahkan ke favorit',
      description: 'Anda akan diberi tahu saat acara ini dimulai',
      checkBox: 'Jangan tampilkan pesan ini lagi',
      buttons: {
        settings: 'Pengaturan',
        success: 'Baik',
      },
    },
  },
  updateModal: {
    title: 'Versi baru sudah tersedia!',
    download: 'Unduh',
    description: {
      first: 'Memperbaiki bug berikut:',
    },
  },
  pushNotifications: {
    notification: {
      title: 'Aplikasi yang diperbarui berhasil diunduh.',
      message: 'Buka unduhan dan perbarui aplikasi.',
    },
    scheduleNotification: {
      title: 'Pertandingan sudah dimulai.',
      message:
        'Jangan lewatkan streaming langsung {{homeTeam}} vs {{awayTeam}} dari {{league}} League.',
    },
  },
  leaguesPage: {
    noDataTitle: 'Tidak ada liga hari ini',
    placeholder: 'Pilih liga Anda',
  },
  favoritesPage: {
    noDataTitle: 'Pertandingan favorit tidak dipilih',
    noDataDescription:
      'Anda belum memilih acara apa pun untuk olahraga saat ini',
    trashModal: {
      empty: {
        title: 'Favorit kosong',
        description: 'Tidak ada yang perlu dibersihkan',
      },
      full: {
        title: 'Favorit akan dihapus',
        description: 'Apakah Anda yakin ingin menghapus favorit?',
      },
      clear: 'Jernih',
      cancel: 'Membatalkan',
    },
  },
  leaguePage: {
    noDataTitle: 'Tidak ada acara dari liga ini',
    noDataDescription: 'Kembalilah besok atau pilih liga lain',
  },
  matchPage: {
    aboutMatch: 'Tentang Pertandingan',
    watch: 'Jam tangan',
    link: 'Tautan',
    streams: 'Aliran',
  },
  streamPage: {
    aboutStream: 'Tentang Aliran',
    stream: 'Sungai kecil',
  },
  sportsPage: {
    placeholder: 'Pilih olahraga Anda',
    sportList: {
      '57f045a7': 'Jolly Joker',
      '07753fa6': 'Liga kejuaraan UEFA',
      '0d30db42': 'Australia Terbuka',
      '7281de84': 'NBA',
      a0bb958f: 'Piala Dunia 2022',
      a2804112: 'Sepak bola',
      '9d321bb2': 'Tenis',
      a63b8aa9: 'NFL',
      bbf55c8b: 'Bola basket',
      ec2cdc35: 'Motorsport',
      '842edfba': 'Hoki es',
      '3b61c93e': 'Ragbi',
      d1d654cc: 'Bola tangan',
      '3f7a342d': 'UFC',
      '15d93549': 'Bola voli',
      f415efb9: 'Tinju',
      '00e28ace': 'Baseball',
      '4d2379e1': 'Tenis meja',
      '48ac0404': 'E-sports',
      '37e7527d': 'Jangkrik',
      '034ddd3b': 'Berkelahi',
      d833d957: 'Panahan',
      '9b0d82f3': 'Futsal',
      '362b67c6': 'Bulu tangkis',
      '123eed67': 'Voli pantai',
      eb386a00: 'Aturan Aussie',
      f092ac00: 'Hoki Lapangan',
      '2e3ab599': 'Waterpolo',
      da3972e1: 'Atletik',
      cf603120: 'Floorball',
      '5d9a63a9': 'Bersepeda',
      '3306f86d': 'Snooker',
      '3c3e36c2': 'Olahraga senam',
      95917238: 'Golf',
      '5848c23a': 'Netball',
      e2a30c9d: 'Pendakian',
      '6cca0cad': 'Olahraga musim dingin',
      '472dcae2': 'Judo',
      '147369e2': 'Bengkok',
      '652aceb6': 'Powerlifting',
      '0e59cd27': 'Olahraga Air',
      '2b9824c6': 'Taekwondo',
      '74be752b': 'Labu',
      '39c497e9': 'MLB',
      '4f452860': 'NHL',
      d4d986e8: 'NFL',
    } as Record<string, string>,
  },
  teamPage: {
    info: 'Info',
    venue: 'Lokasi',
    tournaments: 'Turnamen',
    coach: 'Pelatih',
    foundationDate: 'Tanggal yayasan',
    country: 'Negara',
    stadium: 'Stadion',
    capacity: 'Kapasitas',
    city: 'Kota',
    tabs: {
      details: 'Detail',
      feature: 'Perlengkapan',
      past: 'Hasil',
    },
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
