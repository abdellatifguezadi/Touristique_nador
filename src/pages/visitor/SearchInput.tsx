import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../features/lieux/lieuxSlice";
import type { RootState, AppDispatch } from '../../app/store';

const SearchInput = () => {

    const dispatch = useDispatch<AppDispatch>();
    const search = useSelector((state: RootState) => state.lieux.searchQuery);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    }

    return (
    <input
      type="text"
      placeholder="Rechercher un lieu..."
      value={search}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
}

export default SearchInput