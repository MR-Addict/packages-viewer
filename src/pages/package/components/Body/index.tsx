import { usePackageContext } from "@/contexts/package";

export default function Body() {
  const { pkg } = usePackageContext();

  return (
    <ul>
      {pkg?.dependencies.map((dependency) => (
        <li key={dependency.name} className="flex flex-row items-center">
          <h2>{dependency.name}</h2>
          <p>{dependency.version}</p>
        </li>
      ))}
    </ul>
  );
}
