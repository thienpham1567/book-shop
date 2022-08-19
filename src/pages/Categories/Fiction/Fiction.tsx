import React, { Fragment } from 'react'
import { Link, Outlet, useOutlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';

const Fiction = () => {
  const outlet = useOutlet();
  return (
    <Fragment>
      {
        !outlet ? <Container>

        </Container>
          : <Outlet />
      }
    </Fragment>
  )
}

export default Fiction