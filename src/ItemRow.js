export function ItemRow(props) {
  const url = `https://www.saveonfoods.com/sm/pickup/rsid/2226/product/${props.sku}`;
  return (
    <div className="row m-3 Item-row p-3">
      <div className="col-12 col-xl-3 col-lg-4">
      <img className="Item-image" src={props.img} alt="Grocery Item"></img></div>
      <div className="Item-data col-12 col-xl-7 col-lg-6 p-4 text-lg-start fw-light">
        <a className="Item-name fw-normal fs-4" href={url} target="_blank" rel="noreferrer">{props.name}</a>
        <p>Min. Spending Amount: ${props.min_spend}</p>
        <p>Sale End: {props.end_date}</p>
      </div>
      <div className="col-12 col-xl-2 col-lg-2 pe-lg-5 pt-lg-4 fs-4 text-lg-end ppd">
        <p>PPD: {Math.round(props.ppd)}</p>
      </div>
    </div>
  )
}