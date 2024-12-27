import { CategoryForm } from "@/components/categories/category-form";


const AddNewCategoryPage = () => {
    return (
        <div>
            <div className="container py-6 px-14">
                <h1 className="mb-6 text-2xl font-bold">Add New Category</h1>
                <CategoryForm />
            </div>
        </div>
    )
}

export default AddNewCategoryPage;