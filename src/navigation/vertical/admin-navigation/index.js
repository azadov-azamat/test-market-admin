import React from 'react'
import {Circle, Users} from 'react-feather'
import {MdOutlineEditLocationAlt, MdProductionQuantityLimits} from "react-icons/md"
import {BiStore} from "react-icons/bi"

const adminNavigation = [
    {
        id: 'members',
        title: 'Foydalanuvchilar',
        icon: <Users size={20}/>,
        children: [
            {
                id: 'members',
                title: 'Xodimlar',
                icon: <Circle size={20}/>,
                navLink: '/administrator/users'
            },
            {
                id: 'members',
                title: 'Mijozlar',
                icon: <Circle size={20}/>,
                navLink: '/administrator/clients'
            }
        ]
    },
    {
        id: 'stores',
        title: "Do'konlar",
        icon: <BiStore size={20}/>,
        navLink: '/administrator/stores'
    },
    {
        id: 'products',
        title: 'Mahsulotlar',
        icon: <MdProductionQuantityLimits size={20}/>,
        navLink: '/administrator/products'
    },
    {
        id: 'address',
        title: 'Manzillar',
        icon: <MdOutlineEditLocationAlt size={20}/>,
        navLink: '/administrator/addresses'
    }
]

export default adminNavigation
