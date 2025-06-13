"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTimes,
  faFileImage,
  faFileAudio,
  faEdit,
  faTrash,
  faShapes,
  faSpinner,
  faChevronLeft,
  faChevronRight,
  faImage,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

type Shape = {
  id: string;
  shape: string;
  title: string;
  color: string;
  formulaArea: string;
  formulaPerimeter: string;
  content: string;
  audio: string;
};

const ShapeManagementSystem = () => {
  // State management
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [filteredShapes, setFilteredShapes] = useState<Shape[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterShape, setFilterShape] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [contentPreview, setContentPreview] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // File input refs
  const contentInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Fetch shapes on mount
  useEffect(() => {
    fetchShapes();
  }, []);

  // Filter shapes when search/filters change
  useEffect(() => {
    filterShapes();
  }, [searchTerm, filterShape, filterColor, shapes]);

  const fetchShapes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/bangun-datar"
      );

      if (response.data.metadata.error === 0) {
        setShapes(response.data.data);
        setError(null);
      } else {
        setError(response.data.metadata.message);
      }
    } catch (error: any) {
      console.error("Error fetching shapes:", error);
      setError("Gagal mengambil data shape. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const filterShapes = () => {
    let result = [...shapes];

    if (searchTerm) {
      result = result.filter(
        (shape) =>
          shape.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shape.shape.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterShape) {
      result = result.filter((shape) => shape.shape === filterShape);
    }

    if (filterColor) {
      result = result.filter((shape) => shape.color === filterColor);
    }

    setFilteredShapes(result);
  };

  const handleCreateClick = () => {
    setCurrentShape(null);
    setIsEditing(false);
    setShowForm(true);
    setContentPreview(null);
    setAudioPreview(null);
  };

  const handleEdit = (shape: Shape) => {
    setCurrentShape(shape);
    setIsEditing(true);
    setShowForm(true);
    // Set previews from existing URLs
    if (shape.content) setContentPreview(shape.content);
    if (shape.audio) setAudioPreview(shape.audio);
  };

  const handleDeleteClick = (shape: Shape) => {
    setCurrentShape(shape);
    setShowModal(true);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "content" | "audio"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
    if (file.size > MAX_FILE_SIZE) {
      alert(`Ukuran file terlalu besar. Maksimal 1MB.`);
      e.target.value = "";
      return;
    }

    if (type === "content" && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContentPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (type === "audio" && file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      setAudioPreview(url);
    }
  };

  const removeFile = (type: "content" | "audio") => {
    if (type === "content") {
      setContentPreview(null);
      if (contentInputRef.current) contentInputRef.current.value = "";
    } else {
      setAudioPreview(null);
      if (audioInputRef.current) audioInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const contentFile = formData.get("content") as File;
    const audioFile = formData.get("audio") as File;

    try {
      // Create or update shape
      if (isEditing && currentShape) {
        // For update, use existing URLs if no new files are uploaded
        if (contentPreview && contentPreview.startsWith("blob:")) {
          // New file uploaded, use the preview URL
        } else if (!contentFile || !contentFile.size) {
          if (currentShape?.content) {
            formData.append("existingContent", currentShape.content);
          }
        }

        if (!audioFile || !audioFile.size) {
          if (currentShape?.audio) {
            formData.append("existingAudio", currentShape.audio);
          }
        } else if (!audioFile.size && currentShape.audio) {
          formData.append("existingAudio", currentShape.audio);
        }

        await axios.put(
          `http://localhost:3001/api/bangun-datar/${currentShape.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:3001/api/bangun-datar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // Refresh shapes and reset form
      fetchShapes();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving shape:", error);
      setError("Gagal menyimpan shape. Silakan coba lagi.");
    }
  };

  const confirmDelete = async () => {
    if (!currentShape) return;

    try {
      await axios.delete(
        `http://localhost:3001/api/bangun-datar/${currentShape.id}`
      );
      fetchShapes();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting shape:", error);
      setError("Gagal menghapus shape. Silakan coba lagi.");
    }
  };

  // Color mapping for Tailwind classes
  const colorMap = {
    red: { border: "border-red-500", bg: "bg-red-100", text: "text-red-800" },
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-100",
      text: "text-green-800",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-100",
      text: "text-purple-800",
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen text-black overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">
            Shape Management System
          </h1>
          <p className="text-gray-600">
            Manage geometric shapes, their properties and formulas
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Actions
            </h2>
            <button
              onClick={handleCreateClick}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg mb-3 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create New
              Shape
            </button>
            <div className="mb-4">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Shapes
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute right-3 top-3 text-gray-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="filterShape"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Shape
              </label>
              <select
                id="filterShape"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={filterShape}
                onChange={(e) => setFilterShape(e.target.value)}
              >
                <option value="">All Shapes</option>
                <option value="circle">Circle</option>
                <option value="square">Square</option>
                <option value="rectangle">Rectangle</option>
                <option value="triangle">Triangle</option>
                <option value="pentagon">Pentagon</option>
                <option value="hexagon">Hexagon</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="filterColor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Color
              </label>
              <select
                id="filterColor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={filterColor}
                onChange={(e) => setFilterColor(e.target.value)}
              >
                <option value="">All Colors</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
              </select>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Create/Edit Form */}
            {showForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {isEditing ? "Edit Shape" : "Create New Shape"}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="hidden"
                    name="id"
                    value={currentShape?.id || ""}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="shape"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Shape Type *
                      </label>
                      <select
                        id="shape"
                        name="shape"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        defaultValue={currentShape?.shape || ""}
                      >
                        <option value="">Select a shape</option>
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="triangle">Triangle</option>
                        <option value="pentagon">Pentagon</option>
                        <option value="hexagon">Hexagon</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Shape title"
                        defaultValue={currentShape?.title || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="color"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Color *
                      </label>
                      <select
                        id="color"
                        name="color"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        defaultValue={currentShape?.color || ""}
                      >
                        <option value="">Select a color</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="purple">Purple</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="formulaArea"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Area Formula *
                      </label>
                      <input
                        type="text"
                        id="formulaArea"
                        name="formulaArea"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., πr²"
                        defaultValue={currentShape?.formulaArea || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label
                        htmlFor="formulaPerimeter"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Perimeter Formula *
                      </label>
                      <input
                        type="text"
                        id="formulaPerimeter"
                        name="formulaPerimeter"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., 2πr"
                        defaultValue={currentShape?.formulaPerimeter || ""}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content File {!isEditing && "*"}
                      </label>
                      <label
                        htmlFor="content"
                        className="file-input-label"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add("dragover");
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("dragover");
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("dragover");
                          if (e.dataTransfer.files[0]) {
                            const file = e.dataTransfer.files[0];
                            if (file.type.startsWith("image/")) {
                              const event = {
                                target: {
                                  files: e.dataTransfer.files,
                                },
                              } as unknown as React.ChangeEvent<HTMLInputElement>;
                              handleFileUpload(event, "content");
                            }
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faFileImage}
                          className="text-4xl text-indigo-500 mb-2"
                        />
                        <span className="text-gray-700">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-sm text-gray-500">
                          PNG, JPG, GIF up to 1MB
                        </span>
                        <input
                          type="file"
                          id="content"
                          name="content"
                          accept="image/*"
                          className="hidden"
                          ref={contentInputRef}
                          onChange={(e) => handleFileUpload(e, "content")}
                          required={!isEditing}
                        />
                      </label>
                      {contentPreview && (
                        <div className="preview-container mt-4">
                          <div
                            className="remove-file"
                            onClick={() => removeFile("content")}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </div>
                          <img
                            src={contentPreview}
                            alt="Content preview"
                            className="max-h-40"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Audio File {!isEditing && "*"}
                      </label>
                      <label
                        htmlFor="audio"
                        className="file-input-label"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add("dragover");
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("dragover");
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("dragover");
                          if (e.dataTransfer.files[0]) {
                            const file = e.dataTransfer.files[0];
                            if (file.type.startsWith("audio/")) {
                              const event = {
                                target: {
                                  files: e.dataTransfer.files,
                                },
                              } as unknown as React.ChangeEvent<HTMLInputElement>;
                              handleFileUpload(event, "audio");
                            }
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faFileAudio}
                          className="text-4xl text-indigo-500 mb-2"
                        />
                        <span className="text-gray-700">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-sm text-gray-500">
                          MP3, WAV up to 1MB
                        </span>
                        <input
                          type="file"
                          id="audio"
                          name="audio"
                          accept="audio/*"
                          className="hidden"
                          ref={audioInputRef}
                          onChange={(e) => handleFileUpload(e, "audio")}
                          required={!isEditing}
                        />
                      </label>
                      {audioPreview && (
                        <div className="preview-container mt-4">
                          <div
                            className="remove-file"
                            onClick={() => removeFile("audio")}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </div>
                          <audio controls className="w-full" src={audioPreview}>
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      {isEditing ? "Update Shape" : "Create Shape"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Shapes List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  All Shapes
                </h2>
                <div className="text-sm text-gray-600">
                  {filteredShapes.length} shapes found
                </div>
              </div>

              {loading ? (
                <div className="text-center py-10">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-2xl text-indigo-600"
                  />
                  <p className="mt-2 text-gray-600">Loading shapes...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredShapes.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 col-span-2">
                      <FontAwesomeIcon
                        icon={faShapes}
                        className="text-4xl mb-3"
                      />
                      <p>
                        No shapes found. Click "Create New Shape" to add one.
                      </p>
                    </div>
                  ) : (
                    filteredShapes.map((shape) => {
                      const colorClass =
                        colorMap[shape.color as keyof typeof colorMap] ||
                        colorMap.blue;

                      return (
                        <div
                          key={shape.id}
                          className={`shape-card bg-white rounded-lg shadow p-4 border-l-4 ${colorClass.border}`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800">
                                {shape.title}
                              </h3>
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${colorClass.bg} ${colorClass.text} capitalize`}
                              >
                                {shape.shape}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(shape)}
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(shape)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                            <div>
                              <span className="text-gray-500">Area:</span>
                              <p className="font-mono">{shape.formulaArea}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Perimeter:</span>
                              <p className="font-mono">
                                {shape.formulaPerimeter}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div>
                              {shape.content && (
                                <a
                                  href={shape.content}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800 mr-3"
                                >
                                  <FontAwesomeIcon
                                    icon={faImage}
                                    className="mr-1"
                                  />{" "}
                                  View Content
                                </a>
                              )}
                              {shape.audio && (
                                <a
                                  href={shape.audio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800"
                                >
                                  <FontAwesomeIcon
                                    icon={faVolumeUp}
                                    className="mr-1"
                                  />{" "}
                                  Play Audio
                                </a>
                              )}
                            </div>
                            <span className="text-xs">ID: {shape.id}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Pagination */}
              {filteredShapes.length > 0 && (
                <div className="mt-6 flex justify-center items-center space-x-2">
                  <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <span className="text-sm text-gray-700">Page 1 of 1</span>
                  <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Deletion
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the shape "{currentShape?.title}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapeManagementSystem;
