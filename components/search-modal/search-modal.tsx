import React, { ChangeEvent, useRef, useState, FC, useEffect } from "react";
import styles from "./search-modal.module.css";
import SearchBar from "../search-bar/search-bar";
import SearchResults from "../search-results-list/search-results-list";
import useBreedSearch from "@/hooks/useBreedSearch";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [breedName, setBreedName] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);
  const searchResults = useBreedSearch(breedName);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isModalOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    onClose();
    setIsModalOpen(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBreedName(e.target.value);
  };
  return (
    <dialog ref={modalRef} className={styles.searchModal}>
      <div className={styles.searchModalContainer}>
        <span onClick={handleCloseModal} className={styles.closeModal}>
          x
        </span>
        <div className={styles.searchBar}>
          <SearchBar onChange={handleSearchChange} showBorder />
          <SearchResults height="100vh" searchResults={searchResults} />
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
