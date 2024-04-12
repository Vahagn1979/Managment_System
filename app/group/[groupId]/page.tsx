import SingleGroup from "../../components/groups/SingleGroup";

export default function SingleGroupPage({
  params: { groupId },
}: {
  params: { groupId: number };
}) {
  return (
    <>
      <SingleGroup groupId={groupId}/>
    </>
  );
}
