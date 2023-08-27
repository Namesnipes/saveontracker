export function ItemRow(props) {
    const url = `https://www.saveonfoods.com/sm/pickup/rsid/2226/product/${props.sku}`;
    return (
      <tr>
        <td><a href={url} target="_blank" rel="noreferrer">{props.name}</a></td>
        <td>{props.ppd}</td>
        <td>{props.min_spend}</td>
        <td><img src={props.img} alt="what" /></td>
        <td>{props.end_date}</td>
      </tr>
    )
  }