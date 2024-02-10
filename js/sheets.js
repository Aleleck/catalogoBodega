let productos;

async function getProducto(){
    let response;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1pblbPBLCxMv0LtBbQCuc-KVu-8B2eUZHLbMCflmHrr4',
            range: 'Catalogo!A:E',
        });
    } catch (err) {
        console.error(err);
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        console.warn("No se encontraron valores");
        
        return;
    }
    
    productos =[];

    range.values.forEach((fila) => {
        if(isNaN(parseInt(fila[0])) || fila[5] !== undefined)return;
        const nuevoProducto={
            id: fila[0],
            urlimg: fila[1],
            nombre: fila[2],
            cantidad: fila[3],
            precio: fila[5]
        }
        productos.push(nuevoProducto);
    });
    console.log(productos)

}
