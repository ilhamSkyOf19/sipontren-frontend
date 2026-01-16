import { type FC, type ReactNode } from "react";
import Modal from "react-modal";

type Props = {
  children: ReactNode;
  active: boolean;
  handleClose?: () => void;
  bgTransparent?: boolean;
  fullWidth?: boolean;
};
const ModalContainer: FC<Props> = ({
  children,
  active,
  handleClose,
  bgTransparent,
  fullWidth = false,
}) => {
  return (
    <Modal
      isOpen={active}
      onRequestClose={handleClose}
      bodyOpenClassName="modal-open"
      appElement={document.getElementById("root")!}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 9998,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "relative",
          inset: "unset",
          width: fullWidth ? "auto" : "32%",
          maxHeight: "90%",
          height: "auto",
          borderRadius: "20px",
          border: "none",
          backgroundColor: bgTransparent ? "transparent" : "white",
        },
      }}
      className="animate-slide-up"
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;
