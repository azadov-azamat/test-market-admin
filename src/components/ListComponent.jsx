import React from 'react'
import {Collapse} from "reactstrap"
// import { Collapse } from 'antd'

const List = ({ onChange, children, ...props }) => (
    <Collapse
        {...props}
        accordion
        destroyInactivePanel
        expandIcon={() => null}
        onChange={value => !!onChange && onChange(value)}
    >
        {children}
    </Collapse>
)

export default List
