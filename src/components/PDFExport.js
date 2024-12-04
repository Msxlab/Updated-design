
// components/PDFExport.js
import React from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import { calculatePrice } from '../utils/priceCalculator';

export const PDFExport = () => {
    const { countertops, customerInfo } = useSelector(state => state.counterTop);

    const generatePDF = async () => {
        const doc = new jsPDF();
        let yPos = 20;

        // Logo ve başlık
        doc.setFontSize(20);
        doc.text('Countertop Quote', 105, yPos, { align: 'center' });
        
        // Tarih
        doc.setFontSize(10);
        yPos += 10;
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos);

        // Müşteri bilgileri
        yPos += 20;
        doc.setFontSize(14);
        doc.text('Customer Information', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(12);
        doc.text(`Name: ${customerInfo.name}`, 20, yPos);
        yPos += 8;
        doc.text(`Address: ${customerInfo.address}`, 20, yPos);
        yPos += 8;
        doc.text(`Phone: ${customerInfo.phone}`, 20, yPos);
        yPos += 8;
        doc.text(`Email: ${customerInfo.email}`, 20, yPos);

        // Seçilen malzemeler ve özellikler
        yPos += 20;
        doc.setFontSize(14);
        doc.text('Selected Materials & Features', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(12);
        doc.text(`Stone Type: ${customerInfo.stone}`, 20, yPos);
        yPos += 8;
        doc.text(`Surface: ${customerInfo.surface}`, 20, yPos);
        yPos += 8;
        doc.text(`Edge Profile: ${customerInfo.edgeProfile}`, 20, yPos);

        // Tezgah detayları
        yPos += 20;
        doc.setFontSize(14);
        doc.text('Countertop Details', 20, yPos);

        countertops.forEach((countertop, index) => {
            yPos += 15;
            doc.setFontSize(12);
            doc.text(`Piece ${index + 1}:`, 20, yPos);
            yPos += 8;
            doc.text(`Dimensions: ${countertop.width}" × ${countertop.height}" × ${countertop.depth}"`, 30, yPos);
            yPos += 8;
            doc.text(`Area: ${((countertop.width * countertop.height) / 144).toFixed(2)} sq ft`, 30, yPos);
        });

        // Fiyatlandırma
        yPos += 25;
        doc.setFontSize(14);
        doc.text('Pricing Details', 20, yPos);

        let totalPrice = 0;
        countertops.forEach(countertop => {
            totalPrice += calculatePrice(countertop);
        });

        yPos += 10;
        doc.setFontSize(12);
        doc.text(`Subtotal: $${totalPrice.toFixed(2)}`, 20, yPos);
        yPos += 8;
        const tax = totalPrice * 0.08; // %8 vergi
        doc.text(`Tax (8%): $${tax.toFixed(2)}`, 20, yPos);
        yPos += 8;
        doc.text(`Total: $${(totalPrice + tax).toFixed(2)}`, 20, yPos);

        // Notlar ve şartlar
        yPos += 25;
        doc.setFontSize(10);
        doc.text('Notes:', 20, yPos);
        yPos += 8;
        doc.text('1. This quote is valid for 30 days from the date of issue.', 20, yPos);
        yPos += 6;
        doc.text('2. 50% deposit required to begin production.', 20, yPos);
        yPos += 6;
        doc.text('3. Final measurements will be taken before fabrication.', 20, yPos);
        yPos += 6;
        doc.text('4. Installation typically occurs 2-3 weeks after template.', 20, yPos);

        // 2D çizim ekle
        if (countertops.length > 0) {
            doc.addPage();
            await addDrawingToPDF(doc);
        }

        // PDF'i indir
        doc.save(`countertop-quote-${customerInfo.name.replace(/\s+/g, '-')}.pdf`);
    };

    const addDrawingToPDF = async (doc) => {
        return new Promise((resolve) => {
            const canvas = document.querySelector('canvas');
            if (canvas) {
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                doc.text('Countertop Layout', 105, 20, { align: 'center' });
                doc.addImage(imgData, 'JPEG', 20, 30, 170, 170);
            }
            resolve();
        });
    };

    return (
        <div className="mt-4">
            <button
                onClick={generatePDF}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                         transition-colors flex items-center justify-center gap-2"
            >
                <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                    />
                </svg>
                Export Quote PDF
            </button>
        </div>
    );
};
