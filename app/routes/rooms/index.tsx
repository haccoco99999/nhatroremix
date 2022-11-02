import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
  return (
    <p>
      No room selected. Select a room on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new room.
      </Link>
    </p>
  );
}
