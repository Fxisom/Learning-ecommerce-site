import { Link } from "react-router-dom";


const Category = () => {
  const categories = [
    { name: 'Men', image: '/catagory1.jpg', path: '/category/men' },
    { name: 'Women', image: '/catagory2.jpg', path: '/category/women' },
    { name: 'Kids', image: '/kids.jpg', path: '/category/Kids' },
  ];
 

  return (
    <div className="text-center py-12 mt-16"> 
      <div className="flex justify-center gap-12 flex-wrap"> 
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-32 h-32 shadow-md overflow-hidden rounded-full"> 
             <Link to={category.path}>
             <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-conatin transition-transform duration-300 ease-in-out transform hover:scale-110"
                loading="lazy"
              />
             </Link>
              
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-800">{category.name}</h3> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

  
  
  
  
  
  


