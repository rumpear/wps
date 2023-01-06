import { useCallback, useEffect, useState } from 'react';
import {
  getAllProducts,
  getAllCategories,
  getProductsByCategoryId,
} from '../../js/wordpressFetch';
import './styles.scss';

const WPStore = () => {
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});

  //   console.log(subCategories, 'subCategories');

  const fetchAllProducts = useCallback(async () => {
    try {
      const products = await getAllProducts();
      setProductsData(products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubCategories = (id, parentId, type) => {
    const res = categoriesData.filter(({ parent, id: innerId }) => {
      const filterId = type !== 'back' ? parent : innerId;
      return id === filterId;
    });

    setSubCategories(prev => {
      const innerId = type === 'main' ? id : parentId;
      return {
        ...prev,
        [innerId]: res,
      };
    });
  };

  const fetchAllCategories = useCallback(async () => {
    try {
      const categories = await getAllCategories();
      setCategoriesData(categories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCategory = async id => {
    const productsByCategory = await getProductsByCategoryId(id);
    setProductsData(productsByCategory);
  };

  const handleCategoryReset = async () => {
    setSubCategories([]);
    await fetchAllProducts();
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  useEffect(() => {
    const parentCategories = categoriesData?.filter(item => item.parent === 0);
    setMainCategories(parentCategories);
  }, [categoriesData]);

  if (loading) {
    return <h2>loading...</h2>;
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <h2>Categories</h2>
          <ul
            style={{
              display: 'grid',
              gap: 20,
              marginBottom: 20,
            }}
          >
            {!!mainCategories &&
              mainCategories.map(item => {
                const isRender =
                  !subCategories[item.id]?.some(({ id }) => id === item.id) &&
                  !!subCategories[item.id]?.length;

                return (
                  <li key={item.id} style={{ gridColumn: 1 }}>
                    <p>id: {item.id}</p>
                    <p>name: {item.name}</p>
                    <p>parent: {item.parent}</p>
                    <p>count: {item.count}</p>
                    <p>review_count: {item.review_count}</p>
                    <div>
                      <a href={item.permalink}>Go to link</a>
                    </div>
                    {
                      <button
                        type="button"
                        onClick={() =>
                          handleSubCategories(item.id, item.id, 'main')
                        }
                      >
                        Show subcategory
                      </button>
                    }

                    <button
                      type="button"
                      onClick={() => handleCategory(item.id)}
                    >
                      Choose category
                    </button>

                    {isRender ? (
                      subCategories[item.id]?.map(
                        ({
                          count,
                          description,
                          id,
                          name,
                          review_count,
                          parent,
                          permalink,
                          subcategory,
                        }) => {
                          const isShouldShowCategoriesBtn =
                            !!categoriesData.filter(
                              ({ parent: innerParent }) => innerParent === id,
                            ).length;

                          return (
                            <div key={subcategory + name}>
                              <p>id: {id}</p>
                              <p>name: {name}</p>
                              <p>parent: {parent}</p>
                              <p>count: {count}</p>
                              <p>review_count: {review_count}</p>
                              {
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSubCategories(parent, item.id, 'back')
                                  }
                                >
                                  back
                                </button>
                              }
                              {isShouldShowCategoriesBtn && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSubCategories(id, item.id, 'parent')
                                  }
                                >
                                  Show subcategory
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleCategory(id)}
                              >
                                Choose category
                              </button>
                            </div>
                          );
                        },
                      )
                    ) : (
                      <div> No subcategory items</div>
                    )}
                  </li>
                );
              })}
          </ul>

          <button type="button" onClick={handleCategoryReset}>
            Reset category
          </button>
        </div>

        <div>
          <h2>Products</h2>
          <div className="products">
            {!!productsData.length &&
              productsData.map(
                ({ id, name, permalink, prices, categories, images }) => {
                  const [firstPhoto] = images;

                  return (
                    <div key={id}>
                      <img src={firstPhoto.thumbnail} alt={firstPhoto.alt} />
                      <p>{name}</p>
                      <p>{prices.price + prices.currency_symbol}</p>

                      <span className="categories">
                        {!!categories.length &&
                          categories.map(({ id, link, name }) => {
                            return (
                              <a href={link} key={id}>
                                {name}
                              </a>
                            );
                          })}
                      </span>

                      <div>
                        <a href={permalink}>Buy product</a>
                      </div>
                    </div>
                  );
                },
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WPStore;
