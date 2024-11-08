import { DependencyType } from "@/types/package";

export default function mergeDependencies(oldDeps: DependencyType[], newDeps: DependencyType[]): DependencyType[] {
  return newDeps.map((dep) => {
    const oldDep = oldDeps.find((d) => d.name === dep.name);
    if (oldDep) Object.assign(dep, { selected: oldDep.selected, latest: oldDep.latest });
    return dep;
  });
}
