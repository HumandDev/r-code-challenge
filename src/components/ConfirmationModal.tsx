import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#0f172F",
  border: "2px solid #0f172A",
  borderRadius: "0.375rem",
  boxShadow: 12,
  pt: 2,
  px: 4,
  pb: 3,
};

type Props = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
  text: string;
  confirmText?: string;
  rejectText?: string;
};

function ConfirmationModal({
  opened,
  text,
  confirmText,
  rejectText,
  onClose,
  onConfirm,
  onReject,
}: Props) {
  return (
    <Modal
      open={opened}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-slate-300"
        >
          {text}
        </Typography>
        <div className="flex flex-row item-center justify-end gap-4 mt-3">
          <button
            onClick={onConfirm}
            className="text-slate-300 py-2 px-8 bg-slate-600 rounded text-lg hover:bg-slate-700"
          >
            {confirmText ?? "Yes"}
          </button>
          <button
            className="text-slate-900 py-2 px-8 bg-slate-400 rounded text-lg hover:bg-slate-500 hover:text-slate-300"
            onClick={onReject}
          >
            {rejectText ?? "No"}
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
