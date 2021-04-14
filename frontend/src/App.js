import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Login from './Users/Pages/Login';
import Register from './Users/Pages/Register';
import Footer from './screen/Footer';
import HomeView from './screen/HomeScreen';
import React, { useEffect } from 'react';
import HowItWorks from './screen/HowItWorks';
import CandidatePost from './POSTS/pages/CandidatePost';
import PostScreen from './screen/PostScreen';

import AdminUsersScreen from './screen/AdminUsersScreen';
import AdminPostsScreen from './screen/AdminPostsScreen';
import ProfileScreen from './screen/ProfileScreen';
import EditProfileScreen from './screen/EditProfileScreen';
import EditUserScreen from './screen/EditUserScreen';
import CreatePost from './screen/CreatePost';
import CandidateProfile from './screen/CandidateProfile';
import UserProfileScreen from './screen/UserProfileScreen';
import AdminCandidateScreen from './screen/AdminCandidateScreen';
import EditCandidateScreen from './screen/EditCandidateScreen';
import UserApplyScreen from './screen/UserApplyScreen';
import Team from './screen/Team';
import Inspiration from './screen/Inspiration';
import ScreenResults from './screen/ScreenResults';
import { useSelector, useDispatch } from 'react-redux';
import { listPosts } from './Action/PostActions';
import Post from './POSTS/pages/Post';
import dotenv from 'dotenv';
dotenv.config();
function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postList = useSelector((state) => state.postList);
  const { posts } = postList;
  const postDetails = useSelector((state) => state.postDetails);
  const { post } = postDetails;
  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact>
            <HomeView />
            {userInfo && posts.length !== 0 && post.isVoting && (
              <ScreenResults />
            )}
            <HowItWorks />
            <Post />
            <Inspiration />

            <Footer />
          </Route>
          <Route path='/posts/candidates' exact>
            <HomeView />
            <CandidatePost />
            <Inspiration />
            <Footer />
          </Route>
          <Route path='/post/:id' component={PostScreen} exact />
          <Route path='/users/:id' component={UserProfileScreen} exact />
          <Route
            path='/profile/candidates/:id'
            component={CandidateProfile}
            exact
          />
          <Route path='/login/user' component={Login} exact />
          <Route path='/register' component={Register} exact />

          <Route path='/about/us/' exact>
            <HomeView />
            <Team />
            <Footer />
          </Route>

          <Route path='/our/service/' exact>
            <HomeView />
            <Inspiration />
            <Footer />
          </Route>

          <Route
            path='/user/candidate/:id/edit'
            component={UserApplyScreen}
            exact
          />

          <Route path='/admin/users' component={AdminUsersScreen} exact />
          <Route path='/admin/user/:id/edit' component={EditUserScreen} exact />
          <Route path='/admin/posts' component={AdminPostsScreen} exact />
          <Route
            path='/admin/candidatelist'
            component={AdminCandidateScreen}
            exact
          />
          <Route
            path='/admin/candidatelist/:id/edit'
            component={EditCandidateScreen}
            exact
          />
          <Route path='/admin/post/:id/edit' component={CreatePost} exact />
          <Route path='/user/profile' component={ProfileScreen} exact />
          <Route path='/candidate/:id' component={CandidateProfile} exact />
          <Route
            path='/user/profile/:id/edit'
            component={EditProfileScreen}
            exact
          />

          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
