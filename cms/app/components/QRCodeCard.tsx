import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { QRCode } from "../admin/dashboard/qr-ar/page";

interface QRCodeCardProps {
  qr: QRCode;
  onEdit: () => void;
  onDelete: () => void;
}

export default function QRCodeCard({ qr, onEdit, onDelete }: QRCodeCardProps) {
  return (
    <div className="qr-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
      <div className="p-4 flex justify-center">
        <div className="bg-gray-200 w-48 h-48 flex items-center justify-center rounded-lg">
          <img
            src={qr.image}
            alt={`QR AR ${qr.shape}`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg text-gray-800 truncate capitalize">
            {qr.shape}
          </h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            ID: {qr.id.substring(0, 6)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="action-btn text-blue-500 hover:text-blue-700 transition-transform duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={onDelete}
              className="action-btn text-red-500 hover:text-red-700 transition-transform duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
