import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import SearchSongs from './pages/SearchSongs';
import SongDetail from './pages/SongDetail';
import AddLyrics from './pages/AddLyrics';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import PrivateRoutes from './components/PrivateRoutes';
import ShowLyricsPost from './pages/ShowLyricsPost';
import EditLyrics from './pages/EditLyrics';
import CommentDetail from './pages/CommentDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/addLyrics/:songId' element={<AddLyrics />} />
          <Route path='/myPage/:signedInUser_id' element={<MyPage />} />
          <Route
            path='/newLyrics/:songId/:addedLyricsId/edit'
            element={<EditLyrics />}
          />
          <Route
            path='/newLyrics/:songId/:addedLyricsId/comment/:addedCommentId'
            element={<CommentDetail />}
          />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/searchSongs' element={<SearchSongs />} />
        <Route path='/searchSongs/:songId' element={<SongDetail />} />
        <Route
          path='/newLyrics/:songId/:addedLyricsId'
          element={<ShowLyricsPost />}
        />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
