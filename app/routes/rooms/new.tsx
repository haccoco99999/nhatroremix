import { Form, useActionData } from "@remix-run/react";
import { ActionArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/node";
import { createRoom } from "~/models/room.server";
import * as React from "react";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const name = formData.get("name");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      {
        errors: { name: "YEU CAU TEN" },
      },
      { status: 400 }
    );
  }

  const room = await createRoom({ name });

  return redirect(`/rooms/${room.id}`);
}

export default function NewRoomPage() {
  const actionData = useActionData<typeof action>();
  const nameRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Tên: </span>
          <input
            name="name"
            ref={nameRef}
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
