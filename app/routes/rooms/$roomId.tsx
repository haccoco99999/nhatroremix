import { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteRoom, getRoom } from "~/models/room.server";
import { Form, useCatch, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  invariant(params.roomId, "roomId not found");

  const room = await getRoom({ id: params.roomId });

  if (!room) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ room });
}

export async function action({ params }: ActionArgs) {
  invariant(params.roomId, "roomId not found");

  await deleteRoom({ id: params.roomId });

  return redirect("/rooms");
}

export default function RoomDetailsPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h3 className="text-2xl font-bold">Số phòng: {data.room.name}</h3>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
         
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"

        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
