import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";
import { Catalog } from "./pages/catalog";
import { ItemDetail } from "./pages/item-detail";
import { Contact } from "./pages/contact";
import { AdminLogin } from "./pages/admin-login";
import { AdminDashboard } from "./pages/admin-dashboard";
import { AdminItemForm } from "./pages/admin-item-form";
import { AdminRoute } from "./components/admin-route";
import { AuthProvider } from "./context/auth-context";
import { ScrollToTop } from "./components/scroll-to-top";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/catalog" component={Catalog} />
              <Route path="/catalog/:id" component={ItemDetail} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin/login" component={AdminLogin} />
              <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
              <AdminRoute path="/admin/items/new" component={AdminItemForm} />
              <AdminRoute path="/admin/items/:id/edit" component={AdminItemForm} />
              <Redirect to="/" />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;