import axios from "axios";
import { createContext} from "react";
import { useState } from "react";
import { useContext } from "react";


export const DataContext = createContext(null);
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const FetchAllProducts = async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products');
      
      
      setData(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }  
    };      
  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property]
    })
    newVal = ["All", ...new Set(newVal)]
    return newVal
  }

  const categoryOnlyData = getUniqueCategory(data, "category");

  return (
    <DataContext.Provider value={{ data, setData, FetchAllProducts, categoryOnlyData,}}>
      {children}
    </DataContext.Provider>
  )
};
  export const getData = () => useContext(DataContext);


