import PropTypes from 'prop-types';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
      <h3 className='text-2xl'>Filters</h3>
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Category</h4>
        <hr className="w-24 h-0.5 bg-gray-400 ml-0" />

        {filters.categories.map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className='ml-1'>{category}</span>
          </label>
        ))}
      </div>

      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Price Range</h4>
        <hr className="w-24 h-0.5 bg-gray-400 ml-0" />
        {filters.priceRanges.map((range) => (
          <label key={range.label}>
            <input
              type="radio"
              className='capitalize cursor-pointer'
              name="priceRange"
              id="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
            />
            <span className='ml-1'>{range.label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className='bg-primary py-1 px-4 text-white rounded'
      >
        Clear All
      </button>
    </div>
  );
};

// Prop Validation
ShopFiltering.propTypes = {
  filters: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    priceRanges: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  filtersState: PropTypes.shape({
    category: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
  }).isRequired,
  setFiltersState: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default ShopFiltering;

