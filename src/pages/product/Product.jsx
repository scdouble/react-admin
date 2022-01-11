import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './product.css'
import ProductHome from './Home'
import ProductAddUpdate from './AddUpdate'
import ProductDetail from './Detail'
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product" component={ProductHome} />
        <Route path="/product/detail" component={ProductDetail} />
        <Route path="/product/addupdate" component={ProductAddUpdate} />
        <Redirect to="/product" />
      </Switch>
    )
  }
}
