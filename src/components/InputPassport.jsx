import ReactInputMask from "react-input-mask"
import { InputGroup, Input, Button } from "reactstrap"

const InputPassport = ({ onChange = () => null, onBlur = () => null, onSearch = () => null }) => {
    return (
        <InputGroup>
            <Input
                onChange={onChange}
                onBlur={onBlur}
                style={{ textTransform: "uppercase" }}
                name="passport_serial"
                className="w-25"
                placeholder='AB'
                type="text"
                mask="aa"
                maskplaceholder=" "
                tag={ReactInputMask} />
            <Input
                onChange={onChange}
                onBlur={onBlur}
                name="passport_number"
                placeholder='1234567'
                className="w-50"
                type='text'
                mask="9999999"
                maskplaceholder=""
                tag={ReactInputMask} />
            <Button onClick={onSearch} color="primary" className="w-25" outline>Qidirish</Button>
        </InputGroup >
    )
}
export default InputPassport