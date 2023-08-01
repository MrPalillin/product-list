import { useState } from 'react';
import "./App.css"

const products = [
  { category: "Frutas", price: "$1", stocked: true, name: "Manzana" },
  { category: "Frutas", price: "$1", stocked: true, name: "Fruta del dragón" },
  { category: "Frutas", price: "$2", stocked: false, name: "Maracuyá" },
  { category: "Verduras", price: "$2", stocked: true, name: "Espinaca" },
  { category: "Verduras", price: "$4", stocked: false, name: "Calabaza" },
  { category: "Verduras", price: "$1", stocked: true, name: "Guisantes" }
];

function FilterableProductTable() {
  const [filter, setFilter] = useState('');
  const [onlyInStock, setonlyInStock] = useState(false);
  return (
    <>
      <SearchBar filter={filter} onFilterChange={setFilter} onlyInStock={onlyInStock} onInStockChange={setonlyInStock}></SearchBar>
      <ProductTable products={products} filter={filter} onlyInStock={onlyInStock}></ProductTable>
    </>
  );
}

function SearchBar({ filter, onFilterChange, onlyInStock, onInStockChange }) {
 
  return (
    <div>
      <input type="text" placeholder="Search..." value={filter} onChange={e => { onFilterChange(e.target.value) }}></input>
      <label>
        <input type="checkbox" checked={onlyInStock} onChange={e => { onInStockChange(e.target.checked) }} />
        Only show products in stock
      </label>
    </div>
  );
}

function ProductTable({ products, filter, onlyInStock }) {
  let rows = [];
  let lastCategory = "";

  products.map(product => {

    if (product.name.toLowerCase().indexOf(filter.toLowerCase()) === -1) {
      return;
    }

    if (onlyInStock && !product.stocked){
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category}></ProductCategoryRow>);
    }

    rows.push(<ProductRow name={product.name} price={product.price} stocked={product.stocked}></ProductRow>);
    lastCategory = product.category;
  });

  return (
    <table style={{ textAlign: 'center' }}>
      <tr>
        <th>Nombre</th>
        <th>Precio</th>
      </tr>
      {rows}
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        <label>{category}</label>
      </th>
    </tr>

  );
}

function ProductRow({ name, price, stocked }) {
  const product_name = stocked ? name :
    <span style={{ color: 'red' }}>
      {name}
    </span>;


  return (
    <tr>
      <td>{product_name}</td>
      <td>{price}</td>
    </tr>
  );
}

export default FilterableProductTable;
