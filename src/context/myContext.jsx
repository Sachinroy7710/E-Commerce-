import React, { createContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [getAllOrder, setGetAllOrder] = useState([]);

    const fetchOrders = async (userId) => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, 'order'), where('userid', '==', userId));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGetAllOrder(ordersData);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MyContext.Provider value={{ loading, getAllOrder, fetchOrders }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
