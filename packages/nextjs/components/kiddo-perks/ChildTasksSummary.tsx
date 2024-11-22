export const ChildTasksSummary = () => {
  return (
    <div className="flex flex-col gap-4 border-solid border-2 border-black rounded-md bg-secondary">
      <div className="flex flex-row justify-center items-center py-6 px-3">
        <img src="https://via.placeholder.com/64" alt="Child picture" className="w-16 h-16 rounded-full" />
        <h4 className="px-4 font-semibold">Anna</h4>
      </div>
      <div className="flex flex-col px-8">
        <p className="my-1">Tokens: $1220</p>
        <p className="my-1">Tasks completed: 1/10</p>
        <p className="my-1">Perks redeemed: 4/10</p>
      </div>
    </div>
  );
};
