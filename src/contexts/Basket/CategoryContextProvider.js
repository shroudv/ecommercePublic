import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { arrayToTree } from 'performant-array-to-tree';

export const CategoryContext = React.createContext();

function CategoryContextProvider(props) {

    const [getCategories, setCategories] = useState({ categories: [], normalCategories: [] })
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/categories`).then((res) => {
            if (res.status === 200) {
                const { data } = res;
                const tree = arrayToTree(data,  { dataField: null,id: "id", parentId: "parent_id" });
                setCategories({ categories: tree, normalCategories: data });
            }
        }).catch((error) => {
            return enqueueSnackbar('Kategoriya API Xətası: ' + error.code, { variant: 'error' })
        })
    }, [])

    return (
        <CategoryContext.Provider value={getCategories}>
            {props.children}
        </CategoryContext.Provider>
    )
}
export default CategoryContextProvider