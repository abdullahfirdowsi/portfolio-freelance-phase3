import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProjectListPage from './pages/admin/projects/ProjectListPage';
import ProjectFormPage from './pages/admin/projects/ProjectFormPage';
import PricingListPage from './pages/admin/pricing/PricingListPage';
import PricingFormPage from './pages/admin/pricing/PricingFormPage';
import ContactListPage from './pages/admin/contacts/ContactListPage';
import ContactDetailPage from './pages/admin/contacts/ContactDetailPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          <Route path="/projects" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <Projects />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          <Route path="/pricing" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <Pricing />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <About />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <Contact />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          } />
          <Route path="/admin/projects" element={
            <AdminLayout>
              <ProjectListPage />
            </AdminLayout>
          } />
          <Route path="/admin/projects/new" element={
            <AdminLayout>
              <ProjectFormPage />
            </AdminLayout>
          } />
          <Route path="/admin/projects/edit/:id" element={
            <AdminLayout>
              <ProjectFormPage />
            </AdminLayout>
          } />
          <Route path="/admin/pricing" element={
            <AdminLayout>
              <PricingListPage />
            </AdminLayout>
          } />
          <Route path="/admin/pricing/new" element={
            <AdminLayout>
              <PricingFormPage />
            </AdminLayout>
          } />
          <Route path="/admin/pricing/edit/:id" element={
            <AdminLayout>
              <PricingFormPage />
            </AdminLayout>
          } />
          <Route path="/admin/contacts" element={
            <AdminLayout>
              <ContactListPage />
            </AdminLayout>
          } />
          <Route path="/admin/contacts/:id" element={
            <AdminLayout>
              <ContactDetailPage />
            </AdminLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;