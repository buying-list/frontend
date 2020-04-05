import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

import AppNavbar from "../../components/AppNavbar";

import "./styles.css";

function ItemList({ getItems, item }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
    setItems(item.items);
  }, [getItems, item.items]);

  return (
    <>
      <AppNavbar />
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const name = prompt("Enter Item");
            if (name) {
              setItems([...items, { id: uuidv4(), name }]);
            }
          }}
        >
          Add Item
        </Button>

        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setItems(items.filter(item => item.id !== id));
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </>
  );
}

ItemList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    item: state.item
  };
}

export default connect(mapStateToProps, { getItems })(ItemList);
