import React, { useMemo, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function SearchComponent({onChangeHandler}) {
    // const [movieSearchQuery, setMovieSearchQuery] = useState('');

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
                        placeholder="Search Movies..." 
                        ref={searchInputRef}
                        // value={movieSearchQuery} 
                        onChange={(e) => onChangeHandler(e)} />
                { SearchIcon }
            </div>
        </section>
    );
}

SearchComponent.defaultProps = {
    onChangeHandler: () => {}
}

export default React.memo(SearchComponent);
