import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalConfirmacion(props) {
  const { show, message, onConfirm, onCancel } = props;

  function handleConfirm() {
    onConfirm();
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Sí
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmacion;