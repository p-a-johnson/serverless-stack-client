import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default function ProductSpecifications(props) {
    const [productSpecification, setProductSpecification] = useState(null);
    const [psname, setPsname] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [financialCode, setFinancialCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadProductSpecification() {
            return API.get("productSpecification", `/productSpecifications/${props.match.params.id}`);
        }

        async function onLoad() {
            try {
                const productSpecification = await loadProductSpecification();
                const { psname, description, sku, financialCode } = productSpecification;

                setPsname(psname);
                setDescription(description);
                setSku(sku);
                setFinancialCode(financialCode);
                setProductSpecification(productSpecification);
            } catch (e) {
                alert(e);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    function validateForm() {
        return psname.length > 0  && description.length > 0 && sku.length > 0 && financialCode.length > 0;
    }

    function saveProductSpecification(productSpecification) {
        return API.put("productSpecification", `/productSpecifications/${props.match.params.id}`, {
            body: productSpecification
        });
    }

    async function handleSubmit(event) {

        event.preventDefault();

        setIsLoading(true);

        try {
            await saveProductSpecification({
                psname, description, sku, financialCode
            });
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function deleteProductSpecification() {
        return API.del("productSpecification", `/productSpecifications/${props.match.params.id}`);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this Product Specification?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteProductSpecification();
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsDeleting(false);
        }
    }

    return (
        <div className="ProductSpecifications">
            {productSpecification && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="psname">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
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
                        Save
                    </LoaderButton>
                    <LoaderButton
                        block
                        bsSize="large"
                        bsStyle="danger"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    );
}
