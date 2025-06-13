import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faPlus } from "@fortawesome/free-solid-svg-icons";

interface EmptyStateProps {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="col-span-full text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
        <FontAwesomeIcon icon={faQrcode} className="text-gray-400 text-3xl" />
      </div>
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        No QR AR Codes Yet
      </h3>
      <p className="text-gray-500 mb-6">
        Get started by creating your first QR AR code
      </p>
      <button
        onClick={onAddClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Create QR AR Code
      </button>
    </div>
  );
}
