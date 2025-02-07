"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function ProfileClient() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{String(error)}</div>;

  return (
    user && (
      <div className="text-slate-500 " >
        {user.picture && (
          <Image
            src={user.picture}
            width={50}
            height={50}
            alt={user.name || "User Profile Photo"}
          />
        )}

        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
