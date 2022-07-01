import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';

export const CategoryContext = React.createContext();

function CategoryContextProvider(props) {

    const nestChilds = (object) => {
        const list = [];
        object.forEach((i, index) => {
            i.depth = index
            if (i.parent_id) {
                const parent = object.find(({ id }) => id === i.parent_id);
                if (!parent.hasOwnProperty('children')) { parent.children = []; parent.parent = []; };
                parent.children.push(i);
                delete i.parent;
            } else {
                list.push(i);
            }
        })
        return list;
    }

    const [getCategories, setCategories] = useState({ categories: [], normalCategories: [] })
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/categories`).then((res) => {
            if (res.status === 200) {
                const { data } = res;
                const treeCats = nestChilds(data);
                setCategories({ categories: treeCats, normalCategories: data });
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