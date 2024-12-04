import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CustomerForm } from "./components/CustomerForm";
import { CountertopCanvas } from "./components/CountertopCanvas";
import { StoneSelection } from "./components/StoneSelection";
import { InteractiveElements } from "./components/InteractiveElements";
import { Quotes } from "./components/Quotes";
import { ControlPanel } from "./components/ControlPanel";
import { SideMenu } from "./components/SideMenu"; // SideMenu yalnızca burada import edilmeli
import { useHistory } from "./hooks/useHistory";
import { useDrag } from "./hooks/useDrag";
import { saveQuote } from "./services/firebase"; // saveQuote fonksiyonunu içe aktarın

export default function App() {
    const [step, setStep] = useState(0); // 0 = Stone Selection, 1 = Drawing
    const [selectedStone, setSelectedStone] = useState(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const handleNextStep = (stoneType, stoneDimensions) => {
        setSelectedStone(stoneType);
        setDimensions(stoneDimensions);
        setStep(1);
    };
    
    const [elements, setElements] = useState([]);

    const handleAddElement = (type) => {
        const newElement = { type, name: "" };
        setElements([...elements, newElement]);
    };

    const handleUpdateElement = (index, updates) => {
        setElements((prev) =>
            prev.map((el, i) => (i === index ? { ...el, ...updates } : el))
        );
    };
    
  const [darkMode, setDarkMode] = useState(false);
  const [date, setDate] = useState(new Date());
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    width: 24,
    height: 24,
    depth: 1.5,
  });

  const [countertops, setCountertops] = useState([
    {
      id: 1,
      width: 24,
      height: 24,
      x: 20,
      y: 20,
      color: "#e0e0e0",
      pattern: "marble",
      rotation: 0,
      borderRadius: 0,
      depth: 1.5,
      edgeThickness: 1.5,
    },
  ]);

  const [selectedIds, setSelectedIds] = useState([1]);
  const [activeId, setActiveId] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const history = useHistory(countertops);
  const { isDragging, startDrag, onDrag, stopDrag } = useDrag(zoom, snapToGrid);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer); // Hata düzeltildi
}, []);

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };
  const handleMouseDown = (e, id) => {
    startDrag(e, id);
    if (e.shiftKey) {
        setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    } else {
        setSelectedIds([id]);
    }
    setActiveId(id);
};

const handleMouseMove = (e) => {
    const delta = onDrag(e);
    if (delta) {
        setCountertops((prev) =>
            prev.map((c) =>
                selectedIds.includes(c.id) ? { ...c, x: c.x + delta.x, y: c.y + delta.y } : c
            )
        );
    }
};

const handleMouseUp = () => {
    if (isDragging) {
        stopDrag();
        history.push(countertops);
    }
};

const handleUpdateCountertop = (id, field, value) => {
    setCountertops((prev) =>
        prev.map((ct) =>
            ct.id === id
                ? {
                    ...ct,
                    [field]: typeof value === "object" ? { ...ct[field], ...value } : value,
                }
                : ct
        )
    );
};

  const calculatePrice = () => {
    const area = customerInfo.width * customerInfo.height;
    const depthFactor = customerInfo.depth || 1;
    const basePrice = 50; // Base price per square unit
    return area * depthFactor * basePrice;
  };

  const handleSaveQuote = async () => {
    const quote = {
      id: new Date().toISOString(),
      customerInfo,
      countertops,
      estimatedPrice: calculatePrice(),
      date: date.toISOString(),
    };

    try {
      await saveQuote(quote);
      alert("Quote saved successfully!");
    } catch (error) {
      console.error("Error saving quote:", error);
      alert("Failed to save quote.");
    }
  };

  
        return (
            step === 0 ? (
                <StoneSelection onNext={handleNextStep} />
            ) : (
        
    <div className={darkMode ? "dark" : ""}>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <button
          className="p-2 bg-blue-500 text-white rounded-md m-4"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>

        <Header
          date={date}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          snapToGrid={snapToGrid}
          setSnapToGrid={setSnapToGrid}
          canUndo={history.canUndo}
          canRedo={history.canRedo}
          onUndo={() => setCountertops(history.undo())}
          onRedo={() => setCountertops(history.redo())}
        />

        <CustomerForm
          customerInfo={customerInfo}
          onChange={handleCustomerInfoChange}
        />

        <div className="flex flex-1">
        <CountertopCanvas
    countertops={countertops}
    setCountertops={setCountertops} // setCountertops burada props olarak ekleniyor
    selectedIds={selectedIds}
    zoom={zoom}
    showGrid={showGrid}
    isDragging={isDragging}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
    onUpdateCountertop={handleUpdateCountertop}
/>
          <SideMenu />
        </div>
        )

        <div className="p-4 bg-green-100 rounded-md m-4">
          <h3 className="text-lg font-semibold">
            Estimated Price: ${calculatePrice().toFixed(2)}
          </h3>
          <button
            className="p-2 bg-green-500 text-white rounded-md m-4"
            onClick={handleSaveQuote}
          >
            Save Quote
          </button>
        </div>
        )
      </div>
        )
    </div>
        )
  );
}
