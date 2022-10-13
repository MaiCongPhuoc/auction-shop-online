import React, { useState, useEffect } from "react";
import LotType from "./LotType/LotType";
import Filters from './Filters/Filters';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import ResultsFilters from "./ResultsFilters/ResultsFilters";
import { getTypeFiltersChange, searchTextSelector, getCategoriesFiltersChange } from './../../../redux/selector';
import { setSearchingFilters } from "../../../redux/actions";


const ContentLotType = () => {
    const dispatch = useDispatch();
    const [showResults, setShowResults] = useState(false)

    const search = useSelector(searchTextSelector);
    const type = useSelector(getTypeFiltersChange);
    const categories = useSelector(getCategoriesFiltersChange);

    useEffect(() => {
        try {
            if (search.length > 0 || type.length > 0 || categories.length > 0) {
                setShowResults(true);
                dispatch(setSearchingFilters(true));
            }
            else {
                setShowResults(false);
                dispatch(setSearchingFilters(false));

            }

        } catch (error) {
            console.log(error);
        }
    }, [search, type, categories])
    return (
        <div className="grid-x simple-filters-wrapper">
            <div className="simple-filters compact cell medium-12 grid-x grid-padding-x">
                {showResults ? <ResultsFilters /> : <LotType />}
                <Filters />
            </div>
        </div>
    );
}

export default ContentLotType;