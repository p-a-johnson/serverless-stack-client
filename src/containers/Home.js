import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default function Home(props) {
    const [productSpecifications, setProductSpecifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            try {
                const productSpecifications = await loadProductSpecifications();
                setProductSpecifications(productSpecifications);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);


    function loadProductSpecifications() {
        return API.get("productSpecification", "/productSpecifications");
    }

    function renderProductSpecificationsList(productSpecifications) {
        return [{}].concat(productSpecifications).map((productSpecification, i) =>
            i !== 0 ? (
                <LinkContainer key={productSpecification.productSpecificationId} to={`/productSpecification/${productSpecification.productSpecificationId}`}>
                    <ListGroupItem header={productSpecification.psname}>
                        <i>{productSpecification.description}</i>
                        <span className="pull-right">{"Created: " + new Date(productSpecification.createdAt).toLocaleString()}</span>
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/productSpecification/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Create a new Product Specification
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>Product Catalog</h1>
                <p>Hello World for Products</p>
            </div>
        );
    }


    function renderProductSpecifications() {
        return (
            <div className="productSpecifications">
                <PageHeader>Product Specifications</PageHeader>
                <ListGroup>
                    {!isLoading && renderProductSpecificationsList(productSpecifications)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            {/*{props.isAuthenticated ? renderNotes() : renderLander()}*/}
            {props.isAuthenticated ? renderProductSpecifications() : renderLander()}
        </div>
    );
}
