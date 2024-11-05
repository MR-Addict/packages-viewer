import { useParams } from "react-router-dom";

export default function Package() {
  const { id } = useParams();

  return (
    <div>
      <h1>Package {id}</h1>
    </div>
  );
}
