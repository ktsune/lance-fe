import React, { useState, useMemo } from 'react'
import './App.css'
import SplashPage from '../SplashPage/SplashPage'
import LogInForm from '../LogInForm/LogInForm'
import CheckInForm from "../CheckInForm/CheckInForm";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import { Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { CurrentCenterContext } from '../CurrentCenterContext';
const client = new ApolloClient({
  uri: 'https://safe-space-be.herokuapp.com/graphql',
});

const App = () => {
  const [reliefCenter, setreliefCenter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentReliefCenter = useMemo(() => ({ reliefCenter, setreliefCenter }), [reliefCenter, setreliefCenter]);

    
  
  // selectPin = (id) => {
    //   console.log(id)
    // }
    
    //add componentDidMount to fetch relief center data
    // once fetched, set isLoading to false
    
    return (
      <ApolloProvider client={client}>
      <section className="App">
        <CurrentCenterContext.Provider value={currentReliefCenter}>
          <Route exact path="/">
            {isLoading ? (
              <SplashPage />
              ) : (
                <LogInForm
                reliefCenter={reliefCenter}
                />
                )}
          </Route>
          {/* <Route exact path='/supplies' render={() => < /> */}
          <Route exact path="/check-in" component={CheckInForm} />
          <Route exact path="/check-out" component={CheckOutForm} />
        </CurrentCenterContext.Provider>
      </section>
    </ApolloProvider>
  );
}

export default App;
