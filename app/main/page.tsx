"use client"; // Make sure this is the first line of the file

import React from "react";
import { signOut } from "next-auth/react";

function Page() {
  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
    </div>
  );
}

export default Page;
