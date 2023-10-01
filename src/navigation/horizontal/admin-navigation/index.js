import React from 'react'
import {
    BarChart2,
    Bell,
    Circle,
    Coffee,
    Database,
    GitBranch,
    Home,
    List,
    Sliders,
    TrendingUp,
    Users
} from 'react-feather'
import {REGIONAL_ADMIN, ROLE} from "../../../utility/Utils"
import GetNotifySize from "../../../components/getNotifySize"
import {IoGitCompareOutline} from "react-icons/all"

const role = localStorage.getItem(ROLE)

const adminNavigation = [
    {
        id: 'home',
        title: 'Bosh sahifa',
        icon: <Home size={20}/>,
        navLink: '/cabinet-administrator'
    },
    {
        id: 'members',
        title: 'Foydalanuvchilar',
        icon: <Users size={20}/>,
        navLink: '/cabinet-administrator/members'
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
                navLink: '/cabinet-administrator/found-items'
            },
            {
                id: 'lost',
                title: 'Yo`qotilganlar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/lost-items'
            },
            {
                id: 'draft',
                title: 'Qoralamalar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/draft-found'
            },
            {
                id: 'decline-request',
                title: 'Rad etilganlar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/decline-request'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Statistika',
        icon: <TrendingUp size={20}/>,
        children: [
            {
                id: 'report_found',
                title: 'Topilmalar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/statistics/found'
            },
            {
                id: 'report_lost',
                title: 'Yo`qotilganlar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/statistics/lost'
            }
            // {
            //     id: 'report_draft',
            //     title: 'Qoralamalar',
            //     icon: <Circle size={20}/>,
            //     navLink: '/cabinet-administrator/statistics/draft'
            // },
            // {
            //     id: 'report_decline-request',
            //     title: 'Rad etilganlar',
            //     icon: <Circle size={20}/>,
            //     navLink: '/cabinet-administrator/statistics/decline'
            // }
        ]
    },
    {
        id: 'application',
        title: "Ma`lumotnoma",
        icon: <Database size={20}/>,
        navLink: '/cabinet-administrator/reference'
    },
    {
        id: 'compare_thing',
        title: "Ma`lumotlarni solishtirish",
        icon: <IoGitCompareOutline size={20}/>,
        navLink: '/cabinet-administrator/compare_thing'
    },
    {
        id: 'expired',
        title: "Muddat buzilishlar",
        icon: <BarChart2 size={20}/>,
       children: [
           {
               id: 'expired-found',
               title: 'Topilmalar',
               icon: <Circle size={20}/>,
               navLink: '/cabinet-administrator/expired-reference/found'
           },
           {
               id: 'expired-lost',
               title: 'Yo`qotilganlar',
               icon: <Circle size={20}/>,
               navLink: '/cabinet-administrator/expired-reference/lost'
           }
       ]
    },
    {
        id: 'notify',
        title: "Eslatmalar",
        icon: <Bell size={20}/>,
        badge: 'light-danger',
        badgeText: <GetNotifySize/>,
        navLink: '/cabinet-administrator/notify'
    },
    role !== REGIONAL_ADMIN &&
    {
        id: 'changes',
        title: "Sozlamalar",
        icon: <Sliders size={20}/>,
        children: [
            {
                id: 'positions',
                title: 'Lavozimlar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/positions'
            },
            {
                id: 'organizations',
                title: 'Organizatsiyalar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/organizations'
            },
            {
                id: 'doc-materials',
                title: 'Hujjat turlari',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/doc-materials'
            },
            {
                id: 'obj-materials',
                title: 'Buyum turlari',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/obj-materials'
            },
            {
                id: 'day-off',
                title: 'Dam olish kunlari',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/day-off'
            },
            {
                id: 'system_config',
                title: 'Konfiguratsiya',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/configuration'
            }
        ]
    },

    role !== REGIONAL_ADMIN &&
    {
        id: 'monitoring',
        title: "Monitoring",
        icon: <GitBranch size={20}/>,
        children: [
            {
                id: 'monitoring_logs',
                title: 'Loglar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/monitoring/logs'
            },
            {
                id: 'monitoring_sms',
                title: 'Smslar',
                icon: <Circle size={20}/>,
                navLink: '/cabinet-administrator/monitoring/sms'
            }
        ]
    }
    // role !== REGIONAL_ADMIN &&
    // {
    //     id: 'developer',
    //     title: "Developer",
    //     icon: <Coffee size={20}/>,
    //     children: [
    //         {
    //             id: 'dev_report_param',
    //             title: 'Statistika paramlari',
    //             icon: <Circle size={20}/>,
    //             navLink: '/cabinet-administrator/dev_report_param'
    //         }
    //         // {
    //         //     id: 'monitoring_sms',
    //         //     title: 'Smslar',
    //         //     icon: <Circle size={20}/>,
    //         //     navLink: '/cabinet-administrator/monitoring/sms'
    //         // }
    //     ]
    // },
    // {
    //     id: 'message_bell',
    //     title: "Xabarnomalar",
    //     icon: <MessageCircle size={20}/>,
    //     navLink: '/cabinet-administrator/message_bell'
    // },
]

export default adminNavigation
