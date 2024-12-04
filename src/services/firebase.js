
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD7ejDO1FpAj0RQFngXGXcNgI10Eyi5xR8",
    authDomain: "countertop-design.firebaseapp.com",
    projectId: "countertop-design",
    storageBucket: "countertop-design.firebasestorage.app",
    messagingSenderId: "93945981202",
    appId: "1:93945981202:web:5c9db34a27f973fe4dabcb",
    measurementId: "G-J0ZDR5VDVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save a quote to the Firestore database
export const saveQuote = async (quote) => {
    try {
        await setDoc(doc(db, "quotes", quote.id), quote);
        console.log("Quote saved successfully!");
    } catch (error) {
        console.error("Error saving quote:", error);
    }
};

// Fetch all quotes from the Firestore database
export const fetchQuotes = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "quotes"));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return [];
    }
};

// Delete a quote from the Firestore database
export const deleteQuote = async (quoteId) => {
    try {
        await deleteDoc(doc(db, "quotes", quoteId));
        console.log("Quote deleted successfully!");
    } catch (error) {
        console.error("Error deleting quote:", error);
    }
};

// Update a quote in the Firestore database
export const updateQuote = async (quoteId, updatedData) => {
    try {
        await updateDoc(doc(db, "quotes", quoteId), updatedData);
        console.log("Quote updated successfully!");
    } catch (error) {
        console.error("Error updating quote:", error);
    }
};
