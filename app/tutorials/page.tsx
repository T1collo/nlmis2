import type { Metadata } from "next";

import { TutorialsPage } from "@/components/tutorials-page";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Short recordings for facilities, county health teams and suppliers, following each step from requisition to receipt.",
};

export default function Page() {
  return <TutorialsPage />;
}
