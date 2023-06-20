"use client";

import Modal from "@/app/components/modal/Modal";
import Image from "next/image";

type Props = {
  isOpen?: boolean;
  src?: string | null;
  onClose: () => void;
};

export default function ImageModal({ isOpen, onClose, src }: Props) {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen!} onClose={onClose}>
      <div className="w-96 h-96 p-4">
        <Image alt="Modal Image" fill src={src} className="object-cover" />
      </div>
    </Modal>
  );
}
