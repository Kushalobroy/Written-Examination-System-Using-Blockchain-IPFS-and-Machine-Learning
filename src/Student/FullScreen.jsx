import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/modal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function FullScreen() {
  const requestFullScreen = () => {
    if (!document.fullscreenElement) {
      const element = document.documentElement; // Get the root element (the entire page)

      if (element.requestFullscreen) {
        element.requestFullscreen(); // Standard method
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Chrome, Safari, and Opera
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
    }
  };
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>FullScreen Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Answer all the questions in fullscreen mode. You can not exit before
          submmiting the exam !!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={requestFullScreen}>
            Fullscreen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FullScreen;
