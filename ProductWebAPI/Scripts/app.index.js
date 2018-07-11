$(document).ready(() => {
    getAllProducts();

    $("#editProduct").click((event) => {
        event.preventDefault();
        editProduct();
    });

    $("#addProduct").click((event) => {
        event.preventDefault();
        addProduct();
    });

    const clearValuesBtn = $('.clear-values');
    clearValuesBtn.click((event) => {
        event.preventDefault();
        const form = clearValuesBtn.parent();
        form.find('input[type=text]').val('');
    });
});

const request = method => (url, data) => new Promise((resolve, reject) => {
    $.ajax({
        url,
        type: method,
        data: data || {},
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: resolve,
        error: reject,
    });
})

const getRequest = request('GET')
const postRequest = request('POST')
const deleteRequest = request('DELETE')
const putRequest = request('PUT')

const createTableContent = (products, initialContent) => (
    products.reduce((acc, product) => {
        const productRow = `
            <tr>
                <td>${product.Id}</td>
                <td>${product.Name}</td>
                <td>${product.Description}</td>
                <td>${product.Price}</td>
                <td>${product.PictureUrl}</td>
                <td>
                    <a id='editItem' data-item='${product.Id}' onclick='editItem(this);' >Edit</a>
                </td>
                <td>
                    <a id='delItem' data-item='${product.Id}' onclick='deleteItem(this);' >Delete</a>
                </td>
            </tr>
        `;
        return acc + productRow;
    }, initialContent)
)

const writeResponse = (products) => {
    let tableContent = `
        <table class="table table-bordered table-hover">
            <thead>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>PictureUrl</th>
                <th>Action</th>
                <th>Action</th>
            </thead>
            <tbody>
    `

    tableContent = createTableContent(products, tableContent)
    tableContent += "</table>";

    $("#tableBlock").html(tableContent);
}

const reloadProducts = () => {
    getAllProducts()
}

const deleteItem = (el) => {
    const id = $(el).attr('data-item');
    deleteProduct(id);
}

const editItem = (el) => {
    const id = $(el).attr('data-item');
    getProduct(id);
}

const showProduct = (product) => {
    if (product != null) {
        $("#createBlock").hide();
        $("#editBlock").show();
        $("#editId").val(product.Id);
        $("#editName").val(product.Name);
        $("#editDescription").val(product.Description);
        $("#editPrice").val(product.Price);
        $("#editPictureUrl").val(product.PictureUrl);
    }
    else {
        alert("Product not created");
    }
}

const getProduct = (id) => {
    getRequest(`/api/values/${id}`)
        .then(showProduct)
        .catch(alert);
}

const getAllProducts = () => {
    $("#createBlock").show();
    $("#editBlock").hide();

    getRequest('/api/values')
        .then(writeResponse)
        .catch(alert);
}

const addProduct = () => {
    const product = {
        Name: $('#addName').val(),
        Description: $('#addDescription').val(),
        Price: $('#addPrice').val(),
        PictureUrl: $('#addPictureUrl').val()
    };

    postRequest('api/values', JSON.stringify(product))
        .then(getAllProducts)
        .catch(alert);
}

const deleteProduct = (id) => {
    deleteRequest(`/api/values/${id}`)
        .then(getAllProducts)
        .catch(alert);
}

const editProduct = () => {
    const id = $('#editId').val();

    const product = {
        Id: $('#editId').val(),
        Name: $('#editName').val(),
        Description: $('#editDescription').val(),
        Price: $('#editPrice').val(),
        PictureUrl: $('#editPictureUrl').val()
    };

    putRequest(`api/values/${id}`, JSON.stringify(product))
        .then(getAllProducts)
        .catch(alert);
}
