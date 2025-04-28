import { useRef, useState } from "react";
import Form from "../comps/Form";
import Header from "../comps/Header";
import Modal from "../comps/Modal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const temp = useRef<number | undefined>(undefined);
  const [deletedId, setDeletedId] = useState<number | undefined>(undefined);
  return (
    <>
      <Header />
      <Form
        deletedAward={deletedId}
        onSubmitForm={() => {
          setModalType("success");
          setModalOpen(true);
        }}
        onDeleteAward={(id: number | undefined) => {
          temp.current = id;
          if (id != undefined) {
            setModalType("delete");
            setModalOpen(true);
          }
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
          onDelete={() => {
            setDeletedId(temp.current);
            setModalOpen(false);
            temp.current = undefined;
          }}
        />
      )}
    </>
  );
}
