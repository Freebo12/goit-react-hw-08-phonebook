import { Section } from './Section/Section';
import { PhoneBook } from './PhoneBook/PhoneBook';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { ListContacts } from './ListContacts/ListContacts';
import { fetchContacts } from './Redux/contacts/operations';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getState } from './Redux/contacts/selectors';

import { Routes, Route, redirect } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage';
import { RegisterPage } from 'Pages/RegisterPage';
import { LogInPage } from 'Pages/LoginPage';
import { Layout } from './Layout';
import { PageNotFound } from 'Pages/NotFoundPage';
import { refreshUser } from './Redux/auth/operations';
import { useAuth } from './hooks/useAuth';
import { RestrictedRoute } from './RestrictedRoutes';
import { PrivateRoute } from './PrivateRoutes';
import { ContactsPage } from '../Pages/ContactsPage';
import { GlobalStyle } from './GlobalStyle';

export const App = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getState);
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // return (
  //   <>
  //     <Section title={'Phonebook'}>
  //       <PhoneBook />
  //     </Section>
  //     <Section title={'Contacts'}>
  //       <SearchFilter />
  //       {isLoading && <p>Loading tasks...</p>}
  //       {error && <p>{error}</p>}
  //       {items.length > 0 && <ListContacts />}
  //     </Section>
  //   </>
  // );

  return isRefreshing ? (
    <div> loading...</div>
  ) : (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegisterPage />}
                redirectTo="/register"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LogInPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};