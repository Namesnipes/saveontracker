import { Firebase } from './Firebase';

export function TableHeader() {
    return (
      <thead>
        <tr>
          {Firebase.KEY_ORDER.map(key => <th key={key}>{key}</th>)}
        </tr>
      </thead>
    )
  }