import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewProductSpecification.css";
import { API } from "aws-amplify";

export default function NewProductSpecification(props) {
    const [psname, setPsname] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [financialCode, setFinancialCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return psname.length > 0  && description.length > 0 && sku.length > 0 && financialCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await createProductSpecification({ psname, description, sku, financialCode });
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function createProductSpecification(productSpecification) {
        return API.post("productSpecification", "/productSpecifications", {
            body: productSpecification
        });
    }

    return (
        <div className="NewProductSpecification">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="psname">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        autoFocus
                        value={psname}
                        componentClass="input"
                        onChange={e => setPsname(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        value={description}
                        componentClass="input"
                        onChange={e => setDescription(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="sku">
                    <ControlLabel>SKU</ControlLabel>
                    <FormControl
                        value={sku}
                        componentClass="input"
                        onChange={e => setSku(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="financialCode">
                    <ControlLabel>Financial Code</ControlLabel>
                    <FormControl
                        value={financialCode}
                        componentClass="input"
                        onChange={e => setFinancialCode(e.target.value)}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
                </LoaderButton>
            </form>
        </div>
    );
}
