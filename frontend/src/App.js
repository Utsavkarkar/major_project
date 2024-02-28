import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/home'
import Cart from './pages/cart';
import IphoneSkin from "./pages/iphone_skin"
import OnePlusSkin from "./pages/onePlus_skins"
import SamsungSkin from "./pages/samsungSkins"
import OppoSkin from './pages/oppo_skins'
import WindowsSkinsLaptop from './pages/windowsSkins';
import MacBookSkinsLaptop from './pages/macBookSkin';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';
import Register from './pages/register';
import Forgot from './pages/forgot';
// import Profile from './pages/profile';
// import Admin from './pages/admin';
import Admin2 from './pages/admin2';
import AddProduct from './pages/addProduct';
import EditProduct from './pages/editProduct';
import AdminLogin from './pages/adminLogin';
import Checkout from './pages/checkout';
import paymentSuccess from './pages/paymentSuccess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout><Home/></Layout>}/>
        <Route path='/cart' element={<Layout><Cart/></Layout>}/>
        <Route path='/iphoneSkin' element={<Layout><IphoneSkin/></Layout>}/>
        <Route path='/onePlusSkin' element={<Layout><OnePlusSkin/></Layout>}/>
        <Route path='/samsungSkin' element={<Layout><SamsungSkin/></Layout>}/>
        <Route path='/oppoSkin' element={<Layout><OppoSkin/></Layout>}/>
        <Route path='/mackbookSkin' element={<Layout><MacBookSkinsLaptop/></Layout>}/>
        <Route path='/windowsSkin' element={<Layout><WindowsSkinsLaptop/></Layout>}/>
        <Route path='/about' element={<Layout><About/></Layout>}/>
        <Route path='/contact' element={<Layout><Contact/></Layout>}/>
        <Route path='/login' element={<Layout><Login/></Layout>}/>
        <Route path='/register' element={<Layout><Register/></Layout>}/>
        <Route path='/forgot' element={<Layout><Forgot/></Layout>}/>
        {/* <Route path='/profile' element={<Layout><Profile/></Layout>}/> */}
        {/* <Route path='/admin' element={<Layout><Admin/></Layout>}/> */}
        <Route path='/admin2' element={<Layout><Admin2/></Layout>}/>
        <Route path='/addproduct' element={<Layout><AddProduct/></Layout>}/>
        <Route path='/editproduct' element={<Layout><EditProduct/></Layout>}/>
        <Route path='/adminlogin' element={<Layout><AdminLogin/></Layout>}/>
        <Route path='/checkout' element={<Layout><Checkout/></Layout>}/>
        <Route path='/paymentsuccess' element={<Layout><paymentSuccess/></Layout>}/>
      </Routes>
    </div>
  );
}

export default App;
