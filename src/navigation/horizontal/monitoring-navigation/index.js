import React from "react"
import {BarChart, BarChart2, Bell, Circle, Database, GitBranch, Home, List} from 'react-feather'
import GetNotifySize from "../../../components/getNotifySize"

export default [
    {
        id: 'home',
        title: 'Bosh sahifa',
        icon: <Home size={20}/>,
        navLink: '/monitoring'
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
                navLink: '/monitoring/found-items'
            },
            {
                id: 'lost',
                title: 'Yo`qotilganlar',
                icon: <Circle size={20}/>,
                navLink: '/monitoring/lost-items'
            },
            {
                id: 'draft',
                title: 'Qoralamalar',
                icon: <Circle size={20}/>,
                navLink: '/monitoring/draft-found'
            },
            {
                id: 'decline-request',
                title: 'Rad etilganlar',
                icon: <Circle size={20}/>,
                navLink: '/monitoring/decline-request'
            }
        ]
    },
    {
        id: 'application',
        title: "Ma`lumotnoma",
        icon: <Database size={20}/>,
        navLink: '/monitoring/reference'
    },
    {
        id: 'expired',
        title: "Muddati buzilgan arizalar",
        icon: <BarChart2 size={20}/>,
        navLink: '/monitoring/expired'
    },
    {
        id: 'term_violations',
        title: "Muddat buzilishlar",
        icon: <BarChart size={20}/>,
        navLink: '/monitoring/term_violations'
    },
    {
        id: 'notify',
        title: "Eslatmalar",
        icon: <Bell size={20}/>,
        badge: 'light-danger',
        badgeText: <GetNotifySize/>,
        navLink: '/monitoring/notify'
    }
    // {
    //     id: 'monitoring',
    //     title: "Monitoring",
    //     icon: <GitBranch size={20}/>,
    //     children: [
    //         {
    //             id: 'monitoring_sms',
    //             title: 'Smslar',
    //             icon: <Circle size={20}/>,
    //             navLink: '/monitoring/sms'
    //         }
    //     ]
    // }
]

