import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./DataTableDemo.css";
import { Supabase } from "../../supabase/supabase";
import BasicSelect from "./BasicSelect";
import ProjectSelect from "./ProjectSelect";

export default function Crub() {
  const [dataSelect, setDataSelect] = useState(null);
  let emptyProduct = {
    id: null,
    projectId: "",
    name: "",
    description: "",
    creationDate: "",
  };
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [projectSelect, setProjectSelect] = React.useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  useEffect(() => {
    async function getData() {
      const { data, error } = await Supabase.from("bug").select();
      setProducts(data);
      if (error) {
        console.log(error.message);
      }
    }

    getData().then();
  }, [products]);

  useEffect(() => {
    async function getSelectData() {
      const { data, error } = await Supabase.from("user").select();
      setDataSelect(data);
      if (error) {
        console.log(error.message);
      }
    }

    getSelectData().then();
  }, []);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await Supabase.from("project").select();
      setProjectSelect(data);
      if (error) {
        console.log(error);
      }
    }

    fetchProject().then();
  }, []);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
        await Supabase.from("bug")
          .update({
            name: _product.name,
            projectId: _product.projectId,
            description: _product.description,
          })
          .match({ id: product.id });
      } else {
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Bug Created",
          life: 3000,
        });
        await insertData();
      }
      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);

      //to send the backend
      async function insertData() {
        await Supabase.from("bug").insert([
          {
            name: _product.name,
            description: _product.description,
            projectId: _product.projectId,
          },
        ]);
      }
    }
  };

  const editProduct = async (productTemp) => {
    setProduct({ ...productTemp });
    setProductDialog(true);
  };

  function filter(e) {
    setGlobalFilter(e.target.value);
  }

  const confirmDeleteProduct = (productDelete) => {
    setProduct(productDelete);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    setDeleteProductDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
    await Supabase.from("bug").delete().match({ id: product.id });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Bug Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Dashboard of all bugs</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={filter} placeholder="Search..." />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}>
          {" "}
        </Toolbar>

        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} bugs"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column field="id" header="id" sortable style={{ minWidth: "2rem" }}>
            {" "}
          </Column>
          <Column
            field="projectId"
            header="P.id"
            sortable
            style={{ minWidth: "2rem" }}
          >
            {" "}
          </Column>
          <Column
            field="name"
            header="User"
            sortable
            style={{ minWidth: "8rem" }}
          >
            {" "}
          </Column>
          <Column
            field="description"
            header="Description"
            sortable
            style={{ minWidth: "25rem" }}
          >
            {" "}
          </Column>
          <Column
            field="dateCreate"
            header="Creation Date"
            sortable
            style={{ minWidth: "3rem" }}
          >
            {" "}
          </Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "4rem" }}
          >
            {" "}
          </Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Bug Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <BasicSelect
            name={product.name}
            onInputChange={onInputChange}
            dataSelect={dataSelect}
          />
          {submitted && !product.name && (
            <small className="p-error">User is required.</small>
          )}
        </div>

        <div className="field mt-2">
          <ProjectSelect
            name={product.projectId}
            onChange={(e) => onInputChange(e, "projectId")}
            projectSelect={projectSelect}
          />
          {submitted && !product.name && (
            <small className="p-error">ProjectId is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={product.description}
            onChange={(e) => onInputChange(e, "description")}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
