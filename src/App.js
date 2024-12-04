import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Header } from "./components/Header";
import { CustomerForm } from "./components/CustomerForm";
import { CountertopCanvas } from "./components/CountertopCanvas";
import { StoneSelection } from "./components/StoneSelection";
import { InteractiveElements } from "./components/InteractiveElements";
import { Quotes } from "./components/Quotes";
import { ControlPanel } from "./components/ControlPanel";
import { SideMenu } from "./components/SideMenu";
import { useDrag } from "./hooks/useDrag";
import { saveQuote } from "./services/firebase";
import {
    updateCountertop,
    setSelectedIds,
    setActiveId,
    setZoom,
    updateCustomerInfo,
    undo,
    redo,
    saveToHistory
} from './store/slices/counterTopSlice';

export default function App() {
    const dispatch = useDispatch();
    const {
        countertops,
        selectedIds,
        activeId,
        zoom,
        showGrid,
        snapToGrid,
        customerInfo
    } = useSelector(state => state.counterTop);

    const [step, setStep] = useState(0);
    const [selectedStone, setSelectedStone] = useState(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [darkMode, setDarkMode] = useState(false);
    const [date, setDate] = useState(new Date());
    const [elements, setElements] = useState([]);

    const { isDragging, startDrag, onDrag, stopDrag } = useDrag(zoom, snapToGrid);

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleNextStep = (stoneType, stoneDimensions) => {
        setSelectedStone(stoneType);
        setDimensions(stoneDimensions);
        setStep(1);
    };

    const handleAddElement = (type) => {
        const newElement = { type, name: "" };
        setElements([...elements, newElement]);
    };

    const handleUpdateElement = (index, updates) => {
        setElements((prev) =>
            prev.map((el, i) => (i === index ? { ...el, ...updates } : el))
        );
    };

    const handleCustomerInfoChange = (field, value) => {
        dispatch(updateCustomerInfo({ [field]: value }));
    };

    const handleMouseDown = (e, id) => {
        startDrag(e, id);
        if (e.shiftKey) {
            dispatch(setSelectedIds(selectedIds.includes(id) ? selectedIds : [...selectedIds, id]));
        } else {
            dispatch(setSelectedIds([id]));
        }
        dispatch(setActiveId(id));
    };

    const handleMouseMove = (e) => {
        const delta = onDrag(e);
        if (delta) {
            selectedIds.forEach(id => {
                const countertop = countertops.find(c => c.id === id);
                if (countertop) {
                    dispatch(updateCountertop({
                        id,
                        updates: {
                            x: countertop.x + delta.x,
                            y: countertop.y + delta.y
                        }
                    }));
                }
            });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            stopDrag();
            dispatch(saveToHistory());
        }
    };

    const handleUpdateCountertop = (id, field, value) => {
        dispatch(updateCountertop({
            id,
            updates: {
                [field]: typeof value === "object" ? { ...value } : value
            }
        }));
        dispatch(saveToHistory());
    };

    const calculatePrice = () => {
        const area = customerInfo.width * customerInfo.height;
        const depthFactor = customerInfo.depth || 1;
        const basePrice = 50;
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
                        canUndo={true}
                        canRedo={true}
                        onUndo={() => dispatch(undo())}
                        onRedo={() => dispatch(redo())}
                    />

                    <CustomerForm
                        customerInfo={customerInfo}
                        onChange={handleCustomerInfoChange}
                    />

                    <div className="flex flex-1">
                        <CountertopCanvas
                            countertops={countertops}
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
                </div>
            </div>
        )
    );
}
