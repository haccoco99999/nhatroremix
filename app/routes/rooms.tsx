import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { getRoomListItems } from "~/models/room.server";

export async function loader({ request }: LoaderArgs) {
  const roomListItems = await getRoomListItems();
  return json({ roomListItems });
}

export default function RoomsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Rooms</Link>
        </h1>
      </header>
      <main className="flex h-full bg-slate-200">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Note
          </Link>

          <hr />

          {data.roomListItems.length === 0 ? (
            <p className="p-4">No room yet</p>
          ) : (
            <ol>
              {data.roomListItems.map((room) => (
                <li key={room.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={room.id}
                  >
                    {room.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
