import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { Story } from "./pages/Story";
import { Exhibit001 } from "./pages/Exhibit001";
import { Exhibit002 } from "./pages/Exhibit002";
import { Exhibit003 } from "./pages/Exhibit003";

const exhibitPadding = { padding: "24px 20px 60px" };

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Story />} />
        <Route
          path="/exhibits/001"
          element={
            <div style={exhibitPadding}>
              <Exhibit001 />
            </div>
          }
        />
        <Route
          path="/exhibits/002"
          element={
            <div style={exhibitPadding}>
              <Exhibit002 />
            </div>
          }
        />
        <Route
          path="/exhibits/003"
          element={
            <div style={exhibitPadding}>
              <Exhibit003 />
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
