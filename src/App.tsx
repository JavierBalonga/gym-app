import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout";
import Section from "./components/section";

export default function Home() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Section>Home</Section>} />
        <Route path="*" element={<Section>404</Section>} />
      </Route>
    </Routes>
  );
}
