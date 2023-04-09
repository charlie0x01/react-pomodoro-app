import React from "react";
import { Link } from "react-router-dom";

const _404Page = () => {
  return (
    <section class="hero is-fullheight is-danger">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">404</h1>
          <h2 class="subtitle is-3">Page not found</h2>
          <Link to="/" class="button is-primary" href="/">
            Go to Home Page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default _404Page;
