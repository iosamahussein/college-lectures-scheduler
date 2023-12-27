import InstructorsTable from "@/components/InstructorsTable";
export default function Page() {
  return (
    <div className="flex-1">
      <h1 className="text-3xl pl-4 pt-14 font-bold text-start w-full m-6">
        Professors
      </h1>
      <InstructorsTable api="Professors" />
    </div>
  );
}
