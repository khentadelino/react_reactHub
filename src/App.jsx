import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import ArticleDetail from "./pages/Articledetail";
import Articles from "./pages/Article";
import Home from "./pages/Home";
import NotFound from "./pages/Notfound";
import Playground from "./pages/Playground";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<ArticleDetail />} />
          <Route path="playground" element={<Playground />} />
          <Route path="about" element={<About />} />
          <Route path="settings" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
