import {Button, Col, Modal, ModalBody, Row} from "reactstrap"

export default function DeleteModal({
                                        toggleModal,
                                        modal,
                                        onFunction
                                    }) {

    const deleteFunction = () => {
        onFunction()
        setTimeout(() => {
            toggleModal()
        }, 600)
    }

    return (
        <Modal
            isOpen={modal}
            toggle={toggleModal}
            size={"md"}
            className="modal-dialog-centered"
        >
            <ModalBody>
                <Row xs={1} className={"py-2"}>
                    <Col className={"text-center"}>
                        <h4>Rostan ham o'chirmoqchimisiz!</h4>
                        <p>O'chirilgan item ni keyinchalik tiklash imkoniyati yo'q</p>
                    </Col>
                </Row>
                <hr/>
                <div className="w-100 d-flex justify-content-end gap-1">
                    <Button onClick={toggleModal} color={"primary"}>Bekor qilish</Button>
                    <Button onClick={deleteFunction} color={"danger"}>O'chirish</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}