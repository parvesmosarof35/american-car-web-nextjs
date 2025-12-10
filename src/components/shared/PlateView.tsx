import React, { useEffect, useRef, useState } from "react";
// Mobile defaults for plate size and position
const MOBILE_DEFAULT = { width: 82, height: 17, x: 120, y: 136 };
import { Rnd } from "react-rnd";
import { toPng } from "html-to-image";
import { HiOutlineUpload } from "react-icons/hi"; // ✅ Upload Icon

export default function PlateView() {
  // Car images config with default positions
  const initialCars = [
    {
      id: 1,
      type: "rear",
      src: "/PlateViewmainCar.png",
      defaultPos: { x: 409, y: 295, width: 168, height: 37 },
    },
    {
      id: 2,
      type: "front",
      src: "/car (2).png",
      defaultPos: { x: 384, y: 392, width: 239, height: 59 },
    },
    {
      id: 3,
      type: "rear",
      src: "/car (3).png",
      defaultPos: { x: 360, y: 248, width: 225, height: 48 },
    },
    {
      id: 4,
      type: "rear",
      src: "/car (4).png",
      defaultPos: { x: 338, y: 345, width: 285, height: 58 },
    },
    {
      id: 5,
      type: "rear",
      src: "/car (5).png",
      defaultPos: { x: 376, y: 318, width: 210, height: 47 },
    },
    {
      id: 6,
      type: "front",
      src: "/car (6).png",
      defaultPos: { x: 360, y: 450, width: 235, height: 50 },
    },
  ];

  const [carImages, setCarImages] = useState(initialCars);
  const [selectedCar, setSelectedCar] = useState(initialCars[0]); // default car
  const [brightness, setBrightness] = useState(95);
  const [platePosition, setPlatePosition] = useState(initialCars[0].defaultPos);
  const [plateText, setPlateText] = useState("P1J00V"); // Plate number state

  const previewRef = useRef(null);

  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth < 640;

  // Apply mobile defaults on mount/when car changes
  useEffect(() => {
    if (isMobile()) {
      setPlatePosition((p) => ({ ...p, ...MOBILE_DEFAULT }));
    }
  }, [selectedCar]);

  // Reset plate
  const handleResetPlate = () => {
    setPlatePosition(isMobile() ? MOBILE_DEFAULT : selectedCar.defaultPos);
    setBrightness(95);
    setPlateText("P1J00V");
  };

  // Download preview
  const handleDownloadImage = async () => {
    if (previewRef.current) {
      const dataUrl = await toPng(previewRef.current);
      const link = document.createElement("a");
      link.download = "plate-preview.png";
      link.href = dataUrl;
      link.click();
    }
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setPlatePosition(isMobile() ? MOBILE_DEFAULT : car.defaultPos); // reset plate position
  };

  // Select a different car
  // Select view type manually
  const handleSelectView = (viewType) => {
    if (selectedCar) {
      // ✅ if current car is uploaded, just change its type dynamically
      setSelectedCar((prev) => ({ ...prev, type: viewType }));
    } else {
      // fallback: find another car in gallery
      const found = carImages.find((c) => c.type === viewType);
      if (found) handleSelectCar(found);
    }
  };

  // Add random/uploaded car image
  const handleAddCarImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newCar = {
      id: Date.now(),
      type: "rear", // default type
      src: URL.createObjectURL(file),
      defaultPos: isMobile()
        ? { ...MOBILE_DEFAULT }
        : { x: 400, y: 250, width: 180, height: 50 },
    };

    setCarImages((prev) => [...prev, newCar]);
    setSelectedCar(newCar);
    setPlatePosition(newCar.defaultPos);
  };

  return (
    <div className="container mx-auto px-5 py-10 font-manrope">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-6xl font-medium text-gray-900 my-6">
          Plate View
        </h1>
        <p className="text-gray-900">
          Preview your customised number plate before listing it for sale & buy
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-8">
     
        {/* Main Preview */}
        <div className="lg:col-span-2">
          <div
            ref={previewRef}
            className="relative bg-white overflow-hidden shadow-sm mb-2
               w-full max-w-[320px] sm:max-w-[980px] mx-auto rounded-2xl
               aspect-[4/3] lg:aspect-[980/520] lg:w-[980px] lg:h-[520px] z-10"
          >
            {/* Car Image */}
            <img
              src={selectedCar.src}
              alt="Car with number plate preview"
              className="w-full h-full object-cover"
            />

            {/* Plate Overlay */}
            <Rnd
              bounds="parent"
              size={{
                width: platePosition.width,
                height: platePosition.height,
              }}
              position={{ x: platePosition.x, y: platePosition.y }}
              onDragStop={(e, d) =>
                setPlatePosition((p) => ({ ...p, x: d.x, y: d.y }))
              }
              onResizeStop={(e, dir, ref, delta, pos) =>
                setPlatePosition({
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  x: pos.x,
                  y: pos.y,
                })
              }
            >
              <div
                className="flex items-center justify-center w-full h-full rounded shadow-md"
                style={{
                  backgroundColor:
                    selectedCar.type === "rear" ? "#fad549" : "#ffffff",
                  filter: `brightness(${brightness}%)`,
                }}
              >
                <span className="text-black font-mycustom whitespace-nowrap overflow-hidden text-ellipsis text-md leading-[1] tracking-[0] font-medium sm:text-[44.21px] sm:font-medium block text-center">
                  {plateText}
                </span>
              </div>
            </Rnd>
          </div>

          <h1 className="text-center text-md mb-auto">
            Drag the Plate to place it in the right position
          </h1>
        </div>

        {/* Controls */}
        <div className="space-y-6 bg-white p-2 rounded-2xl z-30">
          {/* Plate Preview Mini */}
          <div
            className="px-6 py-2 rounded shadow text-center"
            style={{
              backgroundColor:
                selectedCar.type === "rear" ? "#fad549" : "#ffffff",
              filter: `brightness(${brightness}%)`,
            }}
          >
            <span className="text-black font-mycustom whitespace-nowrap overflow-hidden text-ellipsis text-[35px] leading-[1] tracking-[0] font-medium sm:text-[44.21px] sm:font-medium block text-center">
              {plateText}
            </span>
          </div>

          {/* Plate Text Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Plate Number
            </label>
            <input
              type="text"
              value={plateText}
              onChange={(e) => setPlateText(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border rounded-lg text-2xl text-center font-bold tracking-widest"
              maxLength={10}
            />
          </div>

          {/* Rear / Front buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleSelectView("rear")}
              className={`flex-1 px-4 py-2 rounded-full font-semibold text-2xl cursor-pointer  ${
                selectedCar.type === "rear"
                  ? "bg-yellow-400 text-black"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Rear
            </button>
            <button
              onClick={() => handleSelectView("front")}
              className={`flex-1 px-4 py-2 rounded-full font-semibold text-2xl cursor-pointer ${
                selectedCar.type === "front"
                  ? "bg-yellow-400 text-black"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Front
            </button>
          </div>

          {/* Brightness */}
          <div className="space-y-2">
            <label className="text-xl text-gray-700 font-medium">
              Brightness for plate
            </label>
            <input
              type="range"
              min="50"
              max="150"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="
      w-full h-2 
      bg-gray-200 rounded-lg appearance-none cursor-pointer 
      accent-green-500
    "
            />
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleResetPlate}
              className="w-full font-bold text-3xl bg-yellow-400 hover:bg-yellow-500 py-3 px-4 rounded-md"
            >
              Reset Plate
            </button>
            <button
              onClick={handleDownloadImage}
              className="w-full font-bold text-3xl bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md"
            >
              Download Image
            </button>
          </div>

          {/* Upload Car Image */}
          <div className="text-center mt-6">
            <label
              htmlFor="carUpload"
              className="inline-flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-400 hover:border-green-400 rounded-lg cursor-pointer hover:bg-green-50"
            >
              <HiOutlineUpload className="text-4xl text-gray-600 mb-2" />
              <span className="text-gray-700 font-medium">
                Upload Car Image
              </span>
              <input
                id="carUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAddCarImage}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Car Gallery Grid */}

      {/* Car Gallery Grid */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">All Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {carImages.map((car) => (
            <div
              key={car.id}
              className={`aspect-[4/3] border rounded-lg flex items-center justify-center cursor-pointer overflow-hidden ${
                selectedCar.id === car.id
                  ? "border-yellow-500 border-4"
                  : "border-gray-300"
              }`}
              onClick={() => handleSelectCar(car)}
            >
              <img
                src={car.src}
                alt={`Car ${car.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
