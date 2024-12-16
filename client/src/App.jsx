import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import IndexPage from "./components/IndexPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./components/AccountView";
import PlacesPage from "./components/PlacesPage";
import PlacesForm from "./components/PlacesForm";
import PlaceViewer from "./components/PlaceViewer";
import BookingsView from "./components/BookingsView";
import BookingsPage from "./components/BookingsPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<PlaceViewer />} />
          <Route path="/account/bookings" element={<BookingsView />} />
          <Route path="/account/bookings/:id" element={<BookingsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
