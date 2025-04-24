import { useRef, useState } from "react";
import Form from "../comps/Form";
import Header from "../comps/Header";
import Modal from "../comps/Modal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalType = useRef("");
  return (
    <>
      <Header />
      <Form />
      <div
        hidden={!isModalOpen}
        className="z-10 bg-black opacity-[60%] w-[100vw] h-[100vh] fixed top-0 left-0"
      />
      {isModalOpen && (
        <Modal
          type={modalType.current}
          onClose={() => setModalOpen(false)}
          onDelete={() => {}}
        />
      )}
    </>
  );
}
