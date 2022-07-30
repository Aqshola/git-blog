import { HTMLContent } from "@tiptap/react";
import React, { useState } from "react";
import { RESPONSE_POST } from "types/types";

export default function useCreate(): [
  (title: string, content: HTMLContent,callback:()=>any) => Promise<void>,
  "success" | "failed" | null,
  string | null,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string | null>(null);
  const [status, setstatus] = useState<"success" | "failed" | null>(null);
  return [
    async (title: string, content: HTMLContent,callback?:()=>any) => {
      setloading(true);
      const res = await fetch("/api/admin/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content,
        }),
      });
      const data = (await res.json()) as RESPONSE_POST<any>;
      if(callback){
        callback()
      }
      setstatus("success");
      if (data.status === "failed") {
        seterror(data.errorMsg);
      }
      setloading(false);
      return;
    },
    status,
    error,
    loading,
  ];
}
