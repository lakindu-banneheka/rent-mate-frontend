'use client'

import { itemService } from "@/lib/api/itemService";
import { Item } from "@/types/Item";
import { useEffect, useRef, useState } from "react";

const ItemPage = () => {
    const [items, setItems] = useState<Item[]>();
    const didFetchRef = useRef(false);

    useEffect(() => {
        if(didFetchRef.current === false){
            didFetchRef.current = true;
            fetchItems();
        }
    },[]);

    const fetchItems = async () => {
        const itemList = await itemService.getAllItems();
        setItems(itemList);
    }

    console.log('test page', items)

    return (
        <>
            test
        </>
    );
}

export default ItemPage;