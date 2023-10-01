import {Circle, Command, DollarSign, Grid, Home} from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Bosh sahifa',
    icon: <Home size={20} />,
    navLink: '/dashboard'
  },
  {
    id: 'applications',
    title: 'Ashyolar haqida ma`lumotlar kiritish',
    icon: <Grid size={20} />,
    children: [
      {
        id: 'founder',
        title: 'Topib olinganlar',
        icon: <Circle size={20} />,
        navLink: '/dashboard/found-items'
      },
      {
        id: 'lost',
        title: 'Yo`qotib qo`yilganlar',
        icon: <Circle size={20} />,
        navLink: '/dashboard/lost-items'
      },
      {
        id: 'draft',
        title: 'Qoralama',

        icon: <Circle size={20} />,
        navLink: '/dashboard/draft_items'
      }
    ]
  },
  {
    id: 'changes',
    title: "Topilmalarni solishtirish",
    icon: <Command size={20} />,
    children: [
      {
        id: 'status',
        title: 'Status',
        icon: <Circle size={20} />,
        navLink: '/changes/status'
      },
      {
        id: 'jurnal',
        title: 'Jurnal',
        icon: <Circle size={20} />,
        navLink: '/changes/jurnal'
      },
      {
        id: 'saved',
        title: 'Saqlab qo‘yilgan o‘zgartirishlar',
        icon: <Circle size={20} />,
        navLink: '/changes/saved'
      }
    ]
  },
  {
    id: 'application',
    title: "Ma`lumotnoma",
    icon: <DollarSign size={20} />,
    navLink: '/operator/reference'
  },
  {
    id: 'payment',
    title: "To'lovlar",
    icon: <DollarSign size={20} />,
    children: [
      {
        id: 'payments',
        title: 'Hisob raqam ochish',
        icon: <Circle size={20} />,
        navLink: '/payments'
      },
      {
        id: 'payments-application',
        title: 'Saqlangan ma\'lumotlar',
        icon: <Circle size={20} />,
        navLink: '/payments/info'
      },
      {
        id: 'payments-jurnal',
        title: 'Jurnal',
        icon: <Circle size={20} />,
        navLink: '/payments/jurnal'
      }
    ]
  }
]
