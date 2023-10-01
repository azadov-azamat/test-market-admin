import React from "react"
import {Badge} from "reactstrap"

export default ({status}) => {
    switch (status) {
        case "MONDAY":
            return "Dushanba"
        case "TUESDAY":
            return "Seshanba"
        case "WEDNESDAY":
            return "Chorshanba"
        case "THURSDAY":
            return "Payshanba"
        case "FRIDAY":
            return "Juma"
        case "SATURDAY":
            return "Shanba"
        case "SUNDAY":
            return "Yakshanba"
        default:
            return "Dushanba"
    }
}