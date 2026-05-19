import axios from "axios";
import { useState, useEffect } from "react";
import { Children, createContext, useContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const url = 'https://fake-store-api.mock.beeceptor.com/api/products?limit=150'
    //const url = 'https://fakestoreapi.com/products?limit=150'

    // fatching all products from api

    const fetchAllProducts = async () => {
        try {
            const res = await axios.get(url);
            //console.log(res);
            //const productsData = res.data.products
            const productsData = res.data;
            //console.log(productsData);
            setData(productsData)

        } catch (error) {
            console.log(error);
        }
    }

    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((curElem) => {
            return curElem[property]
        })
        newVal = ["All",...new Set(newVal)]
        return newVal;
    };

    const categoryOnlyData = getUniqueCategory(data, 'category');

    const brandOnlyData  = getUniqueCategory(data, "brand")

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <DataContext.Provider value={{ data, categoryOnlyData, brandOnlyData, getUniqueCategory }}>
            {children}
        </DataContext.Provider>
    )


}


export const getData = () => {
    return useContext(DataContext);
}
