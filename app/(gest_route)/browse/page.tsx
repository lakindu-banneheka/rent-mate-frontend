"use client";
import ItemCard from "@/components/items/item-card";
import { FilterToolbar } from "@/components/items/item-filter-toolbar";
import { fetchCategories } from "@/lib/features/categorySlice";
import { fetchItems } from "@/lib/features/itemSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Item } from "@/types/itemTypes";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Filters {
  id: string;
  label: string;
}

const BrowsePage = () => {
  const [activeFilters, setActiveFilters] = useState<string>("");
  const [searchString, setSearchString] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  //   const [itemList, setitemList] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Filters[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const itemList = useSelector((state: RootState) => state.item.items);
  const categoryList = useSelector(
    (state: RootState) => state.category.categories
  );

  // const isCategoryLoading = useSelector((state: RootState) => state.category.loading);
  const categoryError = useSelector((state: RootState) => state.category.error);

  console.log(categoryError, "error");
  console.log(categoryList);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    const getAllFilters: Filters[] = categoryList.map((category) => ({
      id: category.id,
      label: category.name,
    }));
    setCategories(getAllFilters);
  }, [categoryList]);

  const getFilteredItems = useMemo(() => {
    if (itemList.length > 0 && itemList[0]) {
      return itemList.filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchString.toLowerCase()) ||
          item.description.toLowerCase().includes(searchString.toLowerCase());

        const matchesFilters = activeFilters
          .split(",")
          .some((filterId) => item.categoryId.includes(filterId));

        return matchesSearch && matchesFilters;
      });
    }

    return [];
  }, [searchString, activeFilters, itemList]);

  useEffect(() => {
    setFilteredItems(getFilteredItems);
  }, [getFilteredItems]);

  return (
    <div className="mx-20 my-10">
      <FilterToolbar
        filters={categories}
        onFilterChange={setActiveFilters}
        onSearchChange={setSearchString}
        alignment="right"
        defaultFilterString={activeFilters}
        filterLabel={"Filter"}
      />

      <div className="grid gap-4 grid-cols-4 mt-5">
        {filteredItems.length > 0 &&
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} categoryFilters={categories} />
          ))}
      </div>
    </div>
  );
};

export default BrowsePage;
