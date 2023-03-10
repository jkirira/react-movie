import React, { useMemo, useRef } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function SearchComponent({value, placeholder, onChangeHandler}) {

    const SearchIcon = useMemo(() => <FontAwesomeIcon className='search-icon' icon={solid('magnifying-glass')} />, []);

    const searchInputRef = useRef(null);

    const handleClickFocus = () => {
        searchInputRef?.current?.focus();
    }

    return (
        <section className="search-section">
            <div className="search-wrapper" onClick={handleClickFocus}>
                <input className="search-input"
                        type="text" 
                        name="search" 
                        placeholder={placeholder}
                        ref={searchInputRef}
                        value={value} 
                        onChange={(e) => onChangeHandler(e)} />
                { SearchIcon }
            </div>
        </section>
    );
}

SearchComponent.defaultProps = {
    value: "",
    placeholder: "Search",
    onChangeHandler: () => {},
}

SearchComponent.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeHandler: PropTypes.func,
}

export default React.memo(SearchComponent);
