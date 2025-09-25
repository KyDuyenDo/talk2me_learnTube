import { Controller } from "react-hook-form"
import type { Control, FieldErrors, UseFormSetValue, UseFormClearErrors } from "react-hook-form"
import type { Category } from "../../../store/courseStore"
import type { FormData } from "../types"
import ErrorMessage from "../../../components/ErrorMessage"


interface CategorySelectorProps {
  control: Control<FormData>
  errors: FieldErrors<FormData>
  categories: Category[]
  showCreateCategory: boolean
  setShowCreateCategory: (show: boolean) => void
  setValue: UseFormSetValue<FormData>
  clearErrors: UseFormClearErrors<FormData>
}

export const CategorySelector = ({
  control,
  errors,
  categories,
  showCreateCategory,
  setShowCreateCategory,
  setValue,
  clearErrors,
}: CategorySelectorProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>

    {!showCreateCategory ? (
      <div className="space-y-3">
        <Controller
          name="categoryId"
          control={control}
          rules={{ required: "Please select a category" }}
          render={({ field }) => (
            <div className="relative">
              <select
                {...field}
                className={`w-full px-4 py-3 pr-10 border rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 ${
                  errors.categoryId ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
              >
                <option value="" className="text-gray-500">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="text-gray-900 py-2">
                    {category.name}
                  </option>
                ))}
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className={`w-5 h-5 transition-colors ${errors.categoryId ? "text-red-500" : "text-gray-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        />

        <button
          type="button"
          onClick={() => setShowCreateCategory(true)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors hover:bg-blue-50 px-3 py-2 rounded-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create new category
        </button>
      </div>
    ) : (
      <div className="space-y-3">
        <Controller
          name="newCategoryName"
          control={control}
          rules={{ required: "Category name is required" }}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Enter new category name"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 ${
                errors.newCategoryName ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
            />
          )}
        />

        <button
          type="button"
          onClick={() => {
            setShowCreateCategory(false)
            setValue("newCategoryName", "")
            clearErrors("newCategoryName")
          }}
          className="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors hover:bg-gray-50 px-3 py-2 rounded-md flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to category selection
        </button>
      </div>
    )}

    {(errors.categoryId || errors.newCategoryName) && (
      <ErrorMessage message={errors.categoryId?.message || errors.newCategoryName?.message!} />
    )}
  </div>
)
