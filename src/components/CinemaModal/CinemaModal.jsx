import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const CinemaModal = ({show, handleCloseCinema}) => {
  return (
    <>
        <Modal show={show} onHide={handleCloseCinema}>
        <Modal.Header closeButton>
          <Modal.Title>
            Thêm Lịch Chiếu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCinema}>
            Hủy
          </Button>
          <Button
            variant="primary"
            type="submit"
            // onClick={handleSubmit(onSubmit)}
          >
            Thêm
          </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default CinemaModal