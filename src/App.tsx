import { Routes, Route } from "react-router-dom";

export default function Home() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<>Home</>} />
        <Route path="*" element={<>404</>} />
      </Route>
    </Routes>
  );
}
