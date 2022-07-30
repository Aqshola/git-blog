import { HTMLContent } from "@tiptap/react";
import React, { useState } from "react";
import { POST_TYPE, RESPONSE_POST } from "types/types";

export default function useUpdate():[(title:string, content:HTMLContent, callback?:()=>any)=>Promise<void>, "success" | "failed" | null, string | null, boolean] {
  const [loading, setloading] = useState<boolean>(false);
  const [status, setstatus] = useState<"success" | "failed" | null>(null);
  const [error, seterror] = useState<string | null>(null);

  return [
    async (title: string, content: HTMLContent, callback?: () => any) => {
      setloading(true);
      const res = await fetch("/api/admin/post/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content,
        }),
      });
      const data = (await res.json()) as RESPONSE_POST<POST_TYPE>;
      setstatus(data.status);
      if (data.errorMsg) {
        seterror(data.errorMsg);
      }
      if (callback) {
        callback();
      }

      setloading(false);
      return;
    },
    status,
    error,
    loading,
  ];
}
