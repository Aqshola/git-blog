import React, { useState } from "react";
import { RESPONSE_POST } from "types/types";

export default function useRemove(): [
  (title: string, callback: () => any) => Promise<void>,
  "success" | "failed" | null,
  string | null,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string | null>(null);
  const [status, setstatus] = useState<"success" | "failed" | null>(null);
  return [
    async (title: string, callback: () => any) => {
      setloading(true);
      const res = await fetch("/api/admin/post/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });
      const data = (await res.json()) as RESPONSE_POST<any>;
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
