import { useState } from "react";
import Form from "../comps/Form";
import Header from "../comps/Header";
import Modal from "../comps/Modal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  return (
    <>
      <Header />
      <Form
        onSubmitForm={() => {
          setModalType("success");
          setModalOpen(true);
        }}
        onDeleteAward={() => {
          setModalType("delete");
          setModalOpen(true);
        }}
        onErr={(text) => {
          setModalType(text);
          setModalOpen(true);
        }}
      />
      <div
        hidden={!isModalOpen}
        className="z-10 bg-black opacity-[60%] w-[100vw] h-[100vh] fixed top-0 left-0"
      />
      {isModalOpen && (
        <Modal
          type={modalType}
          onClose={() => setModalOpen(false)}
          onDelete={() => {}}
        />
      )}
    </>
  );
}
