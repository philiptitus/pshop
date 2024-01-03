import { Container } from 'react-bootstrap';
import logo from './logo.svg';
import Header from './components/Header';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes as well
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import DBCartScreen from './screens/DBCartScreen';
import CartEditScreen from './screens/CartEditScreen';
import ShippingScreen2 from './screens/ShippingScreen2';
import PaymentScreen2 from './screens/PaymentScreen2';
import PlaceOrderScreen2 from './screens/PlaceOrderScreen2';
import BrandScreen from './screens/BrandScreen';
import CategoryScreen from './screens/CategoryScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import DeleteScreen from './screens/DeleteScreen';
import ReviewScreen from './screens/ReviewScreen';
import BrandsScreen from './screens/BrandsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import PaidScreen from './screens/PaidScreen';






















function App() {
  return (
    <Router>
      <Header />
      <main className='py-4'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/bookmarks' element={<BookmarksScreen />} />
            <Route path='/dbcart' element={<DBCartScreen />} />
            <Route path='/shipping2' element={<ShippingScreen2 />} />
            <Route path='/payment2' element={<PaymentScreen2 />} />
            <Route path='/dbcart/:id/edit' element={<CartEditScreen />} />
            <Route path='/order/:id?' element={<OrderScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path='/PlaceOrder2' element={<PlaceOrderScreen2 />} />
            <Route path='/brand/:id' element={<BrandScreen />} />
            <Route path='/category/:id' element={<CategoryScreen />} />
            <Route path='/search' element={<SearchResultScreen />} />
            <Route path='/profile/delete' element={<DeleteScreen />} />
            <Route path='/reviews/:id' element={<ReviewScreen />} />
            <Route path='/brands' element={<BrandsScreen />} />
            <Route path='/categories' element={<CategoriesScreen />} />
            <Route path='/paid' element={<PaidScreen />} />










            
















            
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;


