import { Polybase } from "@polybase/client";

export default function getDb() {
  const db = new Polybase({
    defaultNamespace:
      "pk/0xd51f360fa2f5ae76cdde0c5df29ec486efefb1d6aed136eb88837aeda8810baa1fa869f3f2b4ef567930e4f1072764494aaccc275e3acc3456cb87ee3bf56895/scaling-tree3",
  });
  return db;
}
