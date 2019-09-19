# Rotas privadas

Como criamos rotas privadas no React? Rotas que sejam acessíveis apenas se o usuário está logado por exemplo.

- comece criando dentro de _routes_ um componente próprio chamado `Route.js`
- então ao invés de importar o _Route_ do _react-router-dom_ nós vamos importar o nosso proprio Route.
- configure o arquivo _Route_ da seguinte forma:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  /** armazena se o usuario esta logado ou nao */
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />; // redireciona para fazer login
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
```

- e altere o arquivo principal das rotas `src/routes/index.js` da seguinte forma:

```jsx
import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/" component={() => <h1>404 não encontrado</h1>} />
    </Switch>
  );
}
```

# Layouts por página
