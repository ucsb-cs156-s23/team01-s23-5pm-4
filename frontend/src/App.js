import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import AvilaBeachPage from "main/pages/Towns/AvilaBeachPage";
import LosAlamosPage from "main/pages/Towns/LosAlamosPage";
import ArroyoGrandePage from "main/pages/Towns/ArroyoGrandePage";

import "bootstrap/dist/css/bootstrap.css";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";
import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantDetailsPage from "main/pages/Restaurants/RestaurantDetailsPage";


import TransportCreatePage from "main/pages/Transports/TransportCreatePage";
import TransportEditPage from "main/pages/Transports/TransportEditPage";
import TransportIndexPage from "main/pages/Transports/TransportIndexPage";
import TransportDetailsPage from "main/pages/Transports/TransportDetailsPage";



import AttractionCreatePage from "main/pages/Attractions/AttractionCreatePage";
import AttractionEditPage from "main/pages/Attractions/AttractionEditPage";
import AttractionIndexPage from "main/pages/Attractions/AttractionIndexPage";
import AttractionDetailsPage from "main/pages/Attractions/AttractionDetailsPage";

import BookCreatePage from "main/pages/Books/BookCreatePage";
import BookEditPage from "main/pages/Books/BookEditPage";
import BookIndexPage from "main/pages/Books/BookIndexPage";
import BookDetailsPage from "main/pages/Books/BookDetailsPage";



function App() {

  const reload = () => window.location.reload();

  return (
    <BrowserRouter basename="/team01-s23-5pm-4">
      <Routes>
        <Route path="/storybook-static" onEnter={reload}/>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/towns/AvilaBeach" element={<AvilaBeachPage />} />
        <Route exact path="/towns/LosAlamos" element={<LosAlamosPage />} />
        <Route exact path="/towns/ArroyoGrande" element={<ArroyoGrandePage />} />
        
        <Route exact path="/restaurants/create" element={<RestaurantCreatePage />} />
        <Route exact path="/restaurants/edit/:id" element={<RestaurantEditPage />} />
        <Route exact path="/restaurants/details/:id" element={<RestaurantDetailsPage />} />
        <Route exact path="/restaurants/" element={<RestaurantIndexPage />} />

        <Route exact path="/transports/create" element={<TransportCreatePage />} />
        <Route exact path="/transports/edit/:id" element={<TransportEditPage />} />
        <Route exact path="/transports/details/:id" element={<TransportDetailsPage />} />
        <Route exact path="/transports/" element={<TransportIndexPage />} />

        <Route exact path="/attractions/create" element={<AttractionCreatePage />} />
        <Route exact path="/attractions/edit/:id" element={<AttractionEditPage />} />
        <Route exact path="/attractions/details/:id" element={<AttractionDetailsPage />} />
        <Route exact path="/attractions/" element={<AttractionIndexPage />} />

        <Route exact path="/books/create" element={<BookCreatePage />} />
        <Route exact path="/books/edit/:id" element={<BookEditPage />} />
        <Route exact path="/books/details/:id" element={<BookDetailsPage />} />
        <Route exact path="/books/" element={<BookIndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
