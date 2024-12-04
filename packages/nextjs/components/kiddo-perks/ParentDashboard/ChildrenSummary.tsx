import Link from "next/link";
import { ChildSummaryCard } from "./ChildSummaryCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Child, Task } from "~~/types/kiddoPerks";

export const ChildrenSummary = () => {
  const { data: childrenData } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllChildren",
  });

  const activeChildren: Child[] = childrenData
    ? childrenData
        .filter(child => child.removed == false)
        .map(child => ({
          id: Number(child.id),
          name: child.name,
          address: child.childAddr as `0x${string}`,
          removed: child.removed,
          avatar: "childAvatar.png",
        }))
    : [];

  const { data: tasks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllTasks",
  }) as { data: Task[] | undefined };

  const totalTasks = tasks?.filter(tasks => tasks.removed == false).length as number;

  if (activeChildren == undefined) {
    return <section>Loading...</section>;
  }

  if (activeChildren.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-semibold text-primary-content mb-4">Children Status</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col justify-center items-center bg-primary rounded-xl py-4 px-8">
            <p className="text-center  w-full h-full">Add a child</p>
            <Link className="btn-sm btn btn-success" href="/children">
              Go
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-primary-content mb-4">Children Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeChildren.map(child => (
          <ChildSummaryCard key={child.id} child={child} totalTasks={totalTasks} />
        ))}
      </div>
    </section>
  );
};
