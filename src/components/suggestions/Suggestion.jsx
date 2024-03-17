import UserAvatar from "../UserAvatar";

export default function Suggestion() {
  return (
    <>
      <div className="w-80 h-screen border-l">
        <p className="p-5 text-xl font-semibold border-b">Suggestions</p>
        <UserAvatar />
      </div>
    </>
  );
}
