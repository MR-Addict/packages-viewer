import { ApiResultType } from "@/types/app";
import { RemoteDependency, RemoteDependencyType } from "@/types/package";

export default async function fetchDependency(name: string): Promise<ApiResultType<RemoteDependencyType>> {
  const fallbackMessage = "Failed to fetch package";
  const url = `https://registry.npmjs.org/${name}/latest`;

  try {
    const res = await fetch(url).then((res) => res.json());
    const parsed = RemoteDependency.safeParse(res);
    if (!parsed.success) return { success: false, message: "Failed to parse package" };
    return { success: true, data: parsed.data };
  } catch (err) {
    console.error(err);
    return { success: false, message: fallbackMessage };
  }
}
