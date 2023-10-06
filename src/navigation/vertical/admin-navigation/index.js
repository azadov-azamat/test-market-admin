import React from 'react'
import {Circle, Users} from 'react-feather'
import {MdOutlineEditLocationAlt, MdProductionQuantityLimits} from "react-icons/md"
import {BiStore} from "react-icons/bi"
import {GiPayMoney} from "react-icons/gi"

const adminNavigation = [
    {
        id: 'members',
        title: 'Foydalanuvchilar',
        icon: <Users size={20}/>,
        children: [
            {
                id: 'employees',
                title: 'Xodimlar',
                icon: <Circle size={20}/>,
                navLink: '/administrator/users'
            },
            {
                id: 'clients',
                title: 'Mijozlar',
                icon: <Circle size={20}/>,
                navLink: '/administrator/clients'
            }
        ]
    },
    {
        id: 'sales',
        title: "Sotilgan mahsulotlar",
        icon: <GiPayMoney size={20}/>,
        navLink: '/administrator/sales'
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
