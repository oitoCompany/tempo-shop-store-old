import React, { useState, useEffect, useRef } from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import categoryProperty from './categoryProperty';
import axios from 'axios';

export default function Products(props) {
  const {
    searchTerm,
    productsList,
    SearchingFor,
    handelswSearchingFor,
    categoryTerm,
    handelShowCart,
    Eligibility,
    categoriesList,
    categoriesList1,
    handelsetcategoriesOnChoose,
    addToCart,
    productQuantity,
    updateQuantity,
    ClearChoose,
    setClearChoose,
    Catalog,
    openModal
  } = props;
  const [IsFromKCategories, setIsFromKCategories] = useState(true);

  let productsData;
  let categoriesListItems;
  let term = searchTerm;


  const handleChoose = (event) => {
    handelswSearchingFor(event);
  }

  useEffect(() => {

    console.log(categoriesList);
  }, [categoriesList])


  const equals = (a) => {
    return (x => x.YCODE_CAT == a);
  }


  let categoryview;
  categoriesListItems = Object.keys(categoriesList1).map(category => {
    return (
      <div className={categoriesList.length > 0 && categoriesList.filter(categoryItem => categoryItem === categoriesList1[category].YCODE_CAT).length > 0 ?
        "divCategory choosedCategory" : "divCategory"} key={categoriesList1[category].YCODE_CAT} onClick={handleChoose}>
        {categoriesList1[category].YCODE_CAT_DESC}

      </div>

    )
  })

  //  const searchingCategory = (categoryID) => {
  //     if (categoryID.length > 0) {
  //       return (x) => categoryID.map(e => e).includes(x.YCODE_CAT);
  //     }
  //     console.log(x ,"searchingCategory rachel" )
  //     return (x) => x;

  //   }

  const searchingCategory = (categoryID) => {
    if (categoryID && categoryID.length > 0) {
      // Filter products by category if there's a selection
      return (x) => categoryID.includes(x.YCODE_CAT);
    }
    // Return a function that does not filter when there's no selection
    return () => true;
  };
  const searchingFor = (term) => {
    return function (x) {
      console.log(term, searchingFor, "rachel")
      return (x.MAKTX.includes(term) || !term) || (x.EAN11.includes(term) || !term);

    };

  }

  productsData = productsList
    .filter(
      SearchingFor === "term"
        ? searchingFor(term)
        : searchingCategory(categoryTerm) // Modified to handle all categories when empty
    )
    .map(product => {
      return (
        <Product
          setClearChoose={setClearChoose}
          ClearChoose={ClearChoose}
          Catalog={Catalog}
          Eligibility={Eligibility}
          handelsetcategoriesOnChoose={handelsetcategoriesOnChoose}
          handelShowCart ={handelShowCart}
          matnr={product.MATNR}
          key={product.EAN11}
          price={product.YPRICE_NETO_TAX}
          name={product.MAKTX}
          image={product.YFILE}
          id={product.EAN11}
          addToCart={addToCart}
          productQuantity={productQuantity}
          updateQuantity={updateQuantity}
          openModal={openModal}
          category={product.YCODE_CAT}
        />
      );
    });

  // Empty and Loading States
  let view;
  if (productsData.length <= 0 && !term) {
    view = <LoadingProducts />;
  } else if (productsData.length <= 0 && term) {
    view = <NoResults />;
  } else {
    view = (
      <CSSTransitionGroup
        transitionName="fadeIn"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        component="div"
        className="products"
      >
        {productsData}
      </CSSTransitionGroup>
    );
  }
  return <div className="products-wrapper">
    <div className="flex">
      
  
   
      <div className="categories">
        {categoriesListItems}
      </div>

      <div>{view}</div>

    </div>
  </div>
}
