import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCountertop, setSelectedIds } from '../store/slices/counterTopSlice';

export const CountertopCanvas = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const {
        countertops,
        selectedIds,
        zoom,
        showGrid,
        isDragging
    } = useSelector(state => state.counterTop);

    // Canvas setup ve grid çizimi
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const scale = window.devicePixelRatio;
        
        // Canvas boyutlarını ayarla
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        ctx.scale(scale, scale);
        
        // Canvas'ı temizle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Grid çizimi
        if (showGrid) {
            drawGrid(ctx, canvas.width, canvas.height);
        }
        
        // Tezgahları çiz
        drawCountertops(ctx);
        
    }, [countertops, selectedIds, zoom, showGrid]);

    const drawGrid = (ctx, width, height) => {
        ctx.beginPath();
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 0.5;

        // Yatay çizgiler
        for (let i = 0; i < height; i += 20 * zoom) {
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
        }

        // Dikey çizgiler
        for (let i = 0; i < width; i += 20 * zoom) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
        }

        ctx.stroke();
    };

    const drawCountertops = (ctx) => {
        countertops.forEach(countertop => {
            ctx.save();
            
            // Tezgah pozisyonuna git
            ctx.translate(countertop.x, countertop.y);
            ctx.rotate((countertop.rotation || 0) * Math.PI / 180);
            
            // Tezgah çizimi
            ctx.beginPath();
            ctx.fillStyle = selectedIds.includes(countertop.id) ? '#b3e0ff' : '#e0e0e0';
            ctx.strokeStyle = '#666';
            ctx.lineWidth = 2;
            
            // Köşeleri yuvarlatılmış dikdörtgen
            const radius = countertop.borderRadius || 0;
            ctx.roundRect(
                -countertop.width * zoom / 2,
                -countertop.height * zoom / 2,
                countertop.width * zoom,
                countertop.height * zoom,
                radius
            );
            
            ctx.fill();
            ctx.stroke();

            // Tezgah deseni
            if (countertop.pattern === 'marble') {
                drawMarblePattern(ctx, countertop);
            }

            // Kenar kalınlığı
            if (countertop.edgeThickness) {
                drawEdgeThickness(ctx, countertop);
            }

            ctx.restore();
        });
    };

    const drawMarblePattern = (ctx, countertop) => {
        // Mermer deseni için rastgele damarlar
        ctx.save();
        ctx.globalAlpha = 0.1;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(
                -countertop.width * zoom / 2,
                (Math.random() - 0.5) * countertop.height * zoom
            );
            ctx.bezierCurveTo(
                0, (Math.random() - 0.5) * countertop.height * zoom,
                0, (Math.random() - 0.5) * countertop.height * zoom,
                countertop.width * zoom / 2, (Math.random() - 0.5) * countertop.height * zoom
            );
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = Math.random() * 2 + 1;
            ctx.stroke();
        }
        ctx.restore();
    };
// components/CountertopCanvas.js içinde güncellenecek kısım
const drawMeasurements = (ctx) => {
    measurements.forEach(measurement => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#2563eb'; // Blue
        ctx.lineWidth = 2;

        // Ana ölçüm çizgisi
        ctx.moveTo(measurement.start.x, measurement.start.y);
        ctx.lineTo(measurement.end.x, measurement.end.y);
        ctx.stroke();

        // Ölçüm değeri
        ctx.font = '12px Arial';
        ctx.fillStyle = '#2563eb';
        const midX = (measurement.start.x + measurement.end.x) / 2;
        const midY = (measurement.start.y + measurement.end.y) / 2;

        if (measurement.type === 'dimension') {
            ctx.fillText(
                `${measurement.value.distance.toFixed(1)}"`,
                midX + 5,
                midY - 5
            );
        } else if (measurement.type === 'angle') {
            ctx.fillText(
                `${measurement.value.angle.toFixed(1)}°`,
                midX + 5,
                midY - 5
            );

            // Açı göstergesi çiz
            const radius = 20;
            ctx.beginPath();
            ctx.arc(
                measurement.start.x,
                measurement.start.y,
                radius,
                0,
                measurement.value.angle * Math.PI / 180
            );
            ctx.stroke();
        }

        ctx.restore();
    });
};

    const drawEdgeThickness = (ctx, countertop) => {
        const thickness = countertop.edgeThickness * zoom;
        ctx.save();
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        
        // Alt kenar kalınlığı
        ctx.beginPath();
        ctx.moveTo(-countertop.width * zoom / 2, countertop.height * zoom / 2);
        ctx.lineTo(-countertop.width * zoom / 2, countertop.height * zoom / 2 + thickness);
        ctx.lineTo(countertop.width * zoom / 2, countertop.height * zoom / 2 + thickness);
        ctx.lineTo(countertop.width * zoom / 2, countertop.height * zoom / 2);
        ctx.stroke();
        
        ctx.restore();
    };

    // Mouse event handlers
    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Tıklanan tezgahı bul
        const clickedCountertop = findClickedCountertop(x, y);
        
        if (clickedCountertop) {
            if (e.shiftKey) {
                dispatch(setSelectedIds([...selectedIds, clickedCountertop.id]));
            } else {
                dispatch(setSelectedIds([clickedCountertop.id]));
            }
        } else {
            dispatch(setSelectedIds([]));
        }
    };

    const findClickedCountertop = (x, y) => {
        // Tezgahları tersten kontrol et (üsttekinden başla)
        return [...countertops].reverse().find(countertop => {
            const dx = x - countertop.x;
            const dy = y - countertop.y;
            
            // Rotasyonu hesaba kat
            const rotatedX = dx * Math.cos(-countertop.rotation * Math.PI / 180) 
                         - dy * Math.sin(-countertop.rotation * Math.PI / 180);
            const rotatedY = dx * Math.sin(-countertop.rotation * Math.PI / 180) 
                         + dy * Math.cos(-countertop.rotation * Math.PI / 180);
            
            return Math.abs(rotatedX) < countertop.width * zoom / 2 
                && Math.abs(rotatedY) < countertop.height * zoom / 2;
        });
    };

    return (
        <div className="flex-1 relative overflow-hidden bg-white">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            />
        </div>
    );
};
