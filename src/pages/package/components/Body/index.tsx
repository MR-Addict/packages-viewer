import style from "./index.module.css";
import { DependencyType } from "@/types/package";
import { usePackageContext } from "@/contexts/package";

function DependencyRow({ dep }: { dep: DependencyType }) {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{dep.name}</td>
      <td>{dep.type}</td>
      <td>{dep.version}</td>
      <td>1.1.1</td>
    </tr>
  );
}

export default function Body() {
  const { pkg } = usePackageContext();

  if (!pkg.dependencies.length) return null;

  return (
    <div className={style.wrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Package</th>
            <th>Type</th>
            <th>Version</th>
            <th>Latest</th>
          </tr>
        </thead>
        <tbody>
          {pkg.dependencies.map((dep) => (
            <DependencyRow key={dep.name} dep={dep} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
