import React from "react"
import {BarChart2, Circle, Database, Home, List} from 'react-feather'

export default [
    {
        id: 'home',
        title: 'Bosh sahifa',
        icon: <Home size={20}/>,
        navLink: '/operator'
    },
    {
        id: 'applications',
        title: 'Reyestr',
        icon: <List size={20}/>,
        children: [
            {
                id: 'founder',
                title: 'Topilmalar',
                icon: <Circle size={20}/>,
                navLink: '/operator/found-items'
            },
            {
                id: 'lost',
                title: 'Yo`qotilgan ashyolar',
                icon: <Circle size={20}/>,
                navLink: '/operator/lost-items'
            },
            {
                id: 'draft',
                title: 'Qoralamalar',
                icon: <Circle size={20}/>,
                navLink: '/operator/draft-found'
            },
            {
                id: 'decline-request',
                title: 'Rad etilganlar',
                icon: <Circle size={20}/>,
                navLink: '/operator/decline-request'
            }
        ]
    },
    {
        id: 'application',
        title: "Ma`lumotnoma",
        icon: <Database size={20}/>,
        navLink: '/operator/reference'
    },
    {
        id: 'expired',
        title: "Muddati buzilgan arizalar",
        icon: <BarChart2 size={20}/>,
        navLink: '/operator/expired'
    }
    // {
    //     id: 'application',
    //     title: "Xabarnomalar",
    //     icon: <MessageCircle size={20}/>,
    //     navLink: '/operator/message_bell'
    // },
    // {
    //     id: 'application',
    //     title: "Topilmalarni solishtirish",
    //     icon: <Copy size={20}/>,
    //     navLink: '/operator/compare_thing'
    // }
]