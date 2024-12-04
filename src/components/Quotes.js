
import React, { useState, useEffect } from "react";
import { saveQuote, fetchQuotes, deleteQuote, updateQuote } from "../services/firebase";

export const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [newQuote, setNewQuote] = useState({ name: "", email: "", price: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [currentQuoteId, setCurrentQuoteId] = useState(null);

    useEffect(() => {
        const loadQuotes = async () => {
            const fetchedQuotes = await fetchQuotes();
            setQuotes(fetchedQuotes);
        };
        loadQuotes();
    }, []);

    const handleAddQuote = async () => {
        const quote = { ...newQuote, id: Date.now().toString() };
        await saveQuote(quote);
        setQuotes([...quotes, quote]);
        setNewQuote({ name: "", email: "", price: 0 });
    };

    const handleDeleteQuote = async (id) => {
        await deleteQuote(id);
        setQuotes(quotes.filter((quote) => quote.id !== id));
    };

    const handleEditQuote = (quote) => {
        setNewQuote(quote);
        setIsEditing(true);
        setCurrentQuoteId(quote.id);
    };

    const handleUpdateQuote = async () => {
        await updateQuote(currentQuoteId, newQuote);
        setQuotes(
            quotes.map((quote) =>
                quote.id === currentQuoteId ? { ...quote, ...newQuote } : quote
            )
        );
        setNewQuote({ name: "", email: "", price: 0 });
        setIsEditing(false);
        setCurrentQuoteId(null);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quotes</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newQuote.name}
                    onChange={(e) => setNewQuote({ ...newQuote, name: e.target.value })}
                    className="p-2 border rounded w-full mb-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newQuote.email}
                    onChange={(e) => setNewQuote({ ...newQuote, email: e.target.value })}
                    className="p-2 border rounded w-full mb-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newQuote.price}
                    onChange={(e) => setNewQuote({ ...newQuote, price: e.target.value })}
                    className="p-2 border rounded w-full mb-2"
                />
                {isEditing ? (
                    <button
                        onClick={handleUpdateQuote}
                        className="p-2 bg-blue-500 text-white rounded"
                    >
                        Update Quote
                    </button>
                ) : (
                    <button
                        onClick={handleAddQuote}
                        className="p-2 bg-green-500 text-white rounded"
                    >
                        Add Quote
                    </button>
                )}
            </div>

            <ul>
                {quotes.map((quote) => (
                    <li key={quote.id} className="p-2 bg-white rounded shadow mb-2 flex justify-between">
                        <div>
                            <p><strong>Name:</strong> {quote.name}</p>
                            <p><strong>Email:</strong> {quote.email}</p>
                            <p><strong>Price:</strong> ${quote.price}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEditQuote(quote)}
                                className="p-2 bg-yellow-500 text-white rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteQuote(quote.id)}
                                className="p-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
