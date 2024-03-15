'use client';

import { ActionName } from "@/libs/gamepad";
import { useActionEffect } from "@/libs/input";
import { useState } from "react";

export default function Home() {

  const [count, setCount] = useState(0);

  useActionEffect(ActionName.MoveUp, () => {
    setCount((c) => c + 1);
  });

  return <>
    <button>Blah { count } </button>
  </>
}
