import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import { object } from "prop-types";
import shoppingBasket from '../images/shoppingBasket.png'

export default function Product(props) {
  const {
    addToCart,
    handelsetcategoriesOnChoose,
    image,
    name,
    matnr,
    price,
    id,
    ClearChoose,
    setClearChoose,
     handelShowCart,
    Catalog,
    category,
    productQuantity,
    openModal,
    Eligibility
  } = props;
  const [clickOnAddToCart, setclickOnAddToCart] = useState(false);
  const [isAdded, setisAdded] = useState(false);
  const [isMouseInside, setisMouseInside] = useState(false);
  const [IsFromProduct, setIsFromProduct] = useState(true);
  const [NotEligibility, setNotEligibility] = useState(null);
  const [ListOfEligibilities, setListOfEligibilities] = useState([]);
 
  let timeOut;
  let CurrentProduct_l;
  let CurrentProduct;
  const handelbtnClicked = (e) => {
    setclickOnAddToCart(true);
  };

  const productaddToCart = (fimage, fname,fmatnr, fprice, fid, fquantity, fcategory) => {

    setclickOnAddToCart(true);
    let selectedProduct = ({
      image: fimage,
      name: fname,
      matnr :fmatnr,
      price: fprice,
      id: fid,
      quantity: fquantity,
      category: fcategory
    });

    CurrentProduct = selectedProduct;
    let currProduct = Catalog[Object.keys(Catalog).filter(a => Catalog[a].EAN11 === id && Catalog[a].MATNR == matnr)];
    console.log(currProduct);
    CurrentProduct_l = currProduct;
    const Eligibilities = currProduct.YDESERVE_TYPE;
     let EligibilitiesList = [];
    for (let i = 0; i < Eligibilities.length; i++) {
      for (let j = 0; j < Eligibility.length; j++) {
        if (Eligibilities[i] === Eligibility[j].CATEGORY && Eligibility[j].QTY >= currProduct.KPEIN)
          EligibilitiesList.push(Eligibility[j]);
      }
    }



    if (EligibilitiesList.length > 0) {
      if (EligibilitiesList.length === 1) {
        let count = Eligibility.filter(a => a.CATEGORY === EligibilitiesList[0].CATEGORY)[0].QTY;
        if (count >= CurrentProduct_l.KPEIN) {
          selectedProduct.eligibility = EligibilitiesList[0].CATEGORY;
          Eligibility.filter(a => a.CATEGORY === EligibilitiesList[0].CATEGORY)[0].QTY -= CurrentProduct_l.KPEIN;
          setListOfEligibilities([]);
          addCartOneElig(selectedProduct);
          setTimeout(() => {
            setisAdded(false);
            setNotEligibility(null);
            setclickOnAddToCart(false);
          }, 1000);
        }
      }
      else {
        setNotEligibility(false);
        handelselectedEligibility(EligibilitiesList);
        timeOut = setTimeout(() => {
          setisAdded(false);
           setclickOnAddToCart(false);
        }, 5000);
      }
    }
    else {
      setNotEligibility(true);
      setTimeout(() => {
        setNotEligibility(false);
        setisAdded(false);
        setclickOnAddToCart(false);
      }, 3000);
    }
  
    handelShowCart();   
  }

  const checkEligibility = (value) => {

  }

  const handelChooseEligibility = (event) => {
    const Text = Eligibility.filter(a => a.YDESC === event.currentTarget.innerText)[0].CATEGORY;
    CurrentProduct.eligibility = Text;
    Eligibility.filter(a => a.CATEGORY === Text)[0].QTY -= CurrentProduct_l.KPEIN;
    addToCart(CurrentProduct);
    setclickOnAddToCart(false);
    clearTimeout(timeOut);
  }

  const addCartOneElig = (selectedProduct) => {
    addToCart(selectedProduct);
    setisAdded(true);

  }
  useEffect(() => {
    if (ClearChoose) {
      setclickOnAddToCart(false);
      setNotEligibility(false);
      setisAdded(false);
    }
    setClearChoose(false);

  }, []);

  const handelselectedEligibility = (EligibilitiesList) => {

    return (
      <div className="Eligibility">
        {
          setListOfEligibilities(
            EligibilitiesList.map(
              zacaut => {
                if (zacaut.QTY >= CurrentProduct_l.KPEIN)
                  return (
                    <button className="eligibilityInput" key={zacaut.YDESC} onClick={handelChooseEligibility} >{zacaut.YDESC}</button>
                  )
              }
            )
          )
        }
      </div>
    )
  }

  const quickView = (qimage, qname, qprice, qid) => {

    let quickViewProduct = {
      image: qimage,
      name: qname,
      price: qprice,
      id: qid
    };

    NotEligibility === null && openModal(quickViewProduct);
  }

  let IsFree = false;
  let IsAnHlf = false;
  let IsAnRe = false;
  let IsWine = false;

  let clicked = clickOnAddToCart;
  let pimage = image;
  let pname = name;
  let pprice = price;
  let pmatnr = matnr;
  let pid = id;
  let pcategory = category;
  let pquantity = productQuantity;
  switch (pcategory) {
    case "vegetables":
      IsFree = true
      break;
    case "fruits":
      IsAnHlf = true
      break;
    case "fruits":
      IsAnRe = true
      break;
    case "nuts":
      IsWine = true
      break;

  }
  return (
    <div className={!clicked ? "product" : "product onclickedDiv"}>
      {!NotEligibility && <div className={!clicked ? "onclickedDiv" : "Eligibilities"}>
        {ListOfEligibilities.length > 0 && <h2>בחר זכאות</h2>}
        <div className="eligibility">
          {ListOfEligibilities}
        </div>
      </div>}
      {NotEligibility && <div>
        <input className="noEligibilty" defaultValue="אין זכאויות למוצר זה"></input>
      </div>}
      <div>
        <div className={!clicked ? "product-image img " : "onclickedimg"}>

          <img
            className="imageProduct"
            src={pimage}
            alt={pname}
            onClick={() => quickView(
              pimage,
              pname,
              pprice,
              pid,
              pquantity,
              pcategory
            )}
          />
        </div>


      </div>
     
      <h4 className="product-name">{pname}</h4>
      <p className="product-price">{pprice}</p>
     
      <div className="product-action">

        <button
          className={clicked ? !isAdded ? "btnNotEli" : "added" : !isAdded ? "myAddCartButton" : "added"}
          type="mybutton"
          onClick={() => productaddToCart(
            pimage,
            pname,
            pmatnr,
            pprice,
            pid,
            pquantity,
            pcategory
          )}
        >
          {!isAdded ? <img src={shoppingBasket} className="imageCart"></img> : "✔"}
        </button>
      </div>
    </div>
  );
}



