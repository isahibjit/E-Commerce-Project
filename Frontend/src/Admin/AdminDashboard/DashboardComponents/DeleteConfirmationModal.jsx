import React, { useEffect } from "react";

const DeleteConfirmationModal = ({ isDeleteModalOpen, onCancel, onConfirm, productName }) => {
  useEffect(() => {
    if (isDeleteModalOpen) {
      // Lock background scroll and force scroll to top
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      window.scrollTo({ top: 0, behavior: "instant" }); // instantly scroll to top
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isDeleteModalOpen]);

  if (!isDeleteModalOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete <strong>{productName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="cursor-pointer btn btn-black w-1/3 rounded-lg bg-black text-white border-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer btn  w-1/3 rounded-lg text-white py-2 px-4 bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
