
// utils/priceCalculator.js
export const calculatePrice = (countertop) => {
    // Temel alan hesaplaması
    const area = (countertop.width * countertop.height) / 144; // square feet cinsinden
    const perimeter = 2 * (countertop.width + countertop.height) / 12; // linear feet cinsinden
    
    // Temel fiyat
    let price = area * (countertop.basePrice || 50); // Varsayılan $50/sq ft
    
    // Finish çarpanı
    if (countertop.priceMultiplier) {
        price *= countertop.priceMultiplier;
    }
    
    // Kenar profili ek ücreti
    if (countertop.edgePriceAdd) {
        price += perimeter * countertop.edgePriceAdd;
    }
    
    // Derinlik faktörü
    const depthFactor = countertop.depth > 1.5 ? (countertop.depth / 1.5) : 1;
    price *= depthFactor;
    
    return price;
};
