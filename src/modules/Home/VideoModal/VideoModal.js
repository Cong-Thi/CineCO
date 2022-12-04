import React, { useState } from "react";
import { Box } from '@mantine/core';
import { Modal } from '@mantine/core';
import "./videoModal.scss";

const style = {
  bgcolor: "background.paper",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "80%",
  border: "10px solid #f18720",
  borderRadius:"10px",
  boxShadow: 2,
};

const VideoModal = ({ trailer, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        opened={open}
        fullScreen
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe
            width="100%"
            height="100%"
            src={trailer}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Modal>
    </>
  );
};

export default VideoModal;
